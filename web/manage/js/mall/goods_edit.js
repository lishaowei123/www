function FSocket() {
    var e = this;
    e.ws = null, this.isOpen = !1, this.interval = null, e.sendCount = 0, e.getCount = 0, e.requestID = 1, e.requests = {}, e.requestHandlers = {}, e.eventHandlers = {}
}
!function (e) {
    "function" == typeof define && define.amd ? define("backbone.modelbinder", ["underscore", "jquery", "backbone"], e) : e(_, jQuery, Backbone)
}(function (e, t, n) {
    if (!n)throw"Please include Backbone.js before Backbone.ModelBinder.js";
    return n.ModelBinder = function () {
        e.bindAll.apply(e, [this].concat(e.functions(this)))
    }, n.ModelBinder.SetOptions = function (e) {
        n.ModelBinder.options = e
    }, n.ModelBinder.VERSION = "1.0.5", n.ModelBinder.Constants = {}, n.ModelBinder.Constants.ModelToView = "ModelToView", n.ModelBinder.Constants.ViewToModel = "ViewToModel", e.extend(n.ModelBinder.prototype, {
        bind: function (e, n, i, s) {
            this.unbind(), this._model = e, this._rootEl = n, this._setOptions(s), this._model || this._throwException("model must be specified"), this._rootEl || this._throwException("rootEl must be specified"), i ? (this._attributeBindings = t.extend(!0, {}, i), this._initializeAttributeBindings(), this._initializeElBindings()) : this._initializeDefaultBindings(), this._bindModelToView(), this._bindViewToModel()
        }, bindCustomTriggers: function (e, t, n, i, s) {
            this._triggers = n, this.bind(e, t, i, s)
        }, unbind: function () {
            this._unbindModelToView(), this._unbindViewToModel(), this._attributeBindings && (delete this._attributeBindings, this._attributeBindings = void 0)
        }, _setOptions: function (t) {
            this._options = e.extend({boundAttribute: "name"}, n.ModelBinder.options, t), this._options.modelSetOptions || (this._options.modelSetOptions = {}), this._options.modelSetOptions.changeSource = "ModelBinder", this._options.changeTriggers || (this._options.changeTriggers = {
                "": "change",
                "[contenteditable]": "blur"
            }), this._options.initialCopyDirection || (this._options.initialCopyDirection = n.ModelBinder.Constants.ModelToView)
        }, _initializeAttributeBindings: function () {
            var t, n, i, s, o;
            for (t in this._attributeBindings) {
                for (n = this._attributeBindings[t], e.isString(n) ? i = {elementBindings: [{selector: n}]} : e.isArray(n) ? i = {elementBindings: n} : e.isObject(n) ? i = {elementBindings: [n]} : this._throwException("Unsupported type passed to Model Binder " + i), s = 0; s < i.elementBindings.length; s++)o = i.elementBindings[s], o.attributeBinding = i;
                i.attributeName = t, this._attributeBindings[t] = i
            }
        }, _initializeDefaultBindings: function () {
            var e, n, i, s, o;
            for (this._attributeBindings = {}, n = t("[" + this._options.boundAttribute + "]", this._rootEl), e = 0; e < n.length; e++)i = n[e], s = t(i).attr(this._options.boundAttribute), this._attributeBindings[s] ? this._attributeBindings[s].elementBindings.push({
                attributeBinding: this._attributeBindings[s],
                boundEls: [i]
            }) : (o = {attributeName: s}, o.elementBindings = [{
                attributeBinding: o,
                boundEls: [i]
            }], this._attributeBindings[s] = o)
        }, _initializeElBindings: function () {
            var e, n, i, s, o, a, l;
            for (e in this._attributeBindings)for (n = this._attributeBindings[e], i = 0; i < n.elementBindings.length; i++)if (s = n.elementBindings[i], o = "" === s.selector ? t(this._rootEl) : t(s.selector, this._rootEl), 0 === o.length)this._throwException("Bad binding found. No elements returned for binding selector " + s.selector); else for (s.boundEls = [], a = 0; a < o.length; a++)l = o[a], s.boundEls.push(l)
        }, _bindModelToView: function () {
            this._model.on("change", this._onModelChange, this), this._options.initialCopyDirection === n.ModelBinder.Constants.ModelToView && this.copyModelAttributesToView()
        }, copyModelAttributesToView: function (t) {
            var n, i;
            for (n in this._attributeBindings)(void 0 === t || -1 !== e.indexOf(t, n)) && (i = this._attributeBindings[n], this._copyModelToView(i))
        }, copyViewValuesToModel: function () {
            var e, n, i, s, o, a;
            for (e in this._attributeBindings)for (n = this._attributeBindings[e], i = 0; i < n.elementBindings.length; i++)if (s = n.elementBindings[i], this._isBindingUserEditable(s))if (this._isBindingRadioGroup(s))a = this._getRadioButtonGroupCheckedEl(s), a && this._copyViewToModel(s, a); else for (o = 0; o < s.boundEls.length; o++)a = t(s.boundEls[o]), this._isElUserEditable(a) && this._copyViewToModel(s, a)
        }, _unbindModelToView: function () {
            this._model && (this._model.off("change", this._onModelChange), this._model = void 0)
        }, _bindViewToModel: function () {
            e.each(this._options.changeTriggers, function (e, n) {
                t(this._rootEl).delegate(n, e, this._onElChanged)
            }, this), this._options.initialCopyDirection === n.ModelBinder.Constants.ViewToModel && this.copyViewValuesToModel()
        }, _unbindViewToModel: function () {
            this._options && this._options.changeTriggers && e.each(this._options.changeTriggers, function (e, n) {
                t(this._rootEl).undelegate(n, e, this._onElChanged)
            }, this)
        }, _onElChanged: function (e) {
            var n, i, s, o;
            for (n = t(e.target)[0], i = this._getElBindings(n), s = 0; s < i.length; s++)o = i[s], this._isBindingUserEditable(o) && this._copyViewToModel(o, n)
        }, _isBindingUserEditable: function (e) {
            return void 0 === e.elAttribute || "text" === e.elAttribute || "html" === e.elAttribute
        }, _isElUserEditable: function (e) {
            var t = e.attr("contenteditable");
            return t || e.is("input") || e.is("select") || e.is("textarea")
        }, _isBindingRadioGroup: function (e) {
            var n, i, s = e.boundEls.length > 0;
            for (n = 0; n < e.boundEls.length; n++)if (i = t(e.boundEls[n]), "radio" !== i.attr("type")) {
                s = !1;
                break
            }
            return s
        }, _getRadioButtonGroupCheckedEl: function (e) {
            var n, i;
            for (n = 0; n < e.boundEls.length; n++)if (i = t(e.boundEls[n]), "radio" === i.attr("type") && i.attr("checked"))return i;
            return void 0
        }, _getElBindings: function (e) {
            var t, n, i, s, o, a, l = [];
            for (t in this._attributeBindings)for (n = this._attributeBindings[t], i = 0; i < n.elementBindings.length; i++)for (s = n.elementBindings[i], o = 0; o < s.boundEls.length; o++)a = s.boundEls[o], a === e && l.push(s);
            return l
        }, _onModelChange: function () {
            var e, t;
            for (e in this._model.changedAttributes())t = this._attributeBindings[e], t && this._copyModelToView(t)
        }, _copyModelToView: function (e) {
            var i, s, o, a, l, c;
            for (l = this._model.get(e.attributeName), i = 0; i < e.elementBindings.length; i++)for (s = e.elementBindings[i], o = 0; o < s.boundEls.length; o++)a = s.boundEls[o], a._isSetting || (c = this._getConvertedValue(n.ModelBinder.Constants.ModelToView, s, l), this._setEl(t(a), s, c))
        }, _setEl: function (e, t, n) {
            t.elAttribute ? this._setElAttribute(e, t, n) : this._setElValue(e, n)
        }, _setElAttribute: function (t, i, s) {
            switch (i.elAttribute) {
                case"html":
                    t.html(s);
                    break;
                case"text":
                    t.text(s);
                    break;
                case"enabled":
                    t.prop("disabled", !s);
                    break;
                case"displayed":
                    t[s ? "show" : "hide"]();
                    break;
                case"hidden":
                    t[s ? "hide" : "show"]();
                    break;
                case"css":
                    t.css(i.cssAttribute, s);
                    break;
                case"class":
                    var o = this._model.previous(i.attributeBinding.attributeName), a = this._model.get(i.attributeBinding.attributeName);
                    e.isUndefined(o) && e.isUndefined(a) || (o = this._getConvertedValue(n.ModelBinder.Constants.ModelToView, i, o), t.removeClass(o)), s && t.addClass(s);
                    break;
                default:
                    t.attr(i.elAttribute, s)
            }
        }, _setElValue: function (e, t) {
            if (e.attr("type"))switch (e.attr("type")) {
                case"radio":
                    e.prop("checked", e.val() === t);
                    break;
                case"checkbox":
                    e.prop("checked", !!t);
                    break;
                case"file":
                    break;
                default:
                    e.val(t)
            } else e.is("input") || e.is("select") || e.is("textarea") ? e.val(t || (0 === t ? "0" : "")) : e.text(t || (0 === t ? "0" : ""))
        }, _copyViewToModel: function (e, i) {
            var s, o, a;
            i._isSetting || (i._isSetting = !0, s = this._setModel(e, t(i)), i._isSetting = !1, s && e.converter && (o = this._model.get(e.attributeBinding.attributeName), a = this._getConvertedValue(n.ModelBinder.Constants.ModelToView, e, o), this._setEl(t(i), e, a)))
        }, _getElValue: function (e, t) {
            switch (t.attr("type")) {
                case"checkbox":
                    return t.prop("checked") ? !0 : !1;
                default:
                    return void 0 !== t.attr("contenteditable") ? t.html() : t.val()
            }
        }, _setModel: function (e, t) {
            var i = {}, s = this._getElValue(e, t);
            return s = this._getConvertedValue(n.ModelBinder.Constants.ViewToModel, e, s), i[e.attributeBinding.attributeName] = s, this._model.set(i, this._options.modelSetOptions)
        }, _getConvertedValue: function (e, t, n) {
            return t.converter ? n = t.converter(e, n, t.attributeBinding.attributeName, this._model, t.boundEls) : this._options.converter && (n = this._options.converter(e, n, t.attributeBinding.attributeName, this._model, t.boundEls)), n
        }, _throwException: function (e) {
            if (!this._options.suppressThrows)throw e;
            console && console.error
        }
    }), n.ModelBinder.CollectionConverter = function (t) {
        if (this._collection = t, !this._collection)throw"Collection must be defined";
        e.bindAll(this, "convert")
    }, e.extend(n.ModelBinder.CollectionConverter.prototype, {
        convert: function (e, t) {
            return e === n.ModelBinder.Constants.ModelToView ? t ? t.id : void 0 : this._collection.get(t)
        }
    }), n.ModelBinder.createDefaultBindings = function (e, n, i, s) {
        var o, a, l, c, r = {};
        for (o = t("[" + n + "]", e), a = 0; a < o.length; a++)if (l = o[a], c = t(l).attr(n), !r[c]) {
            var d = {selector: "[" + n + '="' + c + '"]'};
            r[c] = d, i && (r[c].converter = i), s && (r[c].elAttribute = s)
        }
        return r
    }, n.ModelBinder.combineBindings = function (t, n) {
        return e.each(n, function (e, n) {
            var i = {selector: e.selector};
            e.converter && (i.converter = e.converter), e.elAttribute && (i.elAttribute = e.elAttribute), t[n] ? t[n] = [t[n], i] : t[n] = i
        }), t
    }, n.ModelBinder
}), define("components/pop/base", ["backbone", "jqueryui"], function (e, t) {
    var n = e.View.extend({
        className: "popover left", initialize: function (e) {
            window.__components__pop && window.__components__pop.hide && window.__components__pop.hide(), window.__components__pop = this, this.callback = e.callback, this.target = e.target, this.trigger = e.trigger, e.notAutoHide || this.autoHide()
        }, render: function () {
            return this.$el.html(this.template({})), this.onRender && this.onRender(), this
        }, autoHide: function () {
            var e = this;
            $(document).on("click", function (t) {
                e.isShow() && 0 === e.$el.has(t.target).length && t.target !== e.trigger[0] && e.hide()
            })
        }, setCallback: function (e) {
            this.callback = e
        }, setTarget: function (e) {
            this.target = e
        }, setTrigger: function (e) {
            this.trigger = e
        }, isShow: function () {
            var e = this.$el.css("display");
            return "none" === e ? !1 : !0
        }, hide: function () {
            return this.$el.hide(), this.remove(), window.__components__pop = null, this.$el
        }, show: function () {
            return this.$el.show(), this.$el
        }, toggle: function () {
            return this.$el.toggle(), this.$e
        }, positioning: function () {
            var e = this, t = e.options.className;
            e.$el.show(), e.$el.position(-1 !== t.indexOf("left") ? {
                of: e.target,
                my: "right center",
                at: "left center",
                collision: "none"
            } : -1 !== t.indexOf("bottom") ? {
                of: e.target,
                my: "center top",
                at: "center bottom",
                collision: "none"
            } : -1 !== t.indexOf("top") ? {
                of: e.target,
                my: "center bottom",
                at: "center top",
                collision: "none"
            } : {
                of: e.target,
                my: "left center",
                at: "right center",
                collision: "none"
            }), e.el.className = e.options.className
        }, reset: function (e) {
            var t = e.callback, n = e.target, i = e.trigger;
            this.setCallback(t), this.setTarget(n), this.setTrigger(i), this.positioning(), this.show()
        }, triggerCallback: function () {
            this.callback.call(this), this.hide()
        }
    });
    return n
}), define("text!components/pop/templates/help_notes.html", [], function () {
    return '<div class="arrow"></div>\n<div class="popover-inner">\n    <div class="popover-content">\n        <%= content %>\n    </div>\n</div>\n'
}), define("components/pop/help_notes", ["backbone", "components/pop/base", "text!components/pop/templates/help_notes.html", "core/utils", "clipboard"], function (e, t, n, i, s) {
    return t.extend({
        template: _.template(n),
        className: function () {
            return this.options.className
        },
        events: {
            "click .js-btn-cancel": "hide",
            "click .js-btn-confirm": "triggerCallback",
            "keydown .js-rename-placeholder": function (e) {
                e.keyCode === i.keyCode.ENTER && this.triggerCallback()
            }
        },
        initialize: function (e) {
            t.prototype.initialize.call(this, e), s.config({
                moviePath: window._global.url["static"] + "/vendor/plugin/ZeroClipboard.swf",
                trustedDomains: ["*"],
                allowScriptAccess: "always"
            }), this.data = e.data
        },
        render: function () {
            var e = this, t = this.target.parent().find(".js-notes-cont").html() || "暂时没有注释内容。";
            this.$el.html(this.template({content: t}));
            var n = new s(this.$(".js-help-notes-btn-copy"));
            return n.on("load", function (t) {
                t.on("complete", function (t, s) {
                    i.successNotify("复制成功"), e.hide(), n.off("load")
                })
            }), this
        },
        positioning: function () {
            var e = this, t = e.options.className;
            e.$el.show(), e.$el.position(-1 !== t.indexOf("left") ? {
                of: e.target,
                my: "right center",
                at: "left center",
                collision: "none"
            } : -1 !== t.indexOf("bottom") ? {
                of: e.target,
                my: "center top",
                at: "center bottom",
                collision: "none"
            } : -1 !== t.indexOf("top") ? {
                of: e.target,
                my: "center bottom",
                at: "center top",
                collision: "none"
            } : {
                of: e.target,
                my: "left center",
                at: "right center",
                collision: "none"
            }), e.el.className = e.options.className
        },
        setData: function (e) {
            this.data = e, this.render()
        },
        reset: function (e) {
            var t = e.callback, n = e.target, i = e.trigger, s = e.data, o = e.className || "popover bottom";
            this.options.className = o, this.setCallback(t), this.setTarget(n), this.setTrigger(i), this.setData(s), this.positioning(), this.clearInput(), this.show()
        },
        triggerCallback: function () {
            this.callback(), this.hide()
        },
        clearInput: function () {
            this.$(".js-link-placeholder").val("")
        }
    })
}), define("components/pop/atom/help_notes", ["require", "backbone", "components/pop/help_notes"], function (e) {
    var t = (e("backbone"), e("components/pop/help_notes"));
    return {
        initialize: function (e) {
            var n = e.target = $(e.target), i = e.className, s = (e.type, e.callback), o = e.trigger = $(e.trigger || n), a = (e.data, e.notAutoHide || !1, e.content || "", e.appendTarget || "body"), l = new t({
                callback: s,
                target: n,
                className: i || "popover bottom",
                trigger: o
            });
            return l.render().$el.appendTo(a), l.positioning(), l
        }
    }
}), define("components/help_notes/com", ["require", "jquery", "components/pop/atom/help_notes"], function (e) {
    var t = e("jquery"), n = e("components/pop/atom/help_notes"), i = null, s = 1, o = 1, a = 200, l = "", c = 2, r = ".js-intro-popover", d = ".js-intro-popover .popover-inner", p = function (e) {
        var s = "js-intro-popover popover popover-help-notes " + l;
        2 !== c && (s = "js-intro-popover popover popover-intro " + l), o = 0, i && clearTimeout(i), i = setTimeout(function () {
            t(r).remove(), n.initialize({target: t(e.target), className: s})
        }, a)
    }, u = function () {
        i && clearTimeout(i), i = setTimeout(function () {
            o && s && t(r).hide()
        }, a)
    };
    t("body").on("mouseover", ".js-help-notes, .js-help-notes-btn-copy", function (e) {
        var n = t(this);
        l = n.data("class") || "bottom", c = n.data("ui-version") || 2, p(e)
    }).on("mouseout", ".js-help-notes, #global-zeroclipboard-html-bridge", function () {
        o = 1, u()
    }), t("body").on("mouseover", d, function () {
        s = 0
    }).on("mouseout", d, function () {
        s = 1, u()
    })
});
var DEFAULT_TIMEOUT = 6e4;
FSocket.prototype.getRId = function () {
    var e = this, t = e.requestID;
    return e.requestID++, e.requestID > 1e6 && (e.requestID = 1), t
};
var temp = {};
temp.type = "heart";
var HEARTMESSAGE = JSON.stringify(temp), HINTERVAL = 6e4;
FSocket.prototype.connect = function (e, t) {
    var n = this;
    n.ws = new WebSocket(e), n.ws.onopen = function () {
        n.isOpen = !0, n.interval = setInterval(function () {
            n.intervalCheck()
        }, HINTERVAL), t()
    }, n.ws.onclose = function () {
        n.close()
    }, n.ws.onerror = function () {
        n.close()
    }, n.ws.onmessage = function (e) {
        n.getCount < 0 ? n.getCount = 1 : n.getCount += 1;
        var t = JSON.parse(e.data);
        if ("message" == t.type)n.processMessage && n.processMessage(t.message); else if ("reply" == t.type) {
            var i = n.requests[t.requestID];
            i && (delete n.requests[t.requestID], t.success ? i(null, t.data) : i("调用错误"))
        } else if ("request" == t.type) {
            var s = t.requestID, o = t.method, a = t.args;
            n.processRequest(o, a, function (e, t) {
                var i = {};
                e ? i.success = !1 : (i.success = !0, i.data = t), i.type = "reply", i.requestID = s, n._send(JSON.stringify(i))
            })
        }
    }
}, FSocket.prototype.processRequest = function (e, t, n) {
    var i = this;
    if (i.requestHandlers[e]) {
        var s = i.requestHandlers[e];
        s(t, function (e, t) {
            n(e, t)
        })
    } else n("没有这个方法")
}, FSocket.prototype.addHandler = function (e, t) {
    var n = this;
    n.requestHandlers[e] = t
}, FSocket.prototype.intervalCheck = function () {
    var e = this;
    e.sendCount > 0 ? e.sendCount = 0 : e._send(HEARTMESSAGE), e.getCount > 0 ? e.getCount = 0 : (e.getCount -= 1, e.getCount < -5 && e.close())
}, FSocket.prototype.regist = function (e, t) {
    var n = this;
    n.eventHandlers[e] || (n.eventHandlers[e] = []), n.eventHandlers[e].push(t)
}, FSocket.prototype.fire = function (e) {
    var t = this;
    if (t.eventHandlers[e])for (var n = 0; n < t.eventHandlers[e].length; n++) {
        var i = t.eventHandlers[e][n];
        i()
    }
}, FSocket.prototype.close = function () {
    var e = this;
    e.isOpen && e.fire("close"), e.isOpen = !1, clearInterval(e.interval);
    for (var t in e.requests) {
        var n = e.requests[t];
        n("连接异常")
    }
    e.requests = {}, e.ws && e.ws.close()
}, FSocket.prototype.sendMessage = function (e) {
    var t = this;
    t.sendCount += 1;
    var n = {};
    n.type = "message", n.message = e;
    var i = JSON.stringify(n);
    t._send(i)
}, FSocket.prototype.request = function (e, t, n) {
    var i = this;
    i.isOpen || n("连接异常"), i.sendCount += 1;
    var s = {};
    s.method = e, s.args = t, s.type = "request", s.requestID = i.getRId(), i.requests[s.requestID] = n, setTimeout(function () {
        var e = i.requests[s.requestID];
        e && (delete i.requests[s.requestID], e("超时"))
    }, DEFAULT_TIMEOUT);
    var t = JSON.stringify(s);
    i._send(t)
}, FSocket.prototype._send = function (e) {
    var t = this;
    t.isOpen && t.ws.send(e)
}, define("components/wsocket/fsocket", function () {
}), define("components/message/model", ["require", "underscore", "backbone", "components/wsocket/fsocket"], function (e) {
    var t = (e("underscore"), e("backbone"));
    e("components/wsocket/fsocket");
    var n = function () {
        function e() {
            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
        }

        return function () {
            return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
        }
    }(), i = t.Model.extend({
        defaults: {weixin_unread: 0, weibo_unread: 0, order_unread: 0}, initialize: function () {
            var e = this;
            e.init()
        }, init: function () {
            var e = this;
            e.socket = new FSocket, e.connect(), e.handleDisconnect(), e.handleMessage()
        }, connect: function () {
            var e = this, t = window._global.url.ws;
            e.socket.connect(t, function () {
                e.resetTryCounter();
                var t = n(), i = JSON.stringify({
                    mp_id: window._global.kdt_id,
                    client_id: t,
                    admin_id: window._global.user_id,
                    con_type: "unread_count"
                });
                e.socket.request("inner_setKey", i, function (e, t) {
                })
            })
        }, resetTryCounter: function () {
            var e = this;
            e.tryCounter = 0, e.tryTimer && window.clearTimeout(e.tryTimer)
        }, handleDisconnect: function () {
            var e = this;
            e.socket.regist("close", function () {
                e.tryTimer = setTimeout(function () {
                }, 1e4), e.tryReconnect()
            })
        }, tryReconnect: function () {
            var e = this;
            e.tryCounter += 1, e.connect()
        }, handleMessage: function () {
            var e = this;
            e.socket.addHandler("message", function (t, n) {
                n(null, "message_received");
                var i = JSON.parse(t);
                e.set(i)
            })
        }
    });
    return i
}), define("text!components/notify/templates/notify.html", [], function () {
    return '<div class="alert">\n    <button type="button" class="js-close close" data-dismiss="alert">&times;</button>\n    <div class="notify-cont">\n        <% var wb_total = wb_at_number + wb_tome_number + wb_private_number; %>\n        <% if (wx_number > 0) { %>\n        微信：你有 <a href="<%=wx_url %>"><%=wx_number %></a> 条未读信息<% if (wb_total > 0) { %>；&nbsp;&nbsp;&nbsp;&nbsp;<% } else { %>。<% } %>\n        <% } %>\n    </div>\n    <div class="notify-setting">\n        <% if (audio) { %>\n        <a href="javascript:void(0);" class="js-toggle-audio audio-on">\n            已开启\n        </a>\n        <% } else { %>\n        <a href="javascript:void(0);" class="js-toggle-audio audio-off">\n            已关闭\n        </a>\n        <% } %>\n    </div>\n</div>\n'
}), define("components/notify/notify", ["backbone", "text!components/notify/templates/notify.html"], function (e, t) {
    var n, i = e.View.extend({
        el: ".js-notify",
        template: _.template(t),
        events: {"click .js-close": "close", "click .js-toggle-audio": "toggleAudio"},
        initialize: function () {
            this.status = {
                wx_url: "",
                wx_number: 0,
                wb_at_url: "",
                wb_at_number: 0,
                wb_private_url: "",
                wb_private_number: 0,
                wb_tome_url: "",
                wb_tome_number: 0,
                audio: !0
            }, this.statekey = "mp-" + window._global.kdt_id + "-adm-" + window._global.user_id + "-msg"
        },
        render: function () {
            this.$el.html(this.template(this.status))
        },
        close: function () {
            this.$el.removeClass("fadeInUpBig"), window.NC.trigger("notify:close")
        },
        show: function () {
            this.$el.removeClass("hide"), this.$el.addClass("fadeInUpBig"), window.NC.trigger("notify:show")
        },
        hide: function () {
            this.$el.removeClass("fadeInUpBig"), this.$el.addClass("hide"), window.NC.trigger("notify:close")
        },
        setStatus: function (e) {
            _.isObject(e) && (this.status = e), this.canPlayAudio(), this.render(), this.show()
        },
        clear: function () {
            this.remove()
        },
        canPlayAudio: function () {
            var e;
            e = window.localStorage && "0" == window.localStorage.getItem(this.statekey + "-playAudio") ? !1 : !0, this.status.audio = e
        },
        toggleAudio: function () {
            window.localStorage && (this.status.audio ? window.localStorage.setItem(this.statekey + "-playAudio", 0) : window.localStorage.setItem(this.statekey + "-playAudio", 1)), this.setStatus()
        }
    });
    return {
        initialize: function (e) {
            return _.isUndefined(n) && (n = new i), _.isObject(e) && n.setStatus(e), n
        }
    }
}), define("components/message/view", ["require", "underscore", "backbone", "components/notify/notify", "core/event"], function (e) {
    var t = (e("underscore"), e("backbone")), n = e("components/notify/notify");
    e("core/event");
    var i = t.View.extend({
        initialize: function () {
            var e = this;
            e.initNotifyConfig(), e.initTitleNotify(), e.initSoundNotify(), e.listenTo(e.model, "change", e.showNotify), window.NC.on("notify:close", e.stopNotify, e)
        }, initNotifyConfig: function () {
            var e = this, t = window._global.kdt_id, n = window._global.user_id;
            e.stateKey = "mp-" + t + "-adm-" + n + "-msg"
        }, initTitleNotify: function () {
            var e = this;
            e.titleTimer = null, e.titleNotifying = !1, e.originalTitle = document.title, e.titleNotifyMsg = "您有未读消息"
        }, render: function () {
            var e = this;
            return e
        }, showNotify: function () {
            var e = this;
            e.showNotifyBar(), e.stopTitleNotify(), e.showTitleNotify(), e.playNotifySound()
        }, stopNotify: function () {
            var e = this;
            e.stopTitleNotify()
        }, showNotifyBar: function () {
            var e = this, t = e.model.get("weixin_unread");
            n.initialize({
                wx_number: t,
                wx_url: window._global.url.v1 + "/messages/my?type=unread",
                wb_tome_number: 0,
                wb_tome_url: "",
                wb_private_number: 0,
                wb_private_url: "",
                wb_at_number: 0,
                wb_at_url: ""
            })
        }, switchTitle: function () {
            var e = this;
            e.titleNotifying ? document.title = e.originalTitle : document.title = e.titleNotifyMsg, e.titleNotifying = !e.titleNotifying
        }, showTitleNotify: function () {
            var e = this;
            e.switchTitle(), e.titleTimer = window.setTimeout(function () {
                e.showTitleNotify()
            }, 1e3)
        }, stopTitleNotify: function () {
            var e = this;
            window.clearTimeout(e.titleTimer), e.titleTimer = null, document.title = e.originalTitle, e.titleNotifying = !1
        }, initSoundNotify: function () {
            var e = this;
            return e.checkAudioSupport(), e.isSupportAudio ? (e.notifySound = new Audio, void(e.notifySound.src = window._global.url["static"] + "/media/notify.wav")) : !1
        }, checkAudioSupport: function () {
            var e = this;
            e.isSupportAudio = !!document.createElement("audio").canPlayType
        }, playNotifySound: function () {
            var e = this, t = window.localStorage.getItem(e.stateKey + "-playAudio"), n = "0" == t;
            return !e.isSupportAudio || n ? !1 : void e.notifySound.play()
        }, showDesktopNotify: function () {
        }
    });
    return i
}), define("tpl!components/notice_center/templates/notice", [], function () {
    return function (obj) {
        var __p = "";
        Array.prototype.join;
        with (obj || {})__p += '<div class="widget-notice-center-ring js-notice-center-ring"></div>\n<div class="widget-notice-center-wrapper js-notice-center-wrapper">\n\n    <div class="js-list-header-region"></div>\n    <div class="js-list-empty-region"></div>\n    <ul class="js-list-body-region widget-notice-center-content"></ul>\n    <div class="js-list-footer-region"></div>\n</div>\n\n';
        return __p
    }
}), define("tpl!components/notice_center/templates/notice_header", [], function () {
    return function (obj) {
        var __t, __p = "";
        Array.prototype.join;
        with (obj || {})__p += '<div class="widget-notice-center-title clearfix">\n    <h3 class="pull-left">\n        系统通知\n        ', "0" != unread_count && (__p += "\n        ( <span>" + (null == (__t = unread_count) ? "" : __t) + "</span> )\n        "), __p += '\n    </h3>\n    <a href="javascript:;" class="js-close pull-right">收起 》</a>\n</div>\n';
        return __p
    }
}), define("tpl!components/notice_center/templates/notice_item", [], function () {
    return function (obj) {
        var __t, __p = "";
        Array.prototype.join;
        with (obj || {})__p += '<div class="widget-notice-center-item-inner ' + (null == (__t = "0" == is_read ? "notice-center-item-unread js-mark-as-read" : "") ? "" : __t) + '">\n    <p>' + (null == (__t = content) ? "" : __t) + "</p>\n    ", detail_url && (__p += '\n        <div>\n            <a href="' + (null == (__t = detail_url) ? "" : __t) + '" target="_blank">' + (null == (__t = detail_title || "查看详情") ? "" : __t) + " 》</a>\n        </div>\n    "), __p += "\n</div>\n";
        return __p
    }
}), define("tpl!components/notice_center/templates/notice_empty", [], function () {
    return function (obj) {
        var __p = "";
        Array.prototype.join;
        with (obj || {})__p += '<div class="notice-empty">没有发现新信息</div>\n';
        return __p
    }
}), define("tpl!components/notice_center/templates/notice_footer", [], function () {
    return function (obj) {
        var __t, __p = "";
        Array.prototype.join;
        with (obj || {})__p += '<div class="widget-notice-center-footer">\n    <a href="javascript:;" class="mark-all-as-read js-mark-all-as-read">全部标记已读</a>\n    <a href="' + (null == (__t = window._global.url.www) ? "" : __t) + '/notice/dashboard" class="pull-right">查看全部信息</a>\n</div>\n';
        return __p
    }
}), define("components/notice_center/views/notice_header", ["require", "underscore", "components/list/views/list_item"], function (e) {
    var t = (e("underscore"), e("components/list/views/list_item"));
    return t.extend({
        tagName: "div",
        modelEvents: {"change:unread_count": "render"},
        events: {"click .js-close": "handleClose"},
        handleClose: function () {
            this.layout.closeWrapper()
        }
    })
}), define("components/notice_center/views/notice_item", ["require", "core/utils", "components/list/views/list_item"], function (e) {
    var t = (e("core/utils"), e("components/list/views/list_item"));
    return t.extend({
        tagName: "li",
        className: "widget-notice-center-item",
        events: {"click .js-mark-as-read": "markAsRead"},
        markAsRead: function () {
            var e = this;
            this.model.markAsRead().done(function () {
                e.layout.model.markAsRead()
            })
        }
    })
}), define("components/notice_center/views/notice_footer", ["require", "underscore", "components/list/views/list_footer"], function (e) {
    var t = (e("underscore"), e("components/list/views/list_footer"));
    return t.extend({
        events: {"click .js-mark-all-as-read": "markAllAsRead"}, markAllAsRead: function () {
            this.model.markAllAsRead()
        }
    })
}), define("components/notice_center/models/notice", ["require", "core/utils", "components/list/models/list"], function (e) {
    var t = e("core/utils"), n = e("components/list/models/list");
    return n.extend({
        defaults: _.extend({}, n.prototype.defaults, {read_type: "unread"}),
        url: window._global.url.www + "/notice/dashboard/list.json",
        markAsRead: function () {
            var e = +this.get("unread_count");
            this.set("unread_count", e - 1)
        },
        markAllAsRead: function () {
            var e = this;
            return this.set("is_read", "1"), t.ajax({
                url: window._global.url.www + "/notice/dashboard/read.json",
                type: "PUT",
                data: {id: 0}
            }).done(function () {
                e.set("unread_count", "0"), e.get("items").each(function (e) {
                    e.set("is_read", "1")
                })
            })
        }
    })
}), define("components/notice_center/models/notice_item", ["require", "components/list/models/list_item"], function (e) {
    var t = e("components/list/models/list_item");
    return t.extend({
        markAsRead: function () {
            var e = this;
            return this.set("is_read", "1"), this.sync({
                url: window._global.url.www + "/notice/dashboard/read.json",
                type: "PUT",
                data: {id: this.getId()}
            }).fail(function () {
                e.set("is_read", "0")
            })
        }
    })
}), define("components/notice_center/views/notice", ["require", "core/utils", "components/list/views/list", "tpl!../templates/notice", "tpl!../templates/notice_header", "tpl!../templates/notice_item", "tpl!../templates/notice_empty", "tpl!../templates/notice_footer", "../views/notice_header", "../views/notice_item", "../views/notice_footer", "../models/notice", "../models/notice_item"], function (e) {
    var t = e("core/utils"), n = e("components/list/views/list");
    return n.extend({
        className: "widget-notice-center",
        defaults: {
            listTemplate: e("tpl!../templates/notice"),
            listHeaderTemplate: e("tpl!../templates/notice_header"),
            listItemTemplate: e("tpl!../templates/notice_item"),
            listEmptyTemplate: e("tpl!../templates/notice_empty"),
            listFooterTemplate: e("tpl!../templates/notice_footer"),
            ListHeaderView: e("../views/notice_header"),
            ListItemView: e("../views/notice_item"),
            ListFooterView: e("../views/notice_footer"),
            ListModel: e("../models/notice"),
            ListItemModel: e("../models/notice_item")
        },
        modelEvents: _.extend({}, n.prototype.modelEvents, {"change:unread_count": "handleUnreadCountChange"}),
        ui: _.extend({}, n.prototype.ui, {ring: ".js-notice-center-ring", wrapper: ".js-notice-center-wrapper"}),
        events: {
            click: "stopPropagation",
            "click @ui.ring": "openWrapper",
            "mousewheel .js-list-body-region": t.handleScroll
        },
        onInit: function () {
            var e = this;
            this.render(), $("body").append(this.$el), $("body").on("click", _.bind(this.closeWrapper, this)), $("body").on("keydown", function (n) {
                n.keyCode === t.keyCode.ESCAPE && e.closeWrapper()
            })
        },
        onRender: function () {
            var e = this.model.get("items");
            this.model.fetched && (e && e.length > 0 ? this.renderView() : (this.renderHeaderView(), this.renderEmptyView(), this.renderFooterView()), this.handleUnreadCountChange())
        },
        stopPropagation: function (e) {
            e.stopPropagation()
        },
        openWrapper: function () {
            this.ui.wrapper.addClass("open")
        },
        closeWrapper: function () {
            this.ui.wrapper.removeClass("open")
        },
        handleUnreadCountChange: function () {
            var e = +this.model.get("unread_count");
            this.ui.ring.toggleClass("has_unread_notice", e > 0)
        },
        hash: "",
        addLoading: function () {
        },
        removeLoading: function () {
        }
    })
}), define("components/notice_center/app", ["require", "jquery", "./views/notice"], function (e) {
    var t = e("jquery"), n = e("./views/notice");
    t(function () {
        new n
    })
}), define("components/message/message_bot_lite", ["require", "jquery", "underscore", "backbone", "core/utils", "components/message/model", "components/message/view", "components/notice_center/app"], function (e) {
    var t = e("jquery"), n = (e("underscore"), e("backbone"), e("core/utils"), e("components/message/model")), i = e("components/message/view"), s = (e("components/notice_center/app"), {
        init: function () {
            var e = this;
            return window._global.js.message_report ? 1 != _global.team_status.weixin_server && 1 != _global.team_status.weixin_oldsub ? !1 : void t(function () {
                e._init()
            }) : !1
        }, _init: function () {
            var e = this;
            e.messageModel = new n;
            new i({el: "body", model: e.messageModel})
        }
    });
    return s
}), define("core/reqres", ["require", "backbone", "backbone.wreqr"], function (e) {
    var t = e("backbone");
    e("backbone.wreqr");
    return window.RS ? window.RS : (window.RS = new t.Wreqr.RequestResponse, window.RS)
}), define("commons/utils", ["require", "underscore", "core/utils"], function (e) {
    var t = e("underscore"), n = e("core/utils"), i = {};
    return t.extend(i, {
        fetchSaleProperty: function (e, t) {
            var i = window._global.url.www + "/showcase/paipai/saleproperty.json";
            $.ajax({
                url: i, type: "GET", dataType: "json", cache: !1, data: e, success: function (e) {
                    0 === e.code ? t(e) : n.errorNotify(e.msg)
                }, error: function (e, t, i) {
                    n.errorNotify("加载销售属性失败。")
                }, complete: function (e, t) {
                }
            })
        }, calcProfit: function (e, t) {
            e = Number(e);
            var i = t.cost || .01, s = e - i;
            return s = n.twoDecimal(s)
        }, removeSkuKeyValue: function (e, t) {
            for (var n = 3; n > t; n--) {
                var i = "sku_name_" + n, s = i + "_value";
                e.unset(i, {silent: !0}), e.unset(s, {silent: !0})
            }
        }, needConfirm: function (e, t, n) {
            var i = window.confirm(e);
            i ? t && "function" == typeof t && t.apply() : n && "function" == typeof n && n.apply()
        }, button: function (e, t, n) {
            return e ? (e = $(e), void e.text(t).prop("disabled", n)) : !1
        }, decimalFix: n.decimalFix, originValueFix: function (e) {
            var n, i, s, o = e.match(/([^\d\uffe5]*)[\uffe5]?(\d+\.?\d*)(.*)$/), a = e;
            return o && o.length > 2 && (i = o[1], n = +o[2], s = o[3], t.isNumber(n) && (n = n.toFixed(2, 10)), s || (s = ""), a = i + "￥" + n + s), a
        }, buyUrlValueFix: function (e) {
            var t = n.urlCheck(e);
            return t
        }, booleanConverter: function (e, t, n, i, s) {
            return t = +t
        }, numberValueFix: function (e) {
            var t = Number(e), n = isNaN(t) ? e : t.toFixed(2);
            return n
        }, showLog: function (e) {
            e.toJSON()
        }, getIdxOfCollection: function (e) {
            var t = e.collection, n = t.indexOf(e);
            return n
        }
    }), i
}), define("components/showcase/2.0.0/base/models/base", ["require", "underscore", "backbone"], function (e) {
    var t = e("underscore"), n = e("backbone"), i = n.Model.extend({
        position: function () {
            return this.collection.indexOf(this)
        }, index: function () {
            return this.collection.indexOf(this)
        }, hasChanged: function () {
            return n.Model.prototype.hasChanged.call(this) ? !0 : this.has("sub_entry") ? this.get("sub_entry").any(function (e) {
                return e.hasChanged()
            }) : void 0
        }, checkValid: function () {
            var e = !1, n = this.get("sub_entry");
            return t.isFunction(this.validate) && (e = this.validate()), n && n.each(function (n) {
                if (t.isFunction(n.validate)) {
                    var i = n.validate();
                    !e && i && n.trigger("valid:error", n), e = e || i
                }
            }), e
        }
    });
    return i
}), define("models/config", ["require", "underscore", "backbone", "components/showcase/2.0.0/base/models/base", "core/reqres", "core/utils"], function (e) {
    var t = e("underscore"), n = e("backbone"), i = e("components/showcase/2.0.0/base/models/base"), s = e("core/reqres"), o = (e("core/utils"), i.extend({
        idAttribute: "goods_id", defaults: function () {
            return {
                type: "config",
                goods_type: "",
                goods_platform: "",
                origin_goods_id: "",
                fx_shipper_type: "",
                is_new_category: "1",
                class_type: "0",
                class_1: "",
                class_2: "",
                goods_class: [],
                cid: "",
                shop_method: "1",
                attrs: null,
                tag: [],
                shipment: "0",
                stock: [],
                hide_stock: "0",
                total_stock: 0,
                goods_no: "",
                title: "",
                picture: [],
                picture_height: "320",
                price: "",
                origin: "",
                buy_url: "",
                postage: "",
                delivery_template_id: "0",
                quota: "0",
                province_id: "0",
                province: "",
                city_id: "0",
                city: "",
                messages: [],
                sold_time: "0",
                start_sold_time: "",
                take_down_time: "",
                join_level_discount: "1",
                invoice: "0",
                warranty: "0",
                content: "",
                sub_title: "",
                components_extra_id: "-2"
            }
        }, calculateImage: function () {
            var e = this, n = 0;
            t.each(e.get("picture"), function (e) {
                var i = Number(e.width) / 320;
                i = 1 > i ? 1 : i;
                var s = t.isUndefined(e.height) || 0 === Number(e.height) ? 320 : Number(e.height) / i;
                n = s > n ? s : n
            }), n = n > 420 ? 420 : n, 0 === n && (n = 320), e.set("picture_height", n)
        }, initialize: function (e) {
            var t = this;
            e && e.picture && t.fixPicture(e.picture), t.isFx = "10" == t.get("goods_type"), t.setupPriceRangeResp()
        }, fixPicture: function (e) {
            var n = this;
            t.isArray(e) || (e = t.toArray(e)), n.set("picture", e, {silent: !0})
        }, setupPriceRangeResp: function () {
            var e = this;
            s.setHandler("price_range:get", function (t) {
                var n = e.getPriceRange(t);
                return n && (n.cost = Number(n.cost), n.min = Number(n.min), n.max = Number(n.max)), n
            })
        }, getPriceRange: function (e) {
            var t = this, n = {cost: .01, min: .01, max: 9999999}, i = t.get("fx_goods_retail_price_limitation") || {};
            return t.isFx && e && i && (n = i[e]), n
        }, validation: {
            class_1: function (e, t, n) {
                return "0" == n.class_type && "" === e ? "必须选择一个商品类目。" : void 0
            }, goods_class: function (e, n, i) {
                return "1" == i.class_type && !e && t.isEmpty(e) ? "必须选择一个商品类目。" : void 0
            }, title: {rangeLength: [1, 100], msg: "商品名长度不能少于一个字或者多于100个字"}, picture: function (e) {
                return t.isArray(e) && e.length <= 0 ? "商品图至少有一张。" : t.isArray(e) && e.length > 15 ? "商品图片最多支持 15 张。" : void 0
            }, postage: function (e) {
                return n.Validation.patterns.number.test(+e) ? void 0 : "邮费必须为数字。"
            }, price: function (e, i, o) {
                var a = this, l = +e, c = s.request("price_range:get", "total") || {min: .01, max: 9999999};
                if (c.max = t.isObject(c) && c.max > 9999999 ? 9999999 : c.max, t.isEmpty(o.stock)) {
                    if (!e)return "商品价格不能为空";
                    if (!n.Validation.patterns.number.test(l))return "商品价格必须为数字。";
                    if (0 >= l)return "商品价格必须大于0元。";
                    if (a.isFx && (l < Number(c.min) || l > Number(c.max)))return "分销商品价格只能设置成" + c.min + "元 ~ " + c.max + "元 区间内"
                }
            }, buy_url: function (e, t, i) {
                if ("0" == i.shop_method) {
                    if (!e)return "购买地址不能为空。";
                    if (!n.Validation.patterns.url.test(e))return "购买地址必须是一个合法网址。"
                }
            }, total_stock: function (e, t, i) {
                if ("0" != i.shop_method) {
                    var s = +e;
                    if (!n.Validation.patterns.number.test(+e))return "总库存必须是数字。";
                    if (0 > s)return "总库存不能小于 0。";
                    if (s > 999999999)return "总库存最大不能超过 999999999。"
                }
            }, quota: function (e) {
                return n.Validation.patterns.number.test(+e) ? void 0 : "限购数量必须是数字"
            }, sold_time: function (e, t, n) {
                return 1 === +e && "" === n.start_sold_time ? "请选择一个开售时间" : void 0
            }, take_down_time: function (e, t, n) {
                var i = +new Date, s = +new Date(n.start_sold_time) || 0, o = +new Date(e);
                return "" !== e && 6e4 > o - i ? "下架时间必须大于当前时间至少一分钟" : "1" == n.sold_time && "" !== e && 6e4 > o - s ? "下架时间必须大于定时开售时间至少一分钟" : void 0
            }, messages: function (e, t, n) {
                if ("1" == n.shop_method) {
                    var i = e.length, s = {};
                    if (i > 20)return "留言最多 20 个。";
                    for (var o = i - 1; o >= 0; o--) {
                        var a = e[o].name;
                        if ("" === $.trim(a))return "留言名称不能为空";
                        if (a.length > 5)return "留言名称不能多于5个字。";
                        if (s[a])return "留言名称不能重复";
                        s[a] = !0
                    }
                }
            }, delivery: function (e, t, n) {
                return 1 === +e && 0 === +n.delivery_template_id ? "请选择运费模版" : void 0
            }
        }, parse: function (e) {
            return "10" === e.goods_platform && (this.originData = this.deepCopy(e)), 0 === +e.delivery_template_id || t.isUndefined(e.delivery_template_id) ? e.delivery = 0 : e.delivery = 1, e.title = t.unescape(e.title), e
        }, deepCopy: function (e) {
            return JSON.parse(JSON.stringify(e))
        }, needToSetFenxiaoPrice: function () {
            if ("10" !== this.get("goods_platform"))return !1;
            var e = this.toJSON(), n = this.originData;
            if (0 === n.stock.length && 0 === e.stock.length)return n.price !== e.price;
            if (n.stock.length !== e.stock.length)return !0;
            for (var i = 0; i < e.stock.length; i++) {
                var s = e.stock[i];
                if (!s.id)return !0;
                var o = t.find(this.originData.stock, function (e) {
                    return e.id === s.id
                });
                if (!o)return !0;
                if (s.price !== o.price)return !0
            }
            return !1
        }
    }));
    return o
}), define("components/showcase/2.0.0/base/storage", ["require", "underscore"], function (e) {
    var t = e("underscore"), n = window.JSON, i = window.localStorage, s = function (e, t) {
        var n = t.id;
        this.name = "mp-" + window._global.kdt_id + "-adm-" + window._global.user_id + "-", this.name += n ? e + "-" + n : e
    };
    return t.extend(s.prototype, {
        set: function (e, t) {
            if (i) {
                t = n.stringify(t);
                try {
                    i.setItem(e, t)
                } catch (s) {
                    "QuotaExceededError" === s.name && (i.clear(), i.setItem(e, t))
                }
            }
        }, get: function (e) {
            return i ? n.parse(i.getItem(e)) : void 0
        }, remove: function (e) {
            i && i.removeItem(e)
        }, setItem: function (e) {
            this.set(this.name, e)
        }, getItem: function () {
            return this.get(this.name)
        }, removeItem: function () {
            this.remove(this.name)
        }
    }), s
}), define("components/showcase/2.0.0/base/collections/base", ["require", "backbone", "core/utils", "models/config", "jquery", "underscore", "components/showcase/2.0.0/base/storage"], function (e) {
    var t = e("backbone"), n = e("core/utils"), i = e("models/config"), s = e("jquery"), o = e("underscore"), a = e("components/showcase/2.0.0/base/storage");
    return t.Collection.extend({
        url: "", storageName: "", model: function (e, t) {
            if (!window.SHOWCASE_CONFIG.models)return new i(e, t);
            if (!(e.type in window.SHOWCASE_CONFIG.models)) {
                if ("config" === e.type)return new i(e, t);
                throw"type error"
            }
            return window.SHOWCASE_CONFIG.models[e.type].initialize(e, t)
        }, initialize: function (e, t) {
            this.options = t || {}, o.isUndefined(this.options.id) || (this.id = this.options.id), this.storage = new a(this.storageName, t), this.changed = !1, this.listenTo(this, "add remove sort reset", this._changed), this.listenTo(this, "sync", this._unchanged)
        }, _changed: function () {
            this.changed = !0
        }, _unchanged: function () {
            this.changed = !1
        }, validate: function () {
            return this.some(function (e) {
                var t = e.checkValid();
                return t && e.trigger("valid:error"), t
            })
        }, parse: function (e) {
            var t = o.reject(e, function (e) {
                return window.SHOWCASE_CONFIG.models ? o.isArray(e) || o.isEmpty(e) || !(e.type in window.SHOWCASE_CONFIG.models) && "config" !== e.type : o.isArray(e) || o.isEmpty(e)
            });
            return o.isEmpty(t) && !this.noConfig && (t.push(o.clone(o.result(i.prototype, "defaults"))), o.isFunction(this.parseEmptyData)) ? this.parseEmptyData(t) : o.isFunction(this.onParse) ? this.onParse(t) : t
        }, localSync: function () {
            return this.length ? void(this.hasChanged() && this.storage.setItem(this.toJSON())) : void this.clearLocalData()
        }, localFetch: function () {
            return this.storage.getItem()
        }, clearLocalData: function () {
            this.storage.removeItem()
        }, fetch: function (e) {
            var t = this.url + "?id=" + this.id;
            return n.ajax(t, e).done(o.bind(this._fetchDone, this)).fail(o.bind(this.error, this))
        }, _fetchDone: function (e) {
            e = this.parseResponseData(e), this.set(e.data, {parse: !0, silent: !0}), this.trigger("sync")
        }, sync: function (e) {
            if (e = e || {}, this.validate())return s(".form-actions .btn").button("reset"), s.Deferred();
            this.beforeSync();
            var t = e.id || this.id, i = e.url || this.url, a = e.method || (t ? "PUT" : "POST"), l = o.extend({
                data: JSON.stringify(this),
                is_display: 0
            }, o.pick(this, "is_display", "alias", "title", "id", "num", "start_sold_item", "valid", "out_id"), e), c = {
                url: i,
                type: a,
                data: this.parseRequestData(l)
            };
            return n.ajax(c).done(o.bind(this._syncDone, this)).fail(o.bind(this.error, this))
        }, parseResponseData: function (e) {
            o.extend(this, o.pick(e, "is_display", "alias", "title", "id", "num", "start_sold_item", "valid", "out_id"));
            var t = e.is_default;
            return t && e.data.length > 0 && "config" == e.data[0].type && (e.data[0].is_default = t), e
        }, parseRequestData: function (e) {
            return this.handleData(e)
        }, handleData: function (e) {
            return e
        }, beforeSync: function () {
            var e = this.at(0);
            "config" === e.get("type") && (this.includeFullscreenModel() ? e.set("has_fullscreen_component", "1") : e.unset("has_fullscreen_component"))
        }, _syncDone: function (e) {
            o.isUndefined(this.id) && (this.id = e.id), this.clearLocalData()
        }, error: function (e) {
            n.errorNotify(e)
        }, hasChanged: function () {
            return this.changed ? !0 : this.any(function (e) {
                return e.hasChanged()
            })
        }, includeConfigModel: function () {
            var e = this.first();
            return !!e && "config" === e.attributes.type
        }, includeFullscreenModel: function () {
            return this.any(function (e) {
                return !!e.get("is_fullscreen_component")
            })
        }
    })
}), define("collections/field", ["require", "components/showcase/2.0.0/base/collections/base"], function (e) {
    var t = e("components/showcase/2.0.0/base/collections/base"), n = t.extend({
        url: window._global.url.www + "/showcase/goods/item.json",
        storageName: "feature"
    });
    return n
}), define("models/class_info", ["require", "backbone"], function (e) {
    var t = e("backbone");
    return t.Model.extend({
        defaults: {class_1: "", class_2: ""}, validation: {
            class_1: function (e) {
                return "" === e ? "必须选择一个商品类目。" : void 0
            }
        }
    })
}), define("components/goods_klass/models/klass", ["require", "underscore", "jquery", "backbone"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("backbone");
    return i.Model.extend({
        url: window._global.url.www + "/account/team/category.json",
        defaults: {klass: []},
        fetch: function () {
            var e = n.Deferred(), t = window._global.defaultClass;
            return t ? (this.set("klass", this.parse(t)), this.trigger("sync"), e.resolve(t)) : e.reject("没有获取到商品类目"), e
        },
        parse: function (e) {
            var n = [];
            return t.each(e, function (e) {
                e.parent_id = 0, e.parent_name = "", n.push(e), e.list && t.each(e.list, function (t) {
                    t.parent_id = e.id, t.parent_name = e.name, n.push(t)
                })
            }), n
        },
        getKlassById: function (e) {
            return e += "", t.find(this.get("klass"), function (t) {
                return t.id + "" === e
            }) || {}
        }
    })
}), define("tpl!components/goods_klass/templates/klass", [], function () {
    return function (obj) {
        var __t, __p = "";
        Array.prototype.join;
        with (obj || {})__p += '<div class="widget-goods-klass">\n    ', _.each(klass, function (e) {
            __p += "\n        ", 0 == e.parent_id && (__p += '\n            <div class="widget-goods-klass-item\n                ' + (null == (__t = e.id == currentKlass.id ? "current" : "") ? "" : __t) + "\n                " + (null == (__t = e.id == currentKlass.parent_id ? "current" : "") ? "" : __t) + "\n                " + (null == (__t = e.list ? "has-children" : "") ? "" : __t) + '"\n                data-id="' + (null == (__t = e.id) ? "" : __t) + '">\n\n                <span class="widget-goods-klass-name">\n                    ', __p += currentKlass.parent_id == e.id ? "\n                        " + (null == (__t = currentKlass.name) ? "" : __t) + "\n                    " : "\n                        " + (null == (__t = e.name) ? "" : __t) + "\n                    ", __p += "\n                </span>\n\n                ", e.list && (__p += '\n                    <ul class="widget-goods-klass-children">\n                        ', _.each(e.list, function (e) {
                __p += '\n                            <li data-id="' + (null == (__t = e.id) ? "" : __t) + '">\n                                <label class="radio">\n                                    <input type="radio" name="goods-class-2" ' + (null == (__t = currentKlass.id == e.id ? "checked" : "") ? "" : __t) + ">\n                                    " + (null == (__t = e.name) ? "" : __t) + "\n                                </label>\n                            </li>\n                        "
            }), __p += "\n                    </ul>\n                "), __p += "\n            </div>\n        "), __p += "\n    "
        }), __p += "\n</div>\n";
        return __p
    }
}), define("components/goods_klass/views/klass", ["require", "marionette", "../models/klass", "core/utils", "tpl!../templates/klass"], function (e) {
    var t = e("marionette"), n = e("../models/klass");
    e("core/utils");
    return t.ItemView.extend({
        template: e("tpl!../templates/klass"),
        events: {
            "click .widget-goods-klass-item": "handleKlassSelect",
            "click .widget-goods-klass-children li": "handleKlassSelect"
        },
        currentKlass: {},
        templateHelpers: function () {
            return {currentKlass: this.currentKlass}
        },
        initialize: function (e) {
            this.model = new n, this.listenTo(this.model, "sync", this.onSync), this.model.fetch()
        },
        onSync: function () {
            this.setCurrentKlass(this._id)
        },
        onRender: function () {
            this.openChildSelectbox = !1
        },
        setCurrentKlass: function (e) {
            if (_.isObject(e)) {
                var t = e;
                e = t.class_2 && t.class_2 + "" != "0" ? t.class_2 : t.class_1
            }
            this._setCurrentKlassById(e), this.render()
        },
        setParentNode: function (e) {
            this.$parentNode = e, this.$parentNode.append(this.$el)
        },
        _setCurrentKlassById: function (e) {
            this._id = e, this.currentKlass = this.model.getKlassById(e)
        },
        handleKlassSelect: function (e) {
            var t = $(e.currentTarget), n = t.data("id");
            t.hasClass("has-children") || (this._setCurrentKlassById(n), this.trigger("select", this.getTriggerData()), this.render())
        },
        getTriggerData: function () {
            var e = this.currentKlass;
            return +e.parent_id ? {class_1: e.parent_id, class_2: e.id} : {class_1: e.id, class_2: "0"}
        }
    })
}), define("components/goods_klass/app", ["require", "./views/klass"], function (e) {
    return e("./views/klass")
}), define("tpl!templates/class_info", [], function () {
    return function (obj) {
        var __p = "";
        Array.prototype.join;
        with (obj || {})__p += '<div class="class-block">\n    <div class="js-class-block control-group">\n        <div class="controls">\n            <div class="js-goods-klass"></div>\n            <input type="hidden" name="class_1">\n            <input type="hidden" name="class_2">\n        </div>\n    </div>\n</div>\n\n';
        return __p
    }
}), define("views/class_info", ["require", "marionette", "components/goods_klass/app", "tpl!templates/class_info"], function (e) {
    var t = e("marionette"), n = e("components/goods_klass/app"), i = t.ItemView.extend({
        template: e("tpl!templates/class_info"),
        ui: {classBlock: ".js-class-block"},
        initialize: function () {
            Backbone.Validation.bind(this)
        },
        onShow: function () {
            this.goodsKlassView = new n, this.goodsKlassView.setCurrentKlass({
                class_1: this.model.get("class_1"),
                class_2: this.model.get("class_2")
            }), this.goodsKlassView.setParentNode(this.$(".js-goods-klass")), this.listenTo(this.goodsKlassView, "select", function (e) {
                this.model.set(e), this.resetValidate()
            })
        },
        resetValidate: function () {
            this.ui.classBlock.removeClass("error"), this.ui.classBlock.find(".error-message").remove()
        }
    });
    return i
}), define("tpl!templates/step1", [], function () {
    return function (obj) {
        var __p = "";
        Array.prototype.join;
        with (obj || {})__p += '<div class="clearfix ui-box">\n    <div class="pull-right">\n        <span class="help-icon"></span>\n        商品类目及类目细项，\n        <a href="http://kdt.im/RL72Svr1m" target="_blank" class="new-window">请点此查看详情</a>\n    </div>\n</div>\n<div id="class-info-region" class="goods-info-group"></div>\n<div class="app-actions">\n    <div class="form-actions text-center">\n        <button data-next-step="2" class="btn btn-primary js-switch-step">下一步</button>\n    </div>\n</div>\n';
        return __p
    }
}), define("views/step1", ["require", "underscore", "backbone", "marionette", "core/reqres", "models/class_info", "views/class_info", "tpl!templates/step1"], function (e) {
    var t = (e("underscore"), e("backbone"), e("marionette")), n = e("core/reqres"), i = e("models/class_info"), s = e("views/class_info"), o = t.Layout.extend({
        tagName: "form",
        className: "form-horizontal fm-goods-info",
        template: e("tpl!templates/step1"),
        regions: {classInfoRegion: "#class-info-region"},
        onShow: function () {
            this.initModules()
        },
        initModules: function () {
            this.initClassInfo(), this.setHandlers()
        },
        initClassInfo: function () {
            this.classInfoModel = new i({class_1: this.model.get("class_1"), class_2: this.model.get("class_2")});
            var e = this.classInfoView = new s({model: this.classInfoModel});
            this.classInfoRegion.show(e)
        },
        setHandlers: function () {
            n.setHandler("step1:validate", function () {
                return this.classInfoModel.validate()
            }, this), n.setHandler("class_info:get", function () {
                return this.classInfoModel.toJSON()
            }, this), n.setHandler("class_info:has_changed", function () {
                return !0
            }, this)
        },
        validateModel: function (e) {
            e.validate(e.changed)
        }
    });
    return o
}), define("tpl!components/popover/price_range/app.template", [], function () {
    return function (obj) {
        var __t, __p = "";
        Array.prototype.join;
        with (obj || {})__p += '<div class="ui-popover-inner">\n    <p>\n        <i>成本价：</i>\n        <span>￥' + (null == (__t = twoDecimal(cost)) ? "" : __t) + "</span>\n    </p>\n    <p>\n        <i>建议零售价：</i>\n        <span>￥" + (null == (__t = twoDecimal(min)) ? "" : __t) + " - ￥" + (null == (__t = twoDecimal(max)) ? "" : __t) + "</span>\n    </p>\n</div>\n";
        return __p
    }
}), define("components/popover/price_range/app", ["require", "core/utils", "../_base/app", "tpl!./app.template"], function (e) {
    var t = e("core/utils"), n = e("../_base/app");
    return n.extend({template: e("tpl!./app.template"), templateHelpers: {twoDecimal: t.twoDecimal}})
}), define("tpl!templates/base_info", [], function () {
    return function (obj) {
        var __t, __p = "";
        Array.prototype.join;
        with (obj || {})__p += '<div class="info-group-title vbox">\n    <div class="group-inner">基本信息</div>\n</div>\n<div class="info-group-cont vbox">\n    <div class="group-inner">\n        <div class="control-group">\n            <label class="control-label">商品类目：</label>\n            <div class="controls">\n                <div class="static-value">\n                    ', __p += goods_class_name ? "\n                        " + (null == (__t = goods_class_name) ? "" : _.escape(__t)) + "\n                    " : '\n                        无 <a style="margin-left: 20px;" data-next-step="1" class="js-switch-step" href="javascript:;">去选择商品品类</a>\n                    ', __p += '\n                </div>\n                <input type="hidden" name="class_1">\n                <input type="hidden" name="goods_class">\n            </div>\n        </div>\n        ', "0" == class_type && "10" != goods_type && "10" != goods_platform && (__p += '\n            <div class="control-group">\n                <label class="control-label">购买方式：</label>\n                <div class="controls">\n                    <label class="radio inline">\n                        <input type="radio" name="shop_method" value="1" ', "1" == shop_method && (__p += "checked"), __p += '>在有赞购买\n                    </label>\n                    <label class="radio inline">\n                        <input type="radio" name="shop_method" value="0" ', "0" == shop_method && (__p += "checked"), __p += '>链接到外部购买\n                        <span class="js-outbuy-tip ', "0" != shop_method && (__p += "hide"), __p += '">(每家店铺仅支持50个外部购买商品)</span>\n                    </label>\n                </div>\n            </div>\n        '), __p += '\n        <div class="control-group">\n            <label class="control-label">商品分组：</label>\n            <div class="controls">\n                <select class="js-tag chosen-select" name="tag" data-selected-id="' + (null == (__t = tag) ? "" : _.escape(__t)) + '" multiple data-placeholder="选择商品分组">\n                </select>\n                <p class="help-inline">\n                    <a class="js-refresh-tag" href="javascript:;">刷新</a>\n                    <span>|</span>\n                    <a class="new_window" target="_blank" href="/v2/showcase/tag#create">新建分组</a>\n                    <span>|</span>\n                    <a class="new_window" target="_blank" href="http://wap.koudaitong.com/v2/showcase/feature?alias=djbj0hb7">帮助</a>\n                </p>\n                <p class="help-desc js-tag-desc hide">\n                    使用“列表中隐藏”分组，商品将不出现在商品列表中\n                </p>\n            </div>\n        </div>\n        <div class="control-group">\n            <label class="control-label">商品类型：<br/><span class="gray">(发布后不能修改) </span></label>\n            <div class="controls">\n                <label class="radio inline">\n                    <input type="radio" name="shipment" value="0" ', "0" == shipment && (__p += "checked"), __p += " ", alias && (__p += "disabled"), __p += '>实物商品\n                    <span class="gray">（物流发货）</span>\n                </label>\n                <label class="radio inline">\n                    <input type="radio" name="shipment" value="2" ', "2" == shipment && (__p += "checked"), __p += " ", alias && (__p += "disabled"), __p += '>虚拟商品\n                    <span class="gray">（无需物流）</span>\n                </label>\n                <div class="js-virtual-goods-alert hide" style="margin-top: 10px;">\n                    您需遵守<a href="http://kdt.im/xlr0sm54N" target="_blank" class="new-window">《有赞微商城虚拟商品管理规范》</a>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n';
        return __p
    }
}), define("views/base_info", ["require", "underscore", "jquery", "backbone", "marionette", "tpl!templates/base_info"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("backbone"), s = e("marionette");
    return s.Layout.extend({
        className: "goods-info-group-inner",
        template: e("tpl!templates/base_info"),
        ui: {
            shopMethodRadio: '[name="shop_method"]',
            outbuyTip: ".js-outbuy-tip",
            tagSelect: ".js-tag",
            tagDesc: ".js-tag-desc"
        },
        events: {"change @ui.shopMethodRadio": "onShopMethodRadioChange"},
        _modelBinder: void 0,
        initialize: function (e) {
            var t = this;
            t._modelBinder = new i.ModelBinder, t.listenTo(t.model, "change:shop_method", t.onShopMethodChanged), t.listenTo(t.model, "change:tag", t.onTagChange), t.listenTo(t.model, "change:shipment", t.onShipmentChange)
        },
        serializeData: function () {
            var e = this.model.toJSON();
            return e.alias = e.alias || "", this.processData(e)
        },
        processData: function (e) {
            return e.goods_class_name = this.generateGoodsClass(e), e
        },
        generateGoodsClass: function (e) {
            e || (e = this.model.toJSON());
            var t = this.getClassNameArr(e);
            return t.join(" - ")
        },
        getClassNameArr: function (e) {
            var n = window._global.defaultClass, i = [];
            if (!e.class_1)return i;
            var s = t(n).findWhere({id: e.class_1});
            if (!s)return i;
            i.push(s.name);
            var o = t(s.list).findWhere({id: e.class_2});
            return o ? (i.push(o.name), i) : i
        },
        onRender: function () {
            this.onShipmentChange()
        },
        onShow: function () {
            this.initTagChosen(), this.initDataBindings()
        },
        initTagChosen: function () {
            var e = this, t = e.ui.tagSelect, i = t.chosen({no_results_text: "木有找到这个分类：", width: "200px"});
            e.$(".js-refresh-tag").on("click", function (s) {
                var o = e.model.get("tag");
                n.get(window._global.url.www + "/showcase/tag/option", {selected: o}, function (n) {
                    t.html(n), i.trigger("chosen:updated"), e.model.trigger("change:tag")
                }), s.preventDefault()
            }).trigger("click"), t.trigger("chosen:updated")
        },
        initDataBindings: function () {
            var e = this, t = {
                tag: {selector: '[name="tag"]', converter: e.tagConverter},
                shipment: '[name="shipment"]'
            };
            e._modelBinder.bind(e.model, e.el, t)
        },
        onShopMethodRadioChange: function (e) {
            var t = this;
            e.preventDefault();
            var i = n(e.target), s = i.val();
            t.model.set("shop_method", s)
        },
        onTagChange: function () {
            var e = this, t = e._findDefaultOption().toString(), n = e.model.get("tag") || [];
            this.ui.tagDesc.toggleClass("hide", -1 === n.indexOf(t))
        },
        _findDefaultOption: function () {
            var e = this, t = e.ui.tagSelect.find("option");
            if (e._defaultTagId)return e._defaultTagId;
            for (var i = "", s = 0; s < t.length; s++) {
                var o = t[s], a = n.trim(o.innerText);
                if ("列表中隐藏" === a) {
                    i = o.value;
                    break
                }
            }
            return e._defaultTagId = i, i
        },
        tagConverter: function (e, t) {
            return null === t ? [] : t
        },
        onShopMethodChanged: function (e, t) {
            this.ui.outbuyTip.toggleClass("hide", 0 !== +t)
        },
        onShipmentChange: function () {
            var e = +this.model.get("shipment");
            e ? this.$(".js-virtual-goods-alert").show() : this.$(".js-virtual-goods-alert").hide()
        },
        onClose: function () {
            this._modelBinder.unbind()
        }
    })
}), define("text!components/pop/templates/link.html", [], function () {
    return '<div class="arrow"></div>\n<div class="popover-inner popover-link">\n    <div class="popover-content">\n        <div class="form-inline">\n            <input type="text" class="link-placeholder js-link-placeholder" placeholder="<%= content %>">\n            <button type="button" class="btn btn-primary js-btn-confirm" data-loading-text="确定"> 确定</button>\n            <button type="reset" class="btn js-btn-cancel">取消</button>\n        </div>\n    </div>\n</div>\n'
}), define("components/pop/link", ["backbone", "components/pop/base", "text!components/pop/templates/link.html", "core/utils"], function (e, t, n, i) {
    return t.extend({
        template: _.template(n),
        className: "popover popover-link-wrap bottom",
        events: {
            "click .js-btn-cancel": "hide",
            "click .js-btn-confirm": "triggerCallback",
            "keydown .js-link-placeholder": function (e) {
                e.keyCode === i.keyCode.ENTER && this.triggerCallback()
            }
        },
        initialize: function (e) {
            this.content = e.content || "链接地址：http://example.com", this.callback = e.callback, this.target = e.target, this.trigger = e.trigger, e.notAutoHide || this.autoHide()
        },
        render: function (e) {
            return this.$el.html(this.template({content: this.content})), this
        },
        positioning: function () {
            this.$el.show().position({
                of: this.target,
                my: "center top+5",
                at: "center bottom",
                collision: "none"
            }), this.$(".js-link-placeholder").focus()
        },
        reset: function (e) {
            var t = e.callback, n = e.target, i = e.trigger, s = e.content || "链接地址：http://example.com";
            this.$(".js-link-placeholder").attr("placeholder", s), this.setCallback(t), this.setTarget(n), this.setTrigger(i), this.positioning(), this.clearInput(), this.show()
        },
        triggerCallback: function () {
            var e = i.urlCheck(this.$(".js-link-placeholder").val());
            this.callback.call(this, e), this.hide()
        },
        clearInput: function () {
            this.$(".js-link-placeholder").val("")
        }
    })
}), define("components/pop/atom/link", ["require", "backbone", "components/pop/link"], function (e) {
    var t = (e("backbone"), e("components/pop/link"));
    return {
        initialize: function (e) {
            var n = e.target = $(e.target), i = (e.className, e.type, e.callback), s = e.trigger = $(e.trigger || n), o = (e.data, e.notAutoHide || !1, e.content || ""), a = e.appendTarget || "body", l = new t({
                callback: i,
                target: n,
                trigger: s,
                content: o
            });
            return l.render().$el.appendTo(a), l.positioning(), l
        }
    }
}), define("text!components/image/2.0.0/templates/layout.html", [], function () {
    return '<div class="modal-header">\n    <a class="close" data-dismiss="modal">×</a>\n    <!-- 顶部tab -->\n    <ul class="module-nav modal-tab js-modal-tab">\n        <li class="js-modal-tab-item js-modal-tab-image active">\n            <a href="javascript:;" data-pane="image">用过的图片</a>\n            <span>|</span>\n        </li>\n        <li class="js-modal-tab-item js-modal-tab-icon">\n            <a href="javascript:;" data-pane="icon">图标库</a>\n            <span>|</span>\n        </li>\n        <li class="js-modal-tab-item js-modal-tab-upload">\n            <a href="javascript:;" data-pane="upload">新图片</a>\n        </li>\n    </ul>\n</div>\n<div class="tab-pane js-tab-pane js-tab-pane-image js-image-region"></div>\n<div class="tab-pane js-tab-pane js-tab-pane-icon js-icon-region hide"></div>\n<div class="tab-pane js-tab-pane js-tab-pane-upload js-upload-region hide"></div>\n\n'
}), define("components/image/2.0.0/models/image_list", ["require", "components/list/models/list", "core/utils"], function (e) {
    var t, n = e("components/list/models/list"), i = e("core/utils");
    return t = i.isFenxiao() ? _global.url.fenxiao + "/showcase/attachment/alert.json?media_type=1&v=2" : _global.url.www + "/showcase/attachment/alert.json?media_type=1&v=2", n.extend({
        url: t,
        selectedModels: [],
        isSelected: function (e) {
            return _.some(this.selectedModels, function (t) {
                return t.get("attachment_id") === e.get("attachment_id")
            })
        },
        toggleSelected: function (e) {
            this.isSelected(e) ? (this.selectedModels = _.reject(this.selectedModels, function (t) {
                return t.get("attachment_id") === e.get("attachment_id")
            }), this.trigger("unselect", this.selectedModels.length, e)) : (this.selectedModels.push(e), this.trigger("select", this.selectedModels.length, e))
        },
        clean: function () {
            this.selectedModels = []
        },
        getSelectedImages: function () {
            return _.map(this.selectedModels, function (e) {
                return e.toJSON()
            })
        },
        parse: function (e) {
            var t = e.data_list;
            return e.page = e.page_view, delete e.data_list, delete e.page_view, this.get("items").reset(t, {silent: !0}), e
        }
    })
}), define("components/image/2.0.0/views/image_item", ["require", "underscore", "core/reqres", "core/event", "core/utils", "components/list/views/list_item"], function (e) {
    var t = (e("underscore"), e("core/reqres")), n = e("core/event"), i = e("core/utils"), s = e("components/list/views/list_item");
    return s.extend({
        tagName: "li",
        className: function () {
            return " widget-image-item"
        },
        events: {click: "toggleSelect"},
        templateHelpers: {fullfillImage: i.fullfillImage},
        onBeforeRender: function () {
            this.appOptions = t.request("widget:image:app:options")
        },
        onRender: function () {
            this.$el.toggleClass("selected", this.isSelected())
        },
        toggleSelect: function () {
            var e = +this.model.get("attachment_size") || 0;
            return e && this.appOptions.maxSize < e ? (i.clearNotify(), void i.errorNotify("图片不能大于 " + this.appOptions.maxSizeText)) : this.appOptions.multiChoose ? (this.layout.model.toggleSelected(this.model), void this.$el.toggleClass("selected")) : void n.trigger("widget:image:select:finish", [this.model.toJSON()])
        },
        isSelected: function () {
            return this.layout.model.isSelected(this.model)
        }
    })
}), define("components/image/2.0.0/views/image_filter", ["require", "underscore", "core/utils", "components/list/views/list_filter"], function (e) {
    var t = e("underscore"), n = (e("core/utils"), e("components/list/views/list_filter"));
    return n.extend({
        events: t.extend({}, n.prototype.events, {"click .js-refresh": "refresh"}), refresh: function () {
            this.model.fetch()
        }
    })
}), define("components/image/2.0.0/views/image_footer", ["require", "underscore", "core/utils", "components/list/views/list_footer"], function (e) {
    var t = e("underscore"), n = (e("core/utils"), e("components/list/views/list_footer"));
    return n.extend({
        events: t.extend({}, n.prototype.events, {"click .js-choose-image": "chooseImage"}),
        modelEvents: {unselect: "select", select: "select"},
        onRender: function () {
            this.select(this.model.selectedModels.length)
        },
        select: function (e, t) {
            this.$(".js-choose-image").toggleClass("hide", !e)
        },
        chooseImage: function () {
            var e = this.model.getSelectedImages();
            e && e.length && window.NC.trigger("widget:image:select:finish", e)
        }
    })
}), define("text!components/image/2.0.0/templates/image.html", [], function () {
    return '<div class="modal-body">\n\n    <div class="js-list-filter-region clearfix ui-box" style="position: relative; min-height: 28px;">\n\n    </div>\n\n    <div class="ui-box">\n        <ul class="js-list-body-region widget-image-list"></ul>\n        <div class="js-list-empty-region"></div>\n    </div>\n\n</div>\n<div class="modal-footer js-list-footer-region">\n\n</div>\n'
}), define("text!components/image/2.0.0/templates/image_item.html", [], function () {
    return '<div class="js-choose" title="<%= attachment_title %>">\n    <p class="image-size"><%= attachment_title.slice(0, 5) %><br><%= (attachment_size / 1000).toFixed(1) %> KB</p>\n    <div class="widget-image-item-content" style="background-image: url(<%= fullfillImage(thumb_url) %>)"></div>\n    <% if(+width && +height) { %>\n    <div class="widget-image-meta">\n        <%= width + \'x\' + height %>\n    </div>\n    <% } %>\n    <div class="selected-style"><i class="icon-ok icon-white"></i></div>\n</div>\n'
}), define("text!components/image/2.0.0/templates/image_filter.html", [], function () {
    return '<div class="widget-image-refresh">\n    <span>点击图片即可选中</span>\n    <a href="javascript:;" class="js-refresh">刷新</a>\n</div>\n<div class="js-list-search ui-search-box">\n    <input class="txt" type="text" placeholder="搜索" value="<%= keyword %>">\n</div>\n'
}), define("text!components/image/2.0.0/templates/image_footer.html", [], function () {
    return '<div class="pull-left">\n    <a href="javascript:;" class="ui-btn ui-btn-primary js-choose-image hide">确定使用</a>\n</div>\n<div class="pagenavi"><%= page %></div>\n'
}), define("components/image/2.0.0/views/image", ["require", "underscore", "core/utils", "components/list/views/list", "components/image/2.0.0/models/image_list", "components/image/2.0.0/views/image_item", "components/image/2.0.0/views/image_filter", "components/image/2.0.0/views/image_footer", "text!components/image/2.0.0/templates/image.html", "text!components/image/2.0.0/templates/image_item.html", "text!components/image/2.0.0/templates/image_filter.html", "text!components/image/2.0.0/templates/image_footer.html"], function (e) {
    var t = e("underscore"), n = (e("core/utils"), e("components/list/views/list"));
    return n.extend({
        defaults: {
            ListModel: e("components/image/2.0.0/models/image_list"),
            ListItemView: e("components/image/2.0.0/views/image_item"),
            ListFilterView: e("components/image/2.0.0/views/image_filter"),
            ListFooterView: e("components/image/2.0.0/views/image_footer"),
            listTemplate: t.template(e("text!components/image/2.0.0/templates/image.html")),
            listItemTemplate: t.template(e("text!components/image/2.0.0/templates/image_item.html")),
            listFilterTemplate: t.template(e("text!components/image/2.0.0/templates/image_filter.html")),
            listFooterTemplate: t.template(e("text!components/image/2.0.0/templates/image_footer.html"))
        }, clean: function () {
            this.model.clean()
        }, setHash: function () {
        }
    })
}), define("components/image/2.0.0/models/icon_list", ["require", "components/image/2.0.0/models/image_list"], function (e) {
    var t = e("components/image/2.0.0/models/image_list");
    return t.extend({
        url: _global.url.www + "/common/ironDb/list.json",
        defaults: _.extend({}, t.prototype.defaults, {style: "0", color: "0", image_type: "0"}),
        parse: function (e) {
            var t = e.list;
            return delete e.list, this.get("items").reset(t, {silent: !0}), e
        }
    })
}), define("components/image/2.0.0/views/icon_filter", ["require", "underscore", "core/utils", "components/list/views/list_filter"], function (e) {
    var t = e("underscore"), n = e("core/utils"), i = e("components/list/views/list_filter");
    return i.extend({
        events: t.extend({}, i.prototype.events, {"change input": "filter"}),
        updateModel: n.updateModel,
        filter: function (e) {
            this.model.set("p", 1, {silent: !0}), this.updateModel(e), this.render(), this.refresh()
        },
        refresh: function () {
            this.model.fetch()
        }
    })
}), define("text!components/image/2.0.0/templates/icon_filter.html", [], function () {
    return '<div class="widget-image-filter">\n    <span class="c-gray">风格: </span>\n    <label class="radio inline <%= style == 0 ? \'checked\' : \'\' %>">\n        <input type="radio" name="style" value="0" <%= style == 0 ? \'checked\' : \'\' %>>\n        <span>全部</span>\n    </label>\n    <label class="radio inline <%= style == 1 ? \'checked\' : \'\' %>">\n        <input type="radio" name="style" value="1" <%= style == 1 ? \'checked\' : \'\' %>>\n        <span>普通</span>\n    </label>\n    <label class="radio inline <%= style == 2 ? \'checked\' : \'\' %>">\n        <input type="radio" name="style" value="2" <%= style == 2 ? \'checked\' : \'\' %>>\n        <span>简约</span>\n    </label>\n</div>\n<div class="widget-image-filter">\n    <span class="c-gray">颜色: </span>\n    <label class="radio inline <%= color == 0 ? \'checked\' : \'\' %>">\n        <input type="radio" name="color" value="0" <%= color == 0 ? \'checked\' : \'\' %>>\n        <span>全部</span>\n    </label>\n    <label class="radio inline <%= color == 1 ? \'checked\' : \'\' %>">\n        <input type="radio" name="color" value="1" <%= color == 1 ? \'checked\' : \'\' %>>\n        <span>白色</span>\n    </label>\n    <label class="radio inline <%= color == 2 ? \'checked\' : \'\' %>">\n        <input type="radio" name="color" value="2" <%= color == 2 ? \'checked\' : \'\' %>>\n        <span>灰色</span>\n    </label>\n</div>\n<div class="widget-image-filter">\n    <span class="c-gray">类型: </span>\n    <label class="radio inline <%= image_type == 0 ? \'checked\' : \'\' %>">\n        <input type="radio" name="image_type" value="0" <%= image_type == 0 ? \'checked\' : \'\' %>>\n        <span>全部</span>\n    </label>\n    <label class="radio inline <%= image_type == 1 ? \'checked\' : \'\' %>">\n        <input type="radio" name="image_type" value="1" <%= image_type == 1 ? \'checked\' : \'\' %>>\n        <span>常规</span>\n    </label>\n    <label class="radio inline <%= image_type == 2 ? \'checked\' : \'\' %>">\n        <input type="radio" name="image_type" value="2" <%= image_type == 2 ? \'checked\' : \'\' %>>\n        <span>购物</span>\n    </label>\n    <label class="radio inline <%= image_type == 3 ? \'checked\' : \'\' %>">\n        <input type="radio" name="image_type" value="3" <%= image_type == 3 ? \'checked\' : \'\' %>>\n        <span>交通</span>\n    </label>\n    <label class="radio inline <%= image_type == 4 ? \'checked\' : \'\' %>">\n        <input type="radio" name="image_type" value="4" <%= image_type == 4 ? \'checked\' : \'\' %>>\n        <span>商务</span>\n    </label>\n    <label class="radio inline <%= image_type == 5 ? \'checked\' : \'\' %>">\n        <input type="radio" name="image_type" value="5" <%= image_type == 5 ? \'checked\' : \'\' %>>\n        <span>食物</span>\n    </label>\n    <label class="radio inline <%= image_type == 6 ? \'checked\' : \'\' %>">\n        <input type="radio" name="image_type" value="6" <%= image_type == 6 ? \'checked\' : \'\' %>>\n        <span>娱乐</span>\n    </label>\n    <label class="radio inline <%= image_type == 7 ? \'checked\' : \'\' %>">\n        <input type="radio" name="image_type" value="7" <%= image_type == 7 ? \'checked\' : \'\' %>>\n        <span>美妆</span>\n    </label>\n</div>\n\n\n';
}), define("components/image/2.0.0/views/icon", ["require", "underscore", "core/utils", "components/image/2.0.0/views/image", "components/image/2.0.0/models/icon_list", "components/image/2.0.0/views/image_item", "components/image/2.0.0/views/icon_filter", "components/image/2.0.0/views/image_footer", "text!components/image/2.0.0/templates/image.html", "text!components/image/2.0.0/templates/image_item.html", "text!components/image/2.0.0/templates/icon_filter.html", "text!components/image/2.0.0/templates/image_footer.html"], function (e) {
    var t = e("underscore"), n = (e("core/utils"), e("components/image/2.0.0/views/image"));
    return n.extend({
        defaults: {
            ListModel: e("components/image/2.0.0/models/icon_list"),
            ListItemView: e("components/image/2.0.0/views/image_item"),
            ListFilterView: e("components/image/2.0.0/views/icon_filter"),
            ListFooterView: e("components/image/2.0.0/views/image_footer"),
            listTemplate: t.template(e("text!components/image/2.0.0/templates/image.html")),
            listItemTemplate: t.template(e("text!components/image/2.0.0/templates/image_item.html")),
            listFilterTemplate: t.template(e("text!components/image/2.0.0/templates/icon_filter.html")),
            listFooterTemplate: t.template(e("text!components/image/2.0.0/templates/image_footer.html"))
        }
    })
}), define("text!components/image/2.0.0/templates/upload.html", [], function () {
    return '<div class="js-upload-network-region"></div>\n<div class="js-upload-local-region"></div>\n'
}), define("text!components/image/2.0.0/templates/upload_network.html", [], function () {
    return '<div class="modal-body">\n    <div class="get-web-img js-get-web-img">\n        <form class="form-horizontal" onsubmit="return false;">\n            <div class="control-group">\n                <label class="control-label">网络图片：</label>\n                <div class="controls">\n                    <input type="text" name="attachment_url" class="get-web-img-input js-web-img-input" placeholder="请贴入网络图片地址" value="<%= attachment_url %>">\n                    <input type="button" class="btn js-upload-network-img" data-loading-text="提取中..." value="提取">\n                </div>\n                <div class="controls preview-container">\n                    <% if(attachment_url) { %>\n                        <img src="<%= attachment_url %>" alt="">\n                    <% } %>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>\n'
}), define("components/image/2.0.0/models/upload_network", ["require", "underscore", "backbone", "core/utils"], function (e) {
    var t = (e("underscore"), e("backbone")), n = e("core/utils");
    return t.Model.extend({
        url: window._global.url.img + "/download?format=json",
        defaults: {attachment_url: "", media_type: "image", v: 2, mp_id: window._global.kdt_id},
        sync: function () {
            return n.ajax({url: this.url, type: "POST", data: this.toJSON()})
        }
    })
}), define("components/image/2.0.0/views/upload_network", ["require", "underscore", "backbone", "marionette", "core/reqres", "core/event", "core/utils", "text!components/image/2.0.0/templates/upload_network.html", "components/image/2.0.0/models/upload_network"], function (e) {
    var t = e("underscore"), n = (e("backbone"), e("marionette")), i = e("core/reqres"), s = e("core/event"), o = e("core/utils"), a = e("text!components/image/2.0.0/templates/upload_network.html"), l = e("components/image/2.0.0/models/upload_network");
    return n.ItemView.extend({
        template: t.template(a),
        ui: {upload: ".js-upload-network-img"},
        events: {"blur .js-web-img-input": "updateModel", "click @ui.upload": "uploadNetworkImage"},
        updateModel: o.updateModel,
        initialize: function () {
            this.model = new l
        },
        onBeforeRender: function () {
            this.appOptions = i.request("widget:image:app:options")
        },
        uploadNetworkImage: function (e) {
            if (!this.model.get("attachment_url"))return void this.$(".js-web-img-input").eq(0).focus();
            var t = this;
            this.render(), this.ui.upload.button("loading"), this.model.sync().always(function () {
                t.ui.upload.button("reset")
            }).done(function (e) {
                var n = e.success;
                return n ? n.attachment_size > t.appOptions.maxSize ? (o.clearNotify(), void o.errorNotify("图片不能大于 " + t.appOptions.maxSizeText)) : void s.trigger("widget:image:select:finish", [n]) : void o.errorNotify("出错了，请重试")
            }).fail(function () {
                o.errorNotify("出错了，请检查网络图片地址")
            })
        }
    })
}), define("text!components/image/2.0.0/templates/upload_local.html", [], function () {
    return '<div class="modal-body">\n    <div class="upload-local-img">\n        <form class="form-horizontal">\n            <div class="control-group">\n                <label class="control-label">本地图片：</label>\n                <div class="controls">\n                    <div class="control-action">\n                        <ul class="js-upload-image-list upload-image-list clearfix ui-sortable">\n                            <li class="fileinput-button js-add-image">\n                                <a class="fileinput-button-icon" href="javascript:;">+</a>\n                                <input class="js-fileupload-input fileupload" type="file" <%= multiUpload ? \'multiple\' : \'\' %>>\n                            </li>\n                        </ul>\n                        <p class="help-desc">最大支持 <%= maxSizeText %> 的图片( jpg / gif / png )，不能选中大于 <%= maxSizeText %> 的图片</p>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </form>\n</div>\n<div class="modal-footer">\n    <div class="modal-action pull-right">\n        <input type="button" class="btn btn-primary js-upload-image" data-loading-text="上传中..." value="确定上传">\n    </div>\n</div>\n'
}), define("components/image/2.0.0/collections/upload_local", ["require", "underscore", "jquery", "core/reqres", "backbone", "core/utils"], function (e) {
    var t = (e("underscore"), e("jquery")), n = e("core/reqres"), i = e("backbone"), s = e("core/utils");
    return i.Collection.extend({
        url: "http://up.qiniu.com", sync: function () {
            var e = this, i = t.Deferred();
            return this.appOptions = n.request("widget:image:app:options"), this.getToken().done(function (t) {
                e.upload(t.uptoken).done(function () {
                    i.resolve()
                }).fail(function () {
                    i.reject()
                })
            }).fail(function (e) {
                i.reject(e || "获取token失败，请重试")
            }), i.promise()
        }, getToken: function () {
            return s.ajax({
                url: this.appOptions.uploadURL,
                type: "POST",
                dataType: this.appOptions.dataType,
                data: {
                    kdt_id: window._global.kdt_id,
                    scope: this.appOptions["private"] ? _global.js.qn_private : _global.js.qn_public
                }
            })
        }, upload: function (e) {
            var n = this, i = this.map(function (i) {
                var o = new FormData;
                return o.append("token", e), o.append("file", i.get("file")), s.ajax({
                    url: n.url,
                    type: "POST",
                    data: o,
                    processData: !1,
                    contentType: !1,
                    xhr: function () {
                        var e = t.ajaxSettings.xhr();
                        return e.upload.addEventListener("progress", function (e) {
                            i.trigger("upload:progress", Math.ceil(e.loaded / e.total * 100))
                        }, !1), e
                    }
                }).done(function (e) {
                    i.set("image", e)
                })
            });
            return t.when.apply(null, i)
        }, swapImages: function (e, t) {
            var n = this.models, i = n.splice(e, 1)[0];
            return n.splice(t, 0, i), n
        }
    })
}), define("text!components/image/2.0.0/templates/upload_local_item.html", [], function () {
    return '<img src="<%= src %>">\n<a href="javascript:;" class="close-modal small js-remove-image">×</a>\n'
}), define("components/image/2.0.0/views/upload_local_item", ["require", "underscore", "backbone", "marionette", "core/utils", "text!components/image/2.0.0/templates/upload_local_item.html"], function (e) {
    var t = e("underscore"), n = (e("backbone"), e("marionette")), i = (e("core/utils"), e("text!components/image/2.0.0/templates/upload_local_item.html"));
    return n.ItemView.extend({
        tagName: "li",
        template: t.template(i),
        className: "upload-preview-img sort",
        events: {"click .js-remove-image": "removeImage"},
        modelEvents: {"upload:progress": "progress"},
        removeImage: function () {
            this.model.destroy()
        },
        progress: function (e) {
        }
    })
}), define("components/image/2.0.0/views/upload_local", ["require", "underscore", "core/reqres", "core/event", "marionette", "core/utils", "jqueryui", "text!components/image/2.0.0/templates/upload_local.html", "components/image/2.0.0/collections/upload_local", "components/image/2.0.0/views/upload_local_item"], function (e) {
    var t = e("underscore"), n = e("core/reqres"), i = e("core/event"), s = e("marionette"), o = e("core/utils");
    e("jqueryui");
    var a = e("text!components/image/2.0.0/templates/upload_local.html"), l = e("components/image/2.0.0/collections/upload_local"), c = e("components/image/2.0.0/views/upload_local_item");
    return s.CompositeView.extend({
        template: t.template(a),
        itemView: c,
        itemViewContainer: ".js-upload-image-list",
        events: {"change .js-fileupload-input": "selectFile", "click .js-upload-image": "upload"},
        initialize: function () {
            this.collection = new l, this.appOptions = n.request("widget:image:app:options"), this.listenTo(this.collection, "add remove reset sort", this.toggleAddBtn)
        },
        serializeData: function () {
            return this.appOptions
        },
        onRender: function () {
            var e = this;
            return this.$(".js-upload-image-list").sortable({
                items: "> .sort", cursor: "move", start: function (e, t) {
                    t.item.data("startPos", t.item.index())
                }, stop: function (t, n) {
                    var i = n.item.data("startPos"), s = n.item.index();
                    i !== s && e.collection.swapImages(i, s)
                }
            }), this
        },
        selectFile: function (e) {
            var n = e.target.files, i = this;
            t.each(n, function (e) {
                e.size > i.appOptions.maxSize || e.name.match(/(\.|\/)(gif|jpe?g|png)$/i) && i.previewAndAdd(e)
            }), $(e.target).val("")
        },
        previewAndAdd: function (e) {
            var t = new FileReader, n = this;
            t.onload = function (t) {
                n.collection.add({src: t.target.result, file: e})
            }, t.readAsDataURL(e)
        },
        upload: function (e) {
            if (0 !== this.collection.length) {
                var t = this, n = $(e.target);
                n.button("loading"), this.collection.sync().done(function () {
                    o.successNotify("上传成功");
                    var e = t.collection.map(function (e) {
                        return e.get("image")
                    });
                    i.trigger("widget:image:select:finish", e)
                }).fail(function (e) {
                    n.button("reset"), o.errorNotify(e || "上传失败，请重试"), i.trigger("widget:image:select:error", e)
                })
            }
        },
        toggleAddBtn: function () {
            this.appOptions.multiUpload || this.$(".js-add-image").toggleClass("hide", this.collection.length > 0)
        },
        appendBuffer: function (e, t) {
            e.$(".fileinput-button").before(t)
        },
        appendHtml: function (e, t) {
            e.isBuffering ? (e.elBuffer.appendChild(t.el), e._bufferedChildren.push(t)) : e.$(".fileinput-button").before(t.el)
        }
    })
}), define("components/image/2.0.0/views/upload", ["require", "underscore", "core/reqres", "core/event", "marionette", "core/utils", "text!components/image/2.0.0/templates/upload.html", "components/image/2.0.0/views/upload_network", "components/image/2.0.0/views/upload_local"], function (e) {
    var t = e("underscore"), n = e("core/reqres"), i = (e("core/event"), e("marionette")), s = (e("core/utils"), e("text!components/image/2.0.0/templates/upload.html")), o = e("components/image/2.0.0/views/upload_network"), a = e("components/image/2.0.0/views/upload_local");
    return i.Layout.extend({
        template: t.template(s),
        regions: {networkRegion: ".js-upload-network-region", localRegion: ".js-upload-local-region"},
        initialize: function (e) {
            this.options = e || {}
        },
        onBeforeRender: function () {
            this.appOptions = n.request("widget:image:app:options")
        },
        onRender: function () {
            this.appOptions.hideDownload ? this.networkRegion.close() : this.networkRegion.show(new o), this.localRegion.show(new a)
        },
        clean: function () {
        }
    })
}), define("components/image/2.0.0/views/layout", ["require", "underscore", "core/reqres", "core/event", "marionette", "core/utils", "text!components/image/2.0.0/templates/layout.html", "components/image/2.0.0/views/image", "components/image/2.0.0/views/icon", "components/image/2.0.0/views/upload"], function (e) {
    var t = e("underscore"), n = e("core/reqres"), i = e("core/event"), s = e("marionette"), o = (e("core/utils"), e("text!components/image/2.0.0/templates/layout.html")), a = e("components/image/2.0.0/views/image"), l = e("components/image/2.0.0/views/icon"), c = e("components/image/2.0.0/views/upload"), r = {
        multiChoose: !0,
        multiUpload: !0,
        onlyUpload: !1,
        tabActive: "image",
        maxSize: 1024,
        hideDownload: !1,
        hideIconList: !1,
        uploadURL: _global.url.www + "/common/qiniu/upToken.json",
        dataType: void 0,
        "private": !1,
        callback: function () {
        }
    };
    return s.Layout.extend({
        className: "widget-image modal fade hide",
        template: t.template(o),
        regions: {imageRegion: ".js-image-region", iconRegion: ".js-icon-region", uploadRegion: ".js-upload-region"},
        events: {"click .js-modal-tab-item a": "switchTab"},
        initialize: function (e) {
            var t = this;
            this.setOptions(e), this.listenTo(i, "widget:image:select:finish", this.chooseImages), this.listenTo(i, "widget:image:select:error", this.chooseImagesError), n.setHandler("widget:image:app:options", function () {
                return t.options
            }), this.render()
        },
        setOptions: function (e) {
            e = e || {}, this.options = t.extend({}, r, e), this.options.onlyUpload && (this.options.tabActive = "upload"), void 0 === e.multiUpload && (this.options.multiUpload = this.options.multiChoose);
            var n = +this.options.maxSize;
            n % 1024 === 0 ? this.options.maxSizeText = n / 1024 + " MB" : this.options.maxSizeText = n + " KB", this.options.maxSize = 1024 * this.options.maxSize
        },
        show: function () {
            this.$el.modal("show"), this.cleanViews(), this.renderTab(), this.renderViews()
        },
        cleanViews: function () {
            this.imageView && this.imageView.clean(), this.iconView && this.iconView.clean(), this.uploadView && this.uploadView.clean()
        },
        renderViews: function () {
            this.options.onlyUpload || (this.renderImageView(), this.renderIconView()), this.renderUploadView()
        },
        renderImageView: function () {
            this.imageView || (this.imageView = new a), this.imageRegion.show(this.imageView)
        },
        renderIconView: function () {
            this.options.hideIconList || (this.iconView || (this.iconView = new l), this.iconRegion.show(this.iconView))
        },
        renderUploadView: function () {
            this.uploadView || (this.uploadView = new c), this.uploadRegion.show(this.uploadView)
        },
        renderTab: function () {
            this.options.onlyUpload ? (this.$(".js-modal-tab-item").addClass("hide"), this.$(".js-modal-tab-upload").removeClass("hide")) : (this.$(".js-modal-tab-item").removeClass("hide"), this.$(".js-modal-tab-icon").toggleClass("hide", this.options.hideIconList));
            var e = this.options.tabActive.toLowerCase();
            this._switchTab(e)
        },
        switchTab: function (e) {
            var t = $(e.currentTarget), n = t.data("pane");
            this._switchTab(n)
        },
        _switchTab: function (e) {
            this.$(".js-modal-tab-item").removeClass("active"), this.$(".js-modal-tab-" + e).addClass("active"), this.$(".js-tab-pane").addClass("hide"), this.$(".js-tab-pane-" + e).removeClass("hide")
        },
        chooseImages: function (e) {
            this.options.callback(e), this.$el.modal("hide")
        },
        chooseImagesError: function (e) {
            this.options.onFail && this.options.onFail(e)
        }
    })
}), define("components/image/2.0.0/app", ["require", "components/image/2.0.0/views/layout"], function (e) {
    var t = e("components/image/2.0.0/views/layout");
    return {
        widget: "image", version: "2.0.0", initialize: function (e) {
            this._initialized ? this._app.setOptions(e) : (this._initialized = !0, this._app = new t(e)), this._app.show()
        }
    }
}), define("text!templates/goods_info.html", [], function () {
    return '<div class="info-group-title vbox">\n    <div class="group-inner">商品信息</div>\n</div>\n<div class="info-group-cont vbox">\n    <div class="group-inner">\n        <div class="control-group">\n            <label class="control-label"><em class="required">*</em>商品名：</label>\n            <div class="controls">\n                <input class="input-xxlarge" type="text" name="title" value="<%= title %>" maxlength="100" />\n                <span class="autoread-goods">\n                    <a href="javascript: ;" class="js-autoread-goods">快速导入淘宝商品信息</a>\n                </span>\n            </div>\n        </div>\n\n        <div class="control-group">\n            <label class="control-label"><em class="required">*</em>价格：</label>\n            <div class="controls">\n                <div class="input-prepend">\n                    <span class="add-on">￥</span>\n                    <input data-stock-id="total" type="text" maxlength="10" name="price" value="<%= price %>" class="js-price input-small" />\n                </div>\n                <% if(isFx) { %>\n                <input data-stock-id="total" type="text" maxlength="10" name="profit" value="<%= profit %>" class="js-profit input-small" readonly />\n                <% } %>\n                <input type="text" class="input-small" placeholder="淘价：¥99.99" name="origin" value="<%= origin %>">\n            </div>\n        </div>\n\n        <div class="control-group">\n            <label class="control-label"><em class="required">*</em>商品图：</label>\n            <div class="controls">\n                <input type="hidden" name="picture" />\n                <div class="picture-list">\n                    <ul class="js-picture-list app-image-list clearfix">\n                    <% _.each(picture, function(item, index) { %>\n                        <%= picTemplate({\'item\': item}) %>\n                    <% }); %>\n                    <li>\n                        <a href="javascript:;" class="add-goods js-add-picture">+加图</a>\n                    </li>\n                    </ul>\n                </div>\n                <p class="help-desc">建议尺寸：640 x 640 像素；您可以拖拽图片调整图片顺序。</p>\n            </div>\n        </div>\n        <div class="js-buy-url-group control-group <% if(shop_method != \'0\') { %>hide<% } %>">\n            <label class="control-label"><em class="required">*</em>外部购买地址：</label>\n            <div class="controls">\n                <input type="text" name="buy_url" value="<%= buy_url %>" class="input-xxlarge js-buy-url">\n                <a style="display: none;" href="javascript:;" class="js-help-notes circle-help">?</a>\n            </div>\n        </div>\n    </div>\n</div>\n'
}), define("text!templates/picture.html", [], function () {
    return '<li class="sort">\n    <a href="<%= Utils.fullfillImage(item.url) %>" target="_blank">\n        <img src="<%= Utils.fullfillImage(item.url, \'!100x100.jpg\') %>" />\n    </a>\n    <a class="js-delete-picture close-modal small hide">×</a>\n</li>\n'
}), define("views/goods_info", ["require", "underscore", "backbone", "marionette", "components/pop/atom/link", "components/image/2.0.0/app", "core/event", "core/reqres", "core/utils", "commons/utils", "text!templates/goods_info.html", "text!templates/picture.html"], function (e) {
    var t = e("underscore"), n = e("backbone"), i = e("marionette"), s = e("components/pop/atom/link"), o = e("components/image/2.0.0/app"), a = e("core/event"), l = e("core/reqres"), c = e("core/utils"), r = e("commons/utils"), d = e("text!templates/goods_info.html"), p = e("text!templates/picture.html"), u = i.Layout.extend({
        tagName: "div",
        className: "goods-info-group-inner",
        template: t.template(d),
        templateHelpers: {picTemplate: t.template(p)},
        ui: {
            autoread: ".js-autoread-goods",
            priceTxt: '[name="price"]',
            profitTxt: ".js-profit",
            originPriceTxt: '[name="origin"]',
            pictureContainer: ".js-picture-list",
            addPicture: ".js-add-picture",
            buyUrlGroup: ".js-buy-url-group",
            buyUrlRequired: ".js-buy-url-required"
        },
        events: {
            "click @ui.autoread": "autoreadGoods",
            "click @ui.addPicture": "addPicture",
            "click .js-delete-picture": "deletePicture",
            "blur .js-buy-url": "checkUrl"
        },
        _modelBinder: void 0,
        pictureMaxSize: 15,
        initialize: function (e) {
            var t = this;
            t.setConfig(e), t._modelBinder = new n.ModelBinder({modelSetOptions: {validate: !0}}), t.listenTo(t.model, "change", r.showLog), t.model.isFx && t.listenTo(t.model, "change:price", t.updateTotalProfit), t.listenTo(t.model, "change:shop_method", t.onShopMethodChanged), t.listenTo(t.model, "picture:reset", t.renderAllPicture), t.listenTo(a, "stock_module:hide", t.hideStockModule), t.listenTo(a, "stock_module:show", t.showStockModule)
        },
        onClose: function () {
            var e = this;
            e._modelBinder.unbind()
        },
        serializeData: function () {
            var e = this, t = {};
            return this.model && (t = this.model.toJSON(), t = e.processData(t)), t
        },
        processData: function (e) {
            var t = this, n = e.isFx = t.model.isFx;
            return e.price = c.twoDecimal(e.price), e.profit = t.calcTotalProfit(e.price, n), e
        },
        updateTotalProfit: function (e, t) {
            var n = this, i = n.calcTotalProfit(t, e.isFx);
            n.ui.profitTxt.val(i)
        },
        calcTotalProfit: function (e, t) {
            var n = {}, i = 0;
            return t && (n = l.request("price_range:get", "total") || {}, i = r.calcProfit(e, n)), i = "利润：" + i
        },
        onRender: function () {
            var e = this, n = e.model.get("stock");
            e.model.isFx && t.size(n) > 1 && e.ui.priceTxt.prop("readonly", !0)
        },
        onShow: function () {
            var e = this;
            e.initSortable(), e.initDataBindings()
        },
        setConfig: function (e) {
            var n = this;
            n.settings = {}, t(n.settings).extend(e)
        },
        initDataBindings: function () {
            var e = this, n = {
                title: '[name="title"]',
                buy_url: {selector: '[name="buy_url"]', converter: e.buyUrlConverter}
            };
            t(n).extend({
                price: {selector: '[name="price"]', converter: e.priceConverter},
                origin: {selector: '[name="origin"]'}
            }), e._modelBinder.bind(e.model, e.el, n)
        },
        originConverter: function (e, t) {
            return t = r.originValueFix(t)
        },
        priceConverter: function (e, t) {
            var n = r.decimalFix(t, 2);
            return n
        },
        buyUrlConverter: function (e, t) {
            return t = r.buyUrlValueFix(t)
        },
        onOriginBlur: function () {
            var e = this, t = e.ui.originPriceTxt, n = t.val(), i = r.originValueFix(n);
            return n === i ? !1 : void t.val(i)
        },
        checkPictureMaxSize: function (e) {
            var t = this, n = e.length < t.pictureMaxSize;
            return n
        },
        addPicture: function () {
            var e = this;
            o.initialize({
                hideIconList: !0, callback: function (n) {
                    t.isArray(n) ? t.each(n, function (t) {
                        e._addSinglePicture.call(e, t)
                    }) : e._addSinglePicture.call(e, n), e.model.calculateImage()
                }
            })
        },
        renderAllPicture: function () {
            var e = this;
            e.ui.pictureContainer.find("li.sort").remove();
            var n = e.model.get("picture");
            t(n).each(function (t) {
                e.renderPicture(t)
            })
        },
        renderPicture: function (e) {
            var t = this, n = t.templateHelpers.picTemplate({item: e});
            t.ui.pictureContainer.find("li:not(.sort)").before(n)
        },
        _addSinglePicture: function (e) {
            var t = this, n = t.model.get("picture");
            if (!t.checkPictureMaxSize(n))return c.errorNotify("商品图片最多支持 " + t.pictureMaxSize + " 张"), !1;
            var i = {url: e.attachment_url, id: e.attachment_id, width: e.width, height: e.height};
            n.push(i), t.model.set("picture", n), t.renderPicture(i)
        },
        initSortable: function () {
            var e = this;
            e.$(".picture-list").sortable({
                items: ".sort", cursor: "move", start: function (e, t) {
                    t.item.data("startPos", t.item.index())
                }, stop: function (n, i) {
                    var s = i.item.data("startPos"), o = i.item.index();
                    if (s !== o) {
                        var a = [];
                        t.each(e.model.get("picture"), function (e, t, n) {
                            a.push(s > o ? t === o ? n[s] : t > o && s >= t ? n[t - 1] : e : t === o ? n[s] : o > t && t >= s ? n[t + 1] : e)
                        }), e.model.set("picture", a)
                    }
                }
            })
        },
        deletePicture: function (e) {
            var t = this, n = $(e.target), i = n.parent("li").index(), s = this.model.get("picture");
            s.splice(i, 1), n.parents("li.sort").first().remove(), t.model.calculateImage()
        },
        checkUrl: function (e) {
            var t = $(e.target);
            e.stopPropagation(), e.stopImmediatePropagation();
            var n = $.trim(t.val());
            n = r.buyUrlValueFix(n), t.val(n)
        },
        autoreadGoods: function (e) {
            var t = this, n = $(e.target);
            s.initialize({
                target: n, content: "请粘贴 淘宝/天猫 的单品地址", callback: function (e) {
                    c.successNotify("正在读取商品，请稍等。", void 0, {fade: !1});
                    var n = $.trim(e);
                    t.grabGoodsData(n)
                }
            })
        },
        grabGoodsData: function (e) {
            var t = this, n = window._global.url.img + "/tao/detail", i = {
                url: encodeURI(e),
                mp_id: window._global.kdt_id
            };
            $.ajax({
                url: n, type: "GET", dataType: "jsonp", timeout: 6e4, cache: !1, data: i, success: function (n) {
                    "success" == n.status ? (t.updateGoodsModel(e, n), c.clearNotify()) : c.errorNotify("抓取商品信息出错啦:(")
                }, error: function () {
                    c.errorNotify("抓取商品信息出错啦:(")
                }
            })
        },
        updateGoodsModel: function (e, n) {
            var i = this, s = {title: n.title, buy_url: e};
            if (0 !== n.price && (s.price = n.price), i.model.set(s), t.isEmpty(n.attachment))return !1;
            var o = [];
            t.each(n.attachment, function (e) {
                o.push({url: e.attachment_url, id: e.attachment_id})
            }), i.model.set({picture: o}), i.model.trigger("picture:reset")
        },
        getData: function () {
            var e = this, t = e.model.toJSON();
            return t
        },
        showSelf: function () {
            var e = this;
            e.$el.show()
        },
        hideSelf: function () {
            var e = this;
            e.$el.hide()
        },
        hideStockModule: function () {
            var e = this, t = e.model.get("shop_method");
            return "0" == t ? !1 : void e.ui.priceTxt.prop("readonly", !1)
        },
        showStockModule: function () {
            var e = this;
            e.ui.priceTxt.prop("readonly", !0)
        },
        onShopMethodChanged: function (e, t) {
            var n = this;
            "0" == t ? (n.ui.buyUrlGroup.removeClass("hide"), n.ui.buyUrlRequired.removeClass("hide"), n.ui.priceTxt.prop("readonly", !1)) : (n.ui.buyUrlGroup.addClass("hide"), n.ui.buyUrlRequired.addClass("hide"), n.resetPrice())
        },
        resetPrice: function () {
            var e = this, t = l.request("stock_module:is_show");
            if (!t)return !1;
            e.ui.priceTxt.prop("readonly", !0);
            var n = l.request("min_price:get");
            e.ui.priceTxt.val(n)
        }
    });
    return u
}), define("models/sku_item", ["require", "backbone"], function (e) {
    var t = e("backbone");
    return t.Model.extend({
        idAttribute: "_id", defaults: {text: "", list: []}, index: function () {
            return this.collection.indexOf(this)
        }
    })
}), define("collections/sku_list", ["require", "underscore", "backbone", "models/sku_item"], function (e) {
    var t = (e("underscore"), e("backbone")), n = e("models/sku_item"), i = t.Collection.extend({
        url: function () {
        }, model: n, checkIsExist: function (e) {
            var t = this, n = t.where({text: e}), i = n.length > 0;
            return i
        }
    });
    return i
}), define("models/sku_atom", ["require", "backbone"], function (e) {
    var t = e("backbone");
    return t.Model.extend({
        idAttribute: "id", defaults: {text: ""}, addSkuLeaf: function (e) {
            return Utils.ajax({
                url: window._global.url.www + "/showcase/WCGoodsSkuTree/skuLeaf.json",
                type: "POST",
                data: e
            })
        }, getSkuLeaf: function (e, t) {
            var n = _.find(window._global.skuTree, function (t) {
                    return t._id === e
                }) || {}, i = _.find(n.list, function (e) {
                return e.text === t
            });
            return i
        }
    })
}), define("collections/sku_atom_list", ["require", "backbone", "core/utils", "models/sku_atom"], function (e) {
    var t = e("backbone"), n = (e("core/utils"), e("models/sku_atom")), i = t.Collection.extend({
        url: function () {
        }, model: n, checkChooseable: function (e) {
            return !this.checkIsExist(e)
        }, checkIsExist: function (e) {
            var t = this.find(function (t) {
                return t.get("id") === e.id
            });
            return !!t
        }
    });
    return i
}), define("text!components/pop/templates/chosen.html", [], function () {
    return '<div class="arrow"></div>\n<div class="popover-inner popover-chosen">\n    <div class="popover-content">\n        <input type="hidden" class="js-select2 select2-offscreen" style="width: 242px;" tabindex="-1">\n        <button type="button" class="btn btn-primary js-btn-confirm" data-loading-text="确定">确定</button>\n        <button type="reset" class="btn js-btn-cancel">取消</button>\n    </div>\n</div>\n'
}), define("components/pop/chosen", ["require", "underscore", "backbone", "components/pop/base", "text!components/pop/templates/chosen.html", "core/utils", "select2"], function (e) {
    var t = e("underscore"), n = (e("backbone"), e("components/pop/base")), i = e("text!components/pop/templates/chosen.html"), s = e("core/utils");
    e("select2");
    return n.extend({
        template: t.template(i),
        className: "popover bottom popover-chosen-wrap",
        events: {"click .js-btn-cancel": "hide", "click .js-btn-confirm": "triggerCallback"},
        initialize: function (e) {
            var t = this;
            n.prototype.initialize.call(t, e), window.NC.on("chosen:hide", function () {
                t.hide()
            }), t.data = e.data
        },
        render: function () {
            var e = this;
            return e.$el.html(e.template({})), e
        },
        reset: function (e) {
            var t = this, n = e.callback, i = e.target, s = e.trigger, o = e.data;
            t.setCallback(n), t.setTarget(i), t.setTrigger(s), t.setData(o), t.positioning(), t.show()
        },
        positioning: function () {
            var e = this;
            e.$el.show().position({
                of: e.target,
                my: "center top+5",
                at: "center bottom",
                collision: "none"
            }), e.initSkuList();
            var t = e.getSelect2Tags();
            e.openSelect2(t)
        },
        getSelect2Tags: function () {
            var e, n = this, i = n._skuList[n.data.id];
            return e = !t.isUndefined(i) && i.length > 0 ? i : []
        },
        initSkuList: function () {
            var e = this;
            e._skuList = {}, t.each(window._global.skuTree, function (n, i) {
                var s = [];
                t.each(n.list, function (e) {
                    s.push({id: e._id, text: e.text})
                }), e._skuList[n._id] = s
            })
        },
        openSelect2: function (e) {
            var t = this;
            t._selectedData = [], t.$(".js-select2").off("select2-selecting change").select2({
                allowClear: !0,
                multiple: !0,
                placeholder: "添加规格值",
                tags: e,
                maximumInputLength: 20
            }).on("select2-selecting", function (e) {
                t.onSelect2Selecting(e)
            }).on("change", function (e) {
                t.onSelect2Change(e)
            }).select2("open")
        },
        onSelect2Selecting: function (e) {
            var n = this, i = e.object, o = $(e.target);
            if (-1 === i.id || t.isString(i.id) && i.id === i.text) {
                var a;
                a = s.isFenxiao() ? window._global.url.fenxiao + "/showcase/WCGoodsSkuTree/skuLeaf.json" : window._global.url.www + "/showcase/WCGoodsSkuTree/skuLeaf.json", $.post(a, {
                    text: i.text,
                    _id: n.data.id
                }, function (e) {
                    if (0 === e.code) {
                        var a = {id: Number(e.data), text: i.text}, l = t.find(window._global.skuTree, function (e) {
                            return e._id === n.data.id
                        });
                        l && (l.list || (l.list = []), l.list.push({
                            _id: a.id,
                            text: a.text
                        })), n._selectedData.push(a), o.select2("data", n._selectedData), o.select2("close")
                    } else s.errorNotify(e.msg || "出错啦。")
                }, "json"), e.preventDefault()
            } else n._selectedData.push(i)
        },
        onSelect2Change: function (e) {
            var n = this;
            if (e.removed) {
                var i = t.find(n._selectedData, function (t) {
                    return t.id === e.removed.id
                });
                n._selectedData.splice(n._selectedData.indexOf(i), 1)
            }
        },
        clearInput: function () {
            var e = this;
            e.txt.val("")
        },
        setData: function (e) {
            var t = this;
            t.data = e
        },
        hide: function () {
            var e = this;
            return e.$(".js-select2").select2("data", "").select2("destroy"), e._selectedData = [], e.$el.hide(), e.$el
        },
        triggerCallback: function () {
            var e = this;
            e.callback(e._selectedData), e.hide()
        }
    })
}), define("components/pop/atom/chosen", ["require", "backbone", "components/pop/chosen"], function (e) {
    var t = (e("backbone"), e("components/pop/chosen"));
    return {
        initialize: function (e) {
            var n = e.target = $(e.target), i = (e.className, e.type, e.callback), s = e.trigger = $(e.trigger || n), o = e.data, a = (e.notAutoHide || !1, e.content || "", e.appendTarget || "body"), l = new t({
                callback: i,
                target: n,
                trigger: s,
                notAutoHide: !0,
                data: o
            });
            return l.render().$el.appendTo(a), l.positioning(), l
        }
    }
}), define("tpl!templates/sku_atom", [], function () {
    return function (obj) {
        var __t, __p = "";
        Array.prototype.join;
        with (obj || {})__p += '<span data-atom-id="' + (null == (__t = id) ? "" : __t) + '">' + (null == (__t = text) ? "" : __t) + '</span>\n<div class="close-modal small js-remove-sku-atom">×</div>\n';
        return __p
    }
}), define("views/sku_atom", ["require", "underscore", "marionette", "core/reqres", "components/popover/rename/app", "tpl!templates/sku_atom"], function (e) {
    var t = e("underscore"), n = e("marionette"), i = (e("core/reqres"), e("components/popover/rename/app"));
    return n.ItemView.extend({
        className: "sku-atom",
        template: e("tpl!templates/sku_atom"),
        events: {"click .js-remove-sku-atom": "removeSkuAtom", dblclick: "renameSkuAtom"},
        modelEvents: {change: "render"},
        initialize: function (e) {
            this.options = e || {}, this.parentModel = this.options.parentModel, this.skuTreeId = this.parentModel.get("id")
        },
        removeSkuAtom: function (e) {
            e.preventDefault(), e.stopPropagation();
            var t = this.model.collection;
            t.remove(this.model)
        },
        renameSkuAtom: function () {
            this.renamePopover = new i({
                of: this.el,
                arrow: "top-center",
                data: {name: this.model.get("text"), max_input_length: 20},
                callback: t.bind(function (e) {
                    if (e !== this.model.get("text")) {
                        var n = this.model.getSkuLeaf(this.skuTreeId, e);
                        n ? (n.id = n._id, this.model.collection.checkChooseable(n) ? this.renameSkuLeaf(n) : Utils.errorNotify("已经添加了相同的规格值。")) : this.model.addSkuLeaf({
                            _id: this.skuTreeId,
                            text: e
                        }).done(t.bind(function (t) {
                            var n = {_id: +t, id: +t, text: e};
                            this.addSkuLeafToGlobalValue(n), this.renameSkuLeaf(n)
                        }, this)).fail(function (e) {
                            Utils.errorNotify(e)
                        })
                    }
                }, this)
            })
        },
        renameSkuLeaf: function (e) {
            var t = this.model.toJSON(), n = e, i = this.skuTreeId, s = this.parentModel.index() + 1;
            this.model.set({
                id: e.id,
                text: e.text
            }, {silent: !0}), this.render(), this.parentModel.collection.trigger("sku:leaf:rename", s, i, t, n)
        },
        addSkuLeafToGlobalValue: function (e) {
            var n = this, i = t.find(window._global.skuTree, function (e) {
                    return e._id === n.skuTreeId
                }) || {};
            i.list || (i.list = []), i.list.push(e)
        },
        onClose: function () {
            this.renamePopover && this.renamePopover.close && this.renamePopover.close()
        }
    })
}), define("tpl!templates/sku_atom_list", [], function () {
    return function (obj) {
        var __p = "";
        Array.prototype.join;
        with (obj || {})__p += '<div class="js-sku-atom-list sku-atom-list"></div>\n<a href="javascript:;" class="js-add-sku-atom add-sku">+添加</a>\n';
        return __p
    }
}), define("views/sku_atom_list", ["require", "underscore", "jquery", "marionette", "components/pop/atom/chosen", "views/sku_atom", "tpl!templates/sku_atom_list"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("marionette"), s = e("components/pop/atom/chosen"), o = e("views/sku_atom");
    return i.CompositeView.extend({
        template: e("tpl!templates/sku_atom_list"),
        itemView: o,
        itemViewContainer: ".js-sku-atom-list",
        itemViewOptions: function () {
            return {parentModel: this.parentModel}
        },
        ui: {addSkuAtom: ".js-add-sku-atom"},
        events: {"click @ui.addSkuAtom": "onAddSkuAtomClick"},
        collectionEvents: {reset: "render"},
        initialize: function (e) {
            this.parentModel = e.parentModel
        },
        onAddSkuAtomClick: function (e) {
            e.preventDefault();
            var i = n(e.target), o = this.parentModel.get("id");
            s.initialize({target: i, data: {id: o}, callback: t.bind(this.onChooseSkuAtom, this)})
        },
        onChooseSkuAtom: function (e) {
            if (t.isEmpty(e))return !1;
            var n = this.collection;
            t.each(e, function (e) {
                return n.checkChooseable(e) ? void n.add(e) : (Utils.errorNotify("已经添加了相同的规格值。"), !1)
            })
        }
    })
}), define("tpl!templates/sku_item", [], function () {
    return function (obj) {
        var __t, __p = "";
        Array.prototype.join;
        with (obj || {})__p += '<h3 class="sku-group-title">\n    <input type="hidden" name="sku_name" value="' + (null == (__t = id) ? "" : __t) + '" class="js-sku-name">\n    <a class="js-remove-sku-group remove-sku-group">&times;</a>\n</h3>\n<div class="js-sku-atom-container sku-group-cont"></div>\n';
        return __p
    }
}), define("views/sku_item", ["require", "underscore", "marionette", "core/event", "core/reqres", "core/utils", "collections/sku_atom_list", "views/sku_atom_list", "tpl!templates/sku_item"], function (e) {
    var t = e("underscore"), n = e("marionette"), i = e("core/event"), s = e("core/reqres"), o = e("core/utils"), a = e("collections/sku_atom_list"), l = e("views/sku_atom_list"), c = n.Layout.extend({
        className: "sku-sub-group",
        template: e("tpl!templates/sku_item"),
        ui: {skuNameEle: ".js-sku-name", skuGroupRemove: ".js-remove-sku-group"},
        regions: {skuAtomRegion: ".js-sku-atom-container"},
        events: {"click @ui.skuGroupRemove": "removeSkuGroup"},
        initialize: function () {
            var e = this;
            this.choosable = {}, this.skuNameList = s.request("sku_name_list:get") || [], this.listenTo(this.model.collection, "sku:leaf:rename", function (t, n, i, s) {
                e.reverseUpdate({silent: !0}), this.model.collection.trigger("stock:sku:leaf:rename", t, n, i, s)
            })
        },
        serializeData: function () {
            var e = {};
            return this.model && (e = this.model.toJSON(), e = this.processData(e)), e
        },
        processData: function (e) {
            return e.id || (e.id = -1), e
        },
        onShow: function () {
            this.initSkuNameSelect2(), this.initSkuAtomListView()
        },
        initSkuNameSelect2: function () {
            var e = this, n = s.request("select2_config:get") || {};
            t(n).extend({data: e.skuNameList}), e.ui.skuNameEle.select2(n).on("select2-opening", function () {
                i.trigger("chosen:hide")
            }).on("select2-selecting", function (t) {
                var n = t.object;
                e.selectSkuName(n, e, t)
            })
        },
        initSkuAtomListView: function () {
            var e = this.model, t = e.get("id");
            if (!t || -1 == t)return !1;
            var n = this.model.get("list") || [];
            this.skuAtomList = new a(n), this.listenTo(this.skuAtomList, "all", this.reverseUpdate), this.skuAtomListView = new l({
                parentModel: this.model,
                collection: this.skuAtomList
            }), this.skuAtomRegion.show(this.skuAtomListView)
        },
        reverseUpdate: function (e) {
            var t = this.skuAtomList.toJSON();
            this.model.set({list: t}, e), this.model.collection.trigger("item:list:change")
        },
        selectSkuName: function (e, t, n) {
            var i = this.model.collection;
            return i.checkIsExist(e.text) ? (o.errorNotify("规格名不能相同。"), n.preventDefault(), n.stopPropagation(), !1) : (this.model.set("id", e.id), void(-1 == e.id ? this.createSkuName(e) : this.updateAtomListView(e)))
        },
        createSkuName: function (e) {
            var t = this, n = window._global.url.www + "/showcase/WCGoodsSkuTree/skuTree.json", i = {text: e.text};
            $.ajax({
                url: n, type: "POST", dataType: "json", timeout: 8e3, cache: !1, data: i, success: function (e) {
                    0 === e.code ? t.onCreateSkuNameSuccess(e.data, i) : o.errorNotify(e.msg || "新增规格类型失败。")
                }, error: function (e, t, n) {
                }, complete: function (e, t) {
                }
            })
        },
        onCreateSkuNameSuccess: function (e, t) {
            var n = this, i = {id: Number(e), text: t.text};
            n.model.set(i), n.ui.skuNameEle.select2("data", i), n.ui.skuNameEle.select2("close"), window._global.skuTree.push({
                _id: i.id,
                text: i.text
            }), n.updateAtomListView(t)
        },
        updateAtomListView: function (e) {
            var t = this;
            t.skuAtomListView || t.initSkuAtomListView(), t.resetAtomListData(e)
        },
        processChoosable: function (e) {
            var n = {data: [], count: 0};
            return !e || t.isEmpty(e.option) ? n : (t(e.option).each(function (e) {
                -1 === e.option_value.indexOf("自定义") ? n.data.push(e) : n.count += 1
            }), n)
        },
        resetAtomListData: function (e) {
            t(e).extend({list: []}), this.model.set(e), this.skuAtomList.reset([])
        },
        removeSkuGroup: function (e) {
            e.preventDefault(), e.stopPropagation();
            var t = this.model.collection;
            t.remove(this.model)
        }
    });
    return c
}), define("tpl!templates/sku", [], function () {
    return function (obj) {
        var __p = "";
        Array.prototype.join;
        with (obj || {})__p += '<div class="js-sku-list-container"></div>\n<div class="js-sku-group-opts sku-sub-group">\n    <h3 class="sku-group-title">\n        <button type="button" class="js-add-sku-group btn">添加规格项目</button>\n    </h3>\n</div>\n';
        return __p
    }
}), define("views/sku", ["require", "underscore", "jquery", "marionette", "core/event", "core/reqres", "commons/utils", "models/sku_item", "views/sku_item", "tpl!templates/sku"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("marionette"), s = (e("core/event"), e("core/reqres")), o = e("commons/utils"), a = e("models/sku_item"), l = e("views/sku_item");
    return i.CompositeView.extend({
        className: "sku-group",
        template: e("tpl!templates/sku"),
        itemView: l,
        itemViewContainer: ".js-sku-list-container",
        ui: {skuGroupOpts: ".js-sku-group-opts", skuGroupAdd: ".js-add-sku-group"},
        events: {"click @ui.skuGroupAdd": "addSkuGroup"},
        collectionEvents: {"add remove": "checkAndReverseUpdate"},
        maxSize: 3,
        initialize: function (e) {
            this.goodsModel = e.goodsModel, this.initSkuName(), this.listenTo(this.collection, "item:list:change", this.reverseUpdate)
        },
        onRender: function () {
            this.toggleSkuGroupOpts()
        },
        initSkuName: function () {
            this.initSelect2Config(), this.initSkuNameList()
        },
        initSelect2Config: function () {
            var e = {
                multiple: !1, placeholder: "请选择...", createSearchChoice: function (e, t) {
                    return 0 === n(t).filter(function () {
                        return 0 === this.text.localeCompare(e)
                    }).length ? {id: -1, text: e} : void 0
                }, maximumInputLength: 4, width: 100
            };
            s.setHandler("select2_config:get", function () {
                return e
            })
        },
        initSkuNameList: function () {
            var e = this;
            e.skuNameList = [];
            var n = window._global.skuTree;
            t.each(n, function (t) {
                e.skuNameList.push({id: t._id, text: t.text || t.name})
            }), s.setHandler("sku_name_list:get", function () {
                return e.skuNameList
            })
        },
        addSkuGroup: function () {
            var e = new a;
            this.collection.add(e)
        },
        onAfterItemAdded: function (e) {
            e.ui.skuNameEle.select2("open")
        },
        checkMaxSize: function () {
            var e = this.collection.size();
            return e < this.maxSize
        },
        toggleSkuGroupOpts: function () {
            this.checkMaxSize() ? this.ui.skuGroupOpts.show() : this.ui.skuGroupOpts.hide()
        },
        checkAndReverseUpdate: function () {
            this.toggleSkuGroupOpts(), this.reverseUpdate()
        },
        reverseUpdate: function () {
            var e = this.goodsModel, n = this.collection.toJSON();
            t(n).each(function (t, n) {
                if (!t.text)return !1;
                var i = n + 1, s = "sku_name_" + i, o = s + "_value", a = {id: t.id, text: t.text};
                e.set(s, a, {silent: !0}), e.set(o, t.list, {silent: !0})
            }), this.removeUnnecessaryKeys(n)
        },
        removeUnnecessaryKeys: function (e) {
            o.removeSkuKeyValue(this.goodsModel, e.length)
        }
    })
}), define("text!templates/stock.html", [], function () {
    return ""
}), define("text!templates/thead.html", [], function () {
    return '<thead>\n    <tr>\n        <% _.each(thead, function(item, index) {\n            if(item.list && item.list.length > 0) { %>\n            <th class="text-center"><%=item.text %></th>\n        <% }}); %>\n        <th class="th-price">价格（元）</th>\n        <% if(is_fx) { %>\n            <th class="th-profit">利润（元）</th>\n            <th class="th-stock">库存</th>\n            <th class="text-center">是否销售</th>\n        <% } else { %>\n            <th class="th-stock">库存</th>\n            <th class="th-code">商家编码</th>\n        <% } %>\n        <th class="text-right">销量</th>\n    </tr>\n</thead>\n'
}), define("text!templates/tfoot.html", [], function () {
    return '<tfoot>\n    <tr>\n        <td colspan="<%=columns %>">\n            <div class="batch-opts">\n                批量设置：\n                <span class="js-batch-type">\n                    <a class="js-batch-price" href="javascript:;">价格</a>\n                    <% if(!is_fx) { %>\n                    &nbsp;&nbsp;\n                    <a class="js-batch-stock" href="javascript:;">库存</a>\n                    <% } %>\n                </span>\n                <span class="js-batch-form" style="display: none;">\n                    <input type="text" class="js-batch-txt input-mini" placeholder="" />\n                    <a class="js-batch-save" href="javascript:;">保存</a>\n                    <a class="js-batch-cancel" href="javascript:;">取消</a>\n                    <p class="help-desc"></p>\n                </span>\n            </div>\n        </td>\n    </tr>\n</tfoot>\n'
}), define("text!templates/td.html", [], function () {
    return '<td>\n    <input data-stock-id="<%= id %>" type="text" name="sku_price" class="js-price input-mini" value="<%=price %>" maxlength="10"<% if(!can_sell) { %> disabled<% } %>/>\n</td>\n<% if(is_fx) { %>\n    <td class="js-atom-profit"><%=profit %></td>\n    <td><%=stock_num %></td>\n    <td class="text-center">\n        <% if(can_sell) { %>\n            <input class="js-is-sell" type="checkbox" name="is_sell" <% if(is_sell == \'1\') { %>checked<% } %> value="1" />\n        <% } else { %>\n            <input disabled class="js-is-sell" type="checkbox" name="is_sell" />\n        <% } %>\n    </td>\n<% } else { %>\n    <td><input type="text" name="stock_num" class="js-stock-num input-mini" value="<%=stock_num %>" maxlength="9" /></td>\n    <td><input type="text" name="code" class="js-code input-small" value="<%=code %>" /></td>\n<% } %>\n<td class="text-right"><%=sold_num || 0 %></td>\n'
}), define("views/stock", ["require", "underscore", "backbone", "marionette", "core/event", "core/reqres", "commons/utils", "core/utils", "text!templates/stock.html", "text!templates/thead.html", "text!templates/tfoot.html", "text!templates/td.html"], function (e) {
    var t = e("underscore"), n = e("backbone"), i = e("marionette"), s = e("core/event"), o = e("core/reqres"), a = e("commons/utils"), l = e("core/utils"), c = e("text!templates/stock.html"), r = e("text!templates/thead.html"), d = e("text!templates/tfoot.html"), p = e("text!templates/td.html"), u = i.Layout.extend({
        tagName: "table",
        className: "table-sku-stock",
        template: t.template(c),
        theadTemplate: t.template(r),
        tfootTemplate: t.template(d),
        tdTemplate: t.template(p),
        ui: {
            batchPrice: ".js-batch-price",
            batchStock: ".js-batch-stock",
            batchType: ".js-batch-type",
            batchForm: ".js-batch-form",
            batchTxt: ".js-batch-txt",
            batchSave: ".js-batch-save",
            batchCancel: ".js-batch-cancel"
        },
        events: {
            "blur .js-price": "onAtomPriceBlur",
            "input .js-price": "onAtomPriceInput",
            "change .js-is-sell": "onAtomIsSellChange",
            "blur .js-stock-num": "onAtomStockBlur",
            "input .js-stock-num": "onAtomStockInput",
            "input .js-code": "reverseUpdateStock",
            "click @ui.batchPrice": "onBatchPriceClick",
            "click @ui.batchStock": "onBatchStockClick",
            "click @ui.batchSave": "onBatchSaveClick",
            "click @ui.batchCancel": "onBatchCancelClick"
        },
        initialize: function (e) {
            var t = this;
            t.skuList = e.skuList, t.isFx = "10" == t.model.get("goods_type"), t.stockBackup = t.model.get("stock"), t._modelBinder = new n.ModelBinder, t.setupStockResp(), t.setupPriceResp(), t.setupValidateResp(), t.listenTo(t.skuList, "add", t.rebuildStockData), t.listenTo(t.skuList, "remove", t.rebuildStockData), t.listenTo(t.skuList, "change", t.updateStockData), t.listenTo(t.skuList, "stock:sku:leaf:rename", t.handleSkuLeafRename)
        },
        onRender: function () {
            this.showStockView()
        },
        setupValidateResp: function () {
            var e = this;
            e.errorLen = 0, o.setHandler("stock:validate", function () {
                var t = e.model.get("shop_method");
                return "0" == t ? e.resetValidate() : e.validateStockData(), e.errorLen
            })
        },
        setupStockResp: function () {
            var e = this;
            e.isStockModulShow = !1, o.setHandler("stock_module:is_show", function () {
                return e.isStockModulShow
            })
        },
        setupPriceResp: function () {
            var e = this;
            e.minPrice = .01, o.setHandler("min_price:get", function () {
                return e.minPrice
            })
        },
        rebuildStockData: function () {
            var e = this, t = e.generateStockData();
            e.stockBackup = t, e.model.set({stock: t}, {silent: !0}), e.showStockView()
        },
        updateStockData: function () {
            var e = this, t = e.generateStockData();
            t = e.recoverBackup(t), e.model.set({stock: t}, {silent: !0}), e.showStockView()
        },
        handleSkuLeafRename: function (e, n, i, s) {
            var o = this.model.get("stock"), a = "k" + e + "_id", l = "v" + e + "_id", c = "v" + e, r = t.filter(o, function (e) {
                return e[a] === n && e[l] === i.id
            });
            t.each(r, function (e) {
                e.id = "", e[l] = s.id, e[c] = s.text
            }), this.showStockView()
        },
        generateStockData: function () {
            var e = this, n = [], i = e.skuList.toJSON();
            return t(i).each(function (i, s) {
                n = t.isEmpty(n) ? e.initSkuData(i, s) : e.appendSkuInfo(n, i, s)
            }), n
        },
        recoverBackup: function (e) {
            var n = this;
            return t(e).each(function (t, i) {
                var s = n.findStockInBackup(t);
                s && (s.id && (e[i].id = s.id), e[i].stock_num = s.stock_num, e[i].price = s.price, e[i].code = s.code, e[i].sold_num = s.sold_num, e[i].is_sell = s.is_sell)
            }), e
        },
        findStockInBackup: function (e) {
            for (var t, n = this, i = n.getFilterKeys(e), s = 0, o = n.stockBackup.length; o > s; s++) {
                var a = n.stockBackup[s], l = n.getFilterKeys(a);
                if (i === l) {
                    t = a;
                    break
                }
            }
            return t
        },
        getFilterKeys: function (e) {
            e = e || {};
            for (var t = {}, n = 1; 5 >= n; n++) {
                var i = "v" + n + "_id";
                t[i] = e[i]
            }
            var s = JSON.stringify(t);
            return s
        },
        updateStockBackup: function (e) {
            var t = this;
            t.stockBackup = e
        },
        initSkuData: function (e, n) {
            var i = [], s = {};
            return t(e.list).each(function (t) {
                var o = {id: 0, price: "", stock_num: "", sold_num: "", code: "", is_sell: 0}, a = n + 1;
                o["k" + a + "_id"] = e.id, o["k" + a] = e.text, o["v" + a + "_id"] = t.id, o["v" + a] = t.text;
                var l = "v" + a + "_id";
                s[l] = t.id, i.push(o)
            }), i
        },
        appendSkuInfo: function (e, n, i) {
            if (t.isEmpty(n.list))return e;
            var s = [], o = {};
            return t(e).each(function (e) {
                t(n.list).each(function (a) {
                    var l = {};
                    t(e).each(function (e, t) {
                        l[t] = e
                    });
                    var c = i + 1;
                    l["k" + c + "_id"] = n.id, l["k" + c] = n.text, l["v" + c + "_id"] = a.id, l["v" + c] = a.text;
                    var r = "v" + c + "_id";
                    o[r] = a.id, s.push(l)
                })
            }), s
        },
        showStockView: function () {
            var e = this, n = e.skuList;
            return 0 === n.size() ? (e.isStockModulShow = !1, s.trigger("stock_module:hide"), !1) : (e.skuData = e.generateSkuData(), t(e.skuData).isEmpty() ? (e.isStockModulShow = !1, s.trigger("stock_module:hide"), !1) : (e.renderTable(), void e.bindUIElements()))
        },
        renderTable: function () {
            var e = this, t = "";
            t += e.renderHeader(), t += e.renderBody(), t += e.renderFooter(), e.$el.html(t), s.trigger("stock_module:show"), e.isStockModulShow = !0
        },
        renderHeader: function () {
            var e = this, t = {thead: e.skuList.toJSON(), is_fx: e.isFx}, n = e.theadTemplate(t);
            return n
        },
        renderBody: function () {
            var e = this, n = e.skuData;
            if (t.isEmpty(n))return !1;
            e.combine = e.calcCombine(n);
            var i = e.generateRows();
            return i
        },
        renderFooter: function () {
            var e = this, t = e.skuList.size();
            t = e.isFx ? t + 5 : t + 4;
            var n = e.tfootTemplate({columns: t, is_fx: e.isFx});
            return n
        },
        generateRows: function () {
            var e = this;
            return e.TableHtml = "<tbody>", e.outputTrTag = !1, e.trIndex = 0, e.printRow(0, e.outputTrTag), e.TableHtml += "</tbody>", e.TableHtml
        },
        generateSkuData: function () {
            var e = this, t = [];
            return e.skuList.each(function (e) {
                var n = e.get("list");
                n && n.length > 0 && t.push(n)
            }), t
        },
        calcCombine: function (e) {
            for (var t = [], n = e.length, i = 0; n > i; i++) {
                t[i] = 1;
                for (var s = i + 1; n > s; s++)t[i] = t[i] * e[s].length
            }
            return t
        },
        printRow: function (e, n) {
            var i = this, s = i.skuData, l = s.length;
            if (e === l)return !1;
            var c = s[e];
            t(c).each(function (t) {
                var s = i.getAtomStockData(i.trIndex), c = o.request("price_range:get", s.id), r = !!c;
                if (r) {
                    n || (i.TableHtml += "<tr>", n = !0);
                    var d = '<td data-atom-id="' + t.id + '" rowspan="' + i.combine[e] + '">' + t.text + "</td>";
                    i.TableHtml += d, e === l - 1 && (s.can_sell = r, s.is_fx = i.isFx, i.isFx && (s.profit = a.calcProfit(s.price, c)), i.TableHtml += i.tdTemplate(s) + "</tr>", i.trIndex += 1, n = !1);
                    var p = e + 1;
                    i.printRow(p, n)
                }
            })
        },
        getAtomStockData: function (e) {
            var t = this, n = t.model.get("stock"), i = n[e];
            return i = i || {
                    id: 0,
                    price: "",
                    stock_num: "",
                    sold_num: 0,
                    code: "",
                    is_sell: 0
                }, i.price && (i.price = parseFloat(i.price, 10).toFixed(2)), i
        },
        reverseUpdateStock: function (e) {
            var t = this, n = $(e.target), i = n.attr("name");
            i = "sku_price" === i ? "price" : i;
            var s = n.attr("type"), o = "checkbox" == s ? +n.is(":checked") : $.trim(n.val()), a = t.$("tr"), l = a.index(n.parents("tr")) - 1, c = t.model.get("stock");
            c[l] || (c = t.generateStockData(t.skuList)), c[l][i] = o, t.updateStockBackup(c), t.model.set({stock: c}, {silent: !0})
        },
        onAtomPriceBlur: function (e) {
            var t = this, n = $(e.target), i = Number(n.val());
            n.val(i.toFixed(2, 10)), t.validAtomInput(n, "price"), t.isFx && t.updateProfit(n, i)
        },
        updateProfit: function (e, t) {
            var n = e.data("stock-id"), i = e.parents("tr").find(".js-atom-profit"), s = o.request("price_range:get", n) || {}, l = a.calcProfit(t, s);
            i.text(l)
        },
        onAtomStockBlur: function (e) {
            var t = this, n = $(e.target);
            t.validAtomInput(n, "stock")
        },
        validAtomInput: function (e, t) {
            var n, i = this, s = e.val(), o = e.parents("td"), a = o.find(".error-message");
            "price" === t ? e.prop("disabled") || (n = i.validatePrice(s, e)) : n = i.validateStockNumber(s), n ? (0 === a.length ? (a = $('<div class="error-message"></div>'), o.append(a.html(n))) : a.html(n), o.addClass("manual-valid-error"), i.errorLen += 1) : (a.remove(), o.removeClass("manual-valid-error", function () {
                i.errorLen -= 1
            }))
        },
        validAllPrice: function () {
            var e = this;
            e.$(".js-price").each(function (t, n) {
                var i = $(n);
                e.validAtomInput(i, "price")
            })
        },
        validAllStock: function () {
            var e = this;
            e.$(".js-stock-num").each(function (t, n) {
                var i = $(n);
                e.validAtomInput(i, "stock")
            })
        },
        validatePrice: function (e, t) {
            if (!e)return "价格不能为空";
            var n = Number(e);
            if (isNaN(n))return "请输入一个数字";
            var i = {min: .01, max: 9999999};
            return t && (i = o.request("price_range:get", t.data("stock-id")) || i), n < i.min ? "价格最小为 " + i.min : n > i.max ? "价格最大为 " + i.max : n > 9999999 ? "价格最大不能超过 9999999" : !1
        },
        validateStockNumber: function (e) {
            if (!e)return "库存不能为空";
            var t = Number(e);
            return isNaN(t) ? "请输入一个数字" : 0 > t ? "库存不能为负数" : t > 999999999 ? "库存最大不能超过 999999999" : !1
        },
        resetValidate: function () {
            var e = this;
            e.$(".manual-valid-error").removeClass("manual-valid-error"), e.$(".error-message").hide(), e.errorLen = 0
        },
        validateStockData: function () {
            var e = this;
            e.errorLen = 0, e.isStockModulShow && (e.validAllPrice(), e.validAllStock())
        },
        onAtomPriceInput: function (e) {
            var t = this;
            t.updatePrice(), t.reverseUpdateStock(e)
        },
        onAtomIsSellChange: function (e) {
            var t = this;
            t.reverseUpdateStock(e)
        },
        onAtomStockInput: function (e) {
            var t = this;
            t.updateTotalStock(), t.reverseUpdateStock(e)
        },
        calcPrice: function () {
            var e = this, n = [], i = e.$(".js-price");
            i.each(function (e, i) {
                var s = $.trim($(i).val());
                if (t.isEmpty(s))return !1;
                var o = Number(s);
                return isNaN(o) ? !1 : void n.push(o)
            });
            var s = t.isEmpty(n) ? 0 : t.min(n);
            return s
        },
        updatePrice: function () {
            var e = this, t = e.calcPrice();
            t = l.twoDecimal(t), e.minPrice = t, e.model.set({price: t})
        },
        calcTotalStock: function () {
            var e = this, t = 0, n = e.$(".js-stock-num");
            return n.each(function (e, n) {
                var i = Number($(n).val());
                t += i
            }), t
        },
        updateTotalStock: function () {
            var e = this, t = e.calcTotalStock();
            e.model.set({total_stock: t})
        },
        onBatchPriceClick: function (e) {
            var t = this;
            e.preventDefault(), t.showBatchForm("price")
        },
        hideBatchType: function () {
        },
        onBatchStockClick: function (e) {
            var t = this;
            e.preventDefault(), t.showBatchForm("stock_num")
        },
        onBatchSaveClick: function (e) {
            var t = this;
            e.preventDefault(), t.executeBatch(), t.hideBatchForm()
        },
        onBatchCancelClick: function (e) {
            var t = this;
            e.preventDefault(), t.hideBatchForm()
        },
        showBatchForm: function (e) {
            var t = this;
            t.batchType = e, t.ui.batchTxt.attr("price" === e ? {maxlength: 10, placeholder: "请输入价格"} : {
                maxlength: 9,
                placeholder: "请输入库存"
            }), t.ui.batchType.hide(), t.ui.batchForm.show()
        },
        hideBatchForm: function () {
            var e = this;
            e.ui.batchType.show(), e.ui.batchForm.hide()
        },
        executeBatch: function () {
            var e = this, t = e.ui.batchTxt.val(), n = e.batchType;
            if ("price" === n) {
                if (e.validatePrice(t))return l.errorNotify("请输入一个正确的价格。"), !1;
                t = Number(t).toFixed(2, 10) + "", e.$(".js-price").val(t).trigger("blur"), e.updatePrice()
            } else {
                if (e.validateStockNumber(t))return l.errorNotify("请输入一个正确的库存值。"), !1;
                e.$(".js-stock-num").val(t).trigger("blur"), e.updateTotalStock()
            }
            e.batchUpdateStockData(n, t), e.ui.batchTxt.val("")
        },
        batchUpdateStockData: function (e, n) {
            var i = this, s = i.model.get("stock");
            t(s).each(function (t) {
                t[e] = n
            }), i.model.set("stock", s, {silent: !0})
        },
        showSelf: function () {
            var e = this;
            e.$el.show()
        },
        hideSelf: function () {
            var e = this;
            e.$el.hide()
        }
    });
    return u
}), define("tpl!templates/sku_stock_info", [], function () {
    return function (obj) {
        var __t, __p = "";
        Array.prototype.join;
        with (obj || {})__p += '<div class="info-group-title vbox">\n    <div class="group-inner">库存/规格</div>\n</div>\n<div class="info-group-cont vbox">\n    <div class="group-inner">\n        ', "10" != goods_type && (__p += '\n        <div class="js-goods-sku control-group">\n            <label class="control-label">商品规格：</label>\n            <div id="sku-region" class="controls"></div>\n        </div>\n        '), __p += '\n        \n        <div class="js-goods-stock control-group">\n            <label class="control-label">商品库存：</label>\n            <div id="stock-region" class="controls sku-stock">\n            </div>\n        </div>\n        \n        <div class="control-group">\n            <label class="control-label"><em class="required">*</em>总库存：</label>\n            <div class="controls">\n                <input type="text" maxlength="9" class="input-small" name="total_stock" value="' + (null == (__t = total_stock) ? "" : __t) + '" />\n                <label class="checkbox inline">\n                    <input ', "10" == goods_type && (__p += "disabled"), __p += ' type="checkbox" name="hide_stock" value="' + (null == (__t = hide_stock) ? "" : __t) + '" ', "1" == hide_stock && (__p += " checked"), __p += '>页面不显示商品库存\n                </label>\n                <p class="help-desc">总库存为 0 时，会上架到『已售罄的商品』列表里</p>\n            </div>\n        </div>\n        <div class="control-group">\n            <label class="control-label">商家编码：</label>\n            <div class="controls">\n                <input type="text" class="input-small" name="goods_no" value="' + (null == (__t = goods_no) ? "" : __t) + '" />\n                <a style="display: none;" href="javascript:;" class="js-help-notes circle-help">?</a>\n            </div>\n        </div>\n    </div>\n</div>\n';
        return __p
    }
}),define("views/sku_stock_info", ["require", "backbone", "marionette", "core/event", "commons/utils", "collections/sku_list", "views/sku", "views/stock", "tpl!templates/sku_stock_info"], function (e) {
    var t = e("backbone"), n = e("marionette"), i = e("core/event"), s = e("commons/utils"), o = e("collections/sku_list"), a = e("views/sku"), l = e("views/stock");
    return n.Layout.extend({
        className: "goods-info-group-inner",
        template: e("tpl!templates/sku_stock_info"),
        ui: {goodsSkuBlock: ".js-goods-sku", goodsStockBlock: ".js-goods-stock", totalStockTxt: '[name="total_stock"]'},
        events: {},
        regions: {skuRegion: "#sku-region", stockRegion: "#stock-region"},
        _modelBinder: void 0,
        initialize: function () {
            this.isFx = 10 === +this.model.get("goods_type"), this._modelBinder = new t.ModelBinder, this.listenTo(this.model, "change", s.showLog), this.listenTo(this.model, "change:shop_method", this.onShopMethodChanged), this.listenTo(i, "sku_module:show", this.showSkuModule), this.listenTo(i, "sku_module:hide", this.hideSkuModule), this.listenTo(i, "stock_module:show", this.showStockModule), this.listenTo(i, "stock_module:hide", this.hideStockModule), this.listenTo(i, "sku_stock:update", this.updateSkuStock)
        },
        onClose: function () {
            this._modelBinder.unbind()
        },
        onRender: function () {
            var e = +this.model.get("shop_method");
            0 === e && this.hideSelf()
        },
        onShow: function () {
            this.initDataBindings(), this.initSkuView(), this.initStockView()
        },
        initDataBindings: function () {
            var e = {
                total_stock: '[name="total_stock"]',
                hide_stock: {selector: '[name="hide_stock"]', converter: s.booleanConverter},
                goods_no: '[name="goods_no"]'
            };
            this._modelBinder.bind(this.model, this.el, e)
        },
        initSkuView: function () {
            var e = this.getSkuData() || [], t = this.skuList = new o(e);
            this.skuRegion.show(new a({collection: t, goodsModel: this.model}))
        },
        getSkuData: function () {
            for (var e = "sku_name_", t = [], n = this.model.toJSON(), i = 1; 6 > i; i++) {
                var s = e + i, o = s + "_value", a = n[s], l = n[o] || [];
                a && t.push({id: a.id, text: a.text, list: l})
            }
            return t
        },
        initStockView: function () {
            this.stockRegion.show(new l({model: this.model, skuList: this.skuList}))
        },
        updateSkuStock: function () {
            if (!this.skuList)return !1;
            var e = this.getSkuData() || [];
            this.skuList.reset(e), this.model.set("stock", [])
        },
        onShopMethodChanged: function (e, t) {
            0 === +t ? this.hideSelf() : this.showSelf()
        },
        showSelf: function () {
            this.$el.show()
        },
        hideSelf: function () {
            this.$el.hide()
        },
        showSkuModule: function () {
            this.ui.goodsSkuBlock.show()
        },
        hideSkuModule: function () {
            this.ui.goodsSkuBlock.hide()
        },
        showStockModule: function () {
            this.ui.goodsStockBlock.show(), this.ui.totalStockTxt.prop("readonly", !0)
        },
        hideStockModule: function () {
            this.ui.goodsStockBlock.hide(), this.isFx ? this.ui.totalStockTxt.prop("readonly", !0) : this.ui.totalStockTxt.prop("readonly", !1)
        }
    })
}),define("components/paipai_region/region_data", ["require"], function (e) {
    function t() {
        return window._regionMap || (window._regionMap = {
            0: ["北京", 0, {
                4e4: ["北京市", 1, {
                    40004: ["延庆县"],
                    40005: ["密云县"],
                    40008: ["通州区"],
                    41e3: ["东城区"],
                    41001: ["西城区"],
                    41004: ["朝阳区"],
                    41005: ["丰台区"],
                    41006: ["石景山区"],
                    41007: ["海淀区"],
                    41008: ["门头沟区"],
                    41009: ["房山区"],
                    41010: ["顺义区"],
                    41011: ["昌平区"],
                    41012: ["大兴区"],
                    41013: ["怀柔区"],
                    41014: ["平谷区"]
                }]
            }],
            1: ["天津", 0, {
                100: ["天津市", 1, {
                    101: ["宝坻区"],
                    102: ["静海县"],
                    103: ["武清区"],
                    104: ["宁河县"],
                    105: ["蓟县"],
                    41015: ["和平区"],
                    41016: ["河东区"],
                    41017: ["河西区"],
                    41018: ["南开区"],
                    41019: ["河北区"],
                    41020: ["红桥区"],
                    41024: ["东丽区"],
                    41025: ["西青区"],
                    41026: ["津南区"],
                    41027: ["北辰区"],
                    42296: ["滨海新区"]
                }]
            }],
            2: ["上海", 0, {
                200: ["上海市", 1, {
                    203: ["青浦区"],
                    204: ["嘉定区"],
                    205: ["宝山区"],
                    206: ["奉贤区"],
                    208: ["松江区"],
                    210: ["金山区"],
                    41294: ["黄浦区"],
                    41296: ["徐汇区"],
                    41297: ["长宁区"],
                    41298: ["静安区"],
                    41299: ["普陀区"],
                    41300: ["闸北区"],
                    41301: ["虹口区"],
                    41302: ["杨浦区"],
                    41303: ["闵行区"],
                    41304: ["浦东新区"],
                    41305: ["崇明县"]
                }]
            }],
            3: ["重庆", 0, {
                300: ["重庆市", 1, {
                    2101: ["涪陵区"],
                    2102: ["北碚区"],
                    2103: ["江北区"],
                    2107: ["永川市"],
                    2131: ["綦江区"],
                    2132: ["长寿区"],
                    2136: ["江津市"],
                    2137: ["合川区"],
                    2138: ["潼南县"],
                    2139: ["铜梁县"],
                    2141: ["荣昌县"],
                    2142: ["大足县"],
                    41788: ["万州区"],
                    41789: ["渝中区"],
                    41790: ["大渡口区"],
                    41791: ["沙坪坝区"],
                    41792: ["九龙坡区"],
                    41793: ["南岸区"],
                    41795: ["渝北区"],
                    41796: ["巴南区"],
                    41797: ["黔江区"],
                    41798: ["璧山县"],
                    41799: ["梁平县"],
                    41800: ["城口县"],
                    41801: ["丰都县"],
                    41802: ["垫江县"],
                    41803: ["武隆县"],
                    41804: ["忠县"],
                    41805: ["开县"],
                    41806: ["云阳县"],
                    41807: ["奉节县"],
                    41808: ["巫山县"],
                    41809: ["巫溪县"],
                    41810: ["石柱土家族自治县"],
                    41811: ["秀山土家族苗族自治县"],
                    41812: ["酉阳土家族苗族自治县"],
                    41813: ["彭水苗族土家族自治县"],
                    41814: ["南川市"]
                }]
            }],
            4: ["河北", 0, {
                400: ["石家庄市", 0, {
                    444: ["藁城市"],
                    445: ["栾城县"],
                    446: ["正定县"],
                    448: ["井陉县"],
                    4131: ["元氏县"],
                    4132: ["新乐市"],
                    4133: ["无极县"],
                    4134: ["深泽县"],
                    4135: ["辛集市"],
                    4137: ["赵县"],
                    4138: ["赞皇县"],
                    4139: ["高邑县"],
                    4140: ["平山县"],
                    4141: ["灵寿县"],
                    4142: ["行唐县"],
                    41028: ["长安区"],
                    41029: ["桥东区"],
                    41030: ["桥西区"],
                    41031: ["新华区"],
                    41032: ["井陉矿区"],
                    41033: ["裕华区"],
                    41034: ["晋州市"],
                    41035: ["鹿泉市"]
                }],
                401: ["邯郸市", 0, {
                    402: ["武安市"],
                    403: ["临漳县"],
                    404: ["磁县"],
                    405: ["涉县"],
                    406: ["成安县"],
                    407: ["永年县"],
                    408: ["鸡泽县"],
                    409: ["曲周县"],
                    411: ["馆陶县"],
                    412: ["大名县"],
                    413: ["魏县"],
                    414: ["广平县"],
                    415: ["肥乡县"],
                    41041: ["邯山区"],
                    41042: ["丛台区"],
                    41043: ["复兴区"],
                    41044: ["峰峰矿区"],
                    41045: ["邯郸县"],
                    41046: ["邱县"]
                }],
                459: ["保定市", 0, {
                    417: ["容城县"],
                    418: ["易县"],
                    419: ["涞源县"],
                    420: ["博野县"],
                    421: ["安国市"],
                    422: ["定州市"],
                    423: ["曲阳县"],
                    424: ["唐县"],
                    425: ["阜平县"],
                    449: ["徐水县"],
                    451: ["雄县"],
                    452: ["安新县"],
                    453: ["高阳县"],
                    454: ["蠡县"],
                    455: ["望都县"],
                    456: ["顺平县"],
                    457: ["满城县"],
                    458: ["清苑县"],
                    4143: ["涞水县"],
                    4144: ["定兴县"],
                    4145: ["涿州市"],
                    41050: ["新市区"],
                    41051: ["北市区"],
                    41052: ["南市区"],
                    41053: ["高碑店市"]
                }],
                461: ["张家口市", 0, {
                    442: ["尚义县"],
                    443: ["康保县"],
                    460: ["宣化县"],
                    462: ["怀安县"],
                    463: ["万全县"],
                    464: ["张北县"],
                    465: ["崇礼县"],
                    466: ["赤城县"],
                    467: ["怀来县"],
                    468: ["涿鹿县"],
                    469: ["蔚县"],
                    470: ["阳原县"],
                    41054: ["桥东区"],
                    41055: ["桥西区"],
                    41056: ["宣化区"],
                    41057: ["下花园区"],
                    41058: ["沽源县"]
                }],
                472: ["承德市", 0, {
                    471: ["兴隆县"],
                    473: ["承德县"],
                    474: ["隆化县"],
                    475: ["围场满族蒙古族自治县"],
                    476: ["平泉县"],
                    477: ["宽城满族自治县"],
                    478: ["丰宁满族自治县"],
                    479: ["滦平县"],
                    41059: ["双桥区"],
                    41060: ["双滦区"],
                    41061: ["鹰手营子矿区"]
                }],
                490: ["唐山市", 0, {
                    480: ["滦南县"],
                    481: ["丰南区"],
                    482: ["唐海县"],
                    483: ["遵化市"],
                    484: ["滦县"],
                    485: ["乐亭县"],
                    486: ["丰润区"],
                    487: ["玉田县"],
                    488: ["迁西县"],
                    489: ["迁安市"],
                    2203: ["路南区"],
                    41036: ["路北区"],
                    41037: ["古冶区"],
                    41038: ["开平区"]
                }],
                491: ["廊坊市", 0, {
                    492: ["永清县"],
                    493: ["霸州市"],
                    494: ["大城县"],
                    495: ["文安县"],
                    496: ["固安县"],
                    497: ["香河县"],
                    498: ["大厂回族自治县"],
                    499: ["三河市"],
                    41065: ["安次区"],
                    41066: ["广阳区"]
                }],
                4108: ["沧州市", 0, {
                    4100: ["黄骅市"],
                    4101: ["海兴县"],
                    4102: ["盐山县"],
                    4103: ["孟村回族自治县"],
                    4104: ["南皮县"],
                    4105: ["东光县"],
                    4106: ["吴桥县"],
                    4107: ["泊头市"],
                    4109: ["青县"],
                    4110: ["河间市"],
                    4111: ["肃宁县"],
                    4112: ["任丘市"],
                    4113: ["献县"],
                    41062: ["新华区"],
                    41063: ["运河区"],
                    41064: ["沧县"]
                }],
                4114: ["衡水市", 0, {
                    4115: ["饶阳县"],
                    4116: ["武强县"],
                    4117: ["武邑县"],
                    4118: ["阜城县"],
                    4119: ["景县"],
                    4120: ["故城县"],
                    4121: ["枣强县"],
                    4124: ["安平县"],
                    41067: ["桃城区"],
                    41068: ["冀州市"],
                    41069: ["深州市"]
                }],
                4125: ["邢台市", 0, {
                    426: ["临西县"],
                    427: ["内丘县"],
                    428: ["临城县"],
                    429: ["柏乡县"],
                    430: ["宁晋县"],
                    431: ["隆尧县"],
                    432: ["巨鹿县"],
                    433: ["新河县"],
                    434: ["南宫市"],
                    435: ["清河县"],
                    436: ["威县"],
                    437: ["广宗县"],
                    438: ["平乡县"],
                    439: ["南和县"],
                    440: ["任县"],
                    441: ["沙河市"],
                    41047: ["桥东区"],
                    41048: ["桥西区"],
                    41049: ["邢台县"]
                }],
                4130: ["秦皇岛市", 0, {
                    4126: ["青龙满族自治县"],
                    4127: ["昌黎县"],
                    4128: ["卢龙县"],
                    4129: ["抚宁县"],
                    4146: ["北戴河区"],
                    41039: ["海港区"],
                    41040: ["山海关区"]
                }]
            }],
            5: ["河南", 0, {
                500: ["郑州市", 0, {
                    501: ["上街区"],
                    585: ["荥阳市"],
                    5105: ["新郑市"],
                    5114: ["登封市"],
                    5126: ["中牟县"],
                    5130: ["巩义市"],
                    41529: ["中原区"],
                    41530: ["二七区"],
                    41531: ["管城回族区"],
                    41532: ["金水区"],
                    41533: ["惠济区"],
                    41534: ["新密市"]
                }],
                502: ["安阳市", 0, {
                    503: ["安阳县"],
                    576: ["汤阴县"],
                    578: ["内黄县"],
                    579: ["滑县"],
                    41551: ["文峰区"],
                    41552: ["北关区"],
                    41553: ["殷都区"],
                    41554: ["龙安区"],
                    41555: ["林州市"]
                }],
                504: ["新乡市", 0, {
                    505: ["新乡县"],
                    508: ["延津县"],
                    509: ["原阳县"],
                    510: ["获嘉县"],
                    511: ["卫辉市"],
                    512: ["辉县市"],
                    513: ["长垣县"],
                    41559: ["红旗区"],
                    41560: ["卫滨区"],
                    41561: ["凤泉区"],
                    41562: ["牧野区"],
                    41563: ["封丘县"]
                }],
                506: ["商丘市", 0, {
                    561: ["虞城县"],
                    562: ["夏邑县"],
                    563: ["永城市"],
                    564: ["柘城县"],
                    565: ["宁陵县"],
                    567: ["民权县"],
                    41579: ["梁园区"],
                    41580: ["睢阳区"],
                    41581: ["睢县"]
                }],
                515: ["许昌市", 0, {516: ["许昌县"], 517: ["长葛市"], 518: ["鄢陵县"], 519: ["禹州市"], 590: ["襄城县"], 41571: ["魏都区"]}],
                521: ["平顶山市", 0, {
                    520: ["舞钢市"],
                    589: ["郏县"],
                    591: ["叶县"],
                    592: ["鲁山县"],
                    593: ["宝丰县"],
                    594: ["汝州市"],
                    41547: ["新华区"],
                    41548: ["卫东区"],
                    41549: ["石龙区"],
                    41550: ["湛河区"]
                }],
                522: ["信阳市", 0, {
                    5106: ["罗山县"],
                    5107: ["息县"],
                    5108: ["潢川县"],
                    5109: ["光山县"],
                    5110: ["新县"],
                    5111: ["淮滨县"],
                    5112: ["固始县"],
                    5113: ["商城县"],
                    41582: ["浉河区"],
                    41583: ["平桥区"]
                }],
                524: ["南阳市", 0, {
                    560: ["西峡县"],
                    5115: ["淅川县"],
                    5116: ["方城县"],
                    5117: ["社旗县"],
                    5118: ["唐河县"],
                    5119: ["新野县"],
                    5120: ["邓州市"],
                    5121: ["镇平县"],
                    5122: ["南召县"],
                    5123: ["桐柏县"],
                    5124: ["内乡县"],
                    41577: ["宛城区"],
                    41578: ["卧龙区"]
                }],
                528: ["开封市", 0, {
                    526: ["兰考县"],
                    527: ["杞县"],
                    529: ["开封县"],
                    530: ["通许县"],
                    531: ["尉氏县"],
                    41535: ["龙亭区"],
                    41536: ["顺河回族区"],
                    41537: ["鼓楼区"],
                    41538: ["禹王台区"],
                    41539: ["金明区"]
                }],
                534: ["洛阳市", 0, {
                    532: ["汝阳县"],
                    533: ["嵩县"],
                    535: ["孟津县"],
                    536: ["偃师市"],
                    537: ["伊川县"],
                    538: ["宜阳县"],
                    539: ["新安县"],
                    541: ["洛宁县"],
                    41540: ["老城区"],
                    41541: ["西工区"],
                    41542: ["廛河回族区"],
                    41543: ["涧西区"],
                    41544: ["吉利区"],
                    41545: ["洛龙区"],
                    41546: ["栾川县"]
                }],
                544: ["济源市"],
                546: ["焦作市", 0, {
                    542: ["温县"],
                    543: ["沁阳市"],
                    545: ["修武县"],
                    548: ["博爱县"],
                    549: ["武陟县"],
                    41564: ["解放区"],
                    41565: ["中站区"],
                    41566: ["马村区"],
                    41567: ["山阳区"],
                    41568: ["孟州市"]
                }],
                551: ["驻马店市", 0, {
                    550: ["泌阳县"],
                    552: ["遂平县"],
                    553: ["汝南县"],
                    554: ["确山县"],
                    555: ["西平县"],
                    556: ["上蔡县"],
                    557: ["平舆县"],
                    558: ["新蔡县"],
                    559: ["正阳县"],
                    41585: ["驿城区"]
                }],
                571: ["鹤壁市", 0, {568: ["浚县"], 569: ["淇县"], 41556: ["鹤山区"], 41557: ["山城区"], 41558: ["淇滨区"]}],
                572: ["漯河市", 0, {587: ["舞阳县"], 588: ["郾城区"], 41572: ["源汇区"], 41573: ["召陵区"], 41574: ["临颍县"]}],
                584: ["濮阳市", 0, {
                    580: ["台前县"],
                    581: ["范县"],
                    582: ["南乐县"],
                    583: ["清丰县"],
                    41569: ["华龙区"],
                    41570: ["濮阳县"]
                }],
                596: ["周口市", 0, {
                    595: ["鹿邑县"],
                    597: ["西华县"],
                    598: ["淮阳县"],
                    599: ["郸城县"],
                    5100: ["沈丘县"],
                    5101: ["项城市"],
                    5102: ["扶沟县"],
                    5103: ["太康县"],
                    5104: ["商水县"],
                    41584: ["川汇区"]
                }],
                5131: ["三门峡市", 0, {
                    5125: ["卢氏县"],
                    5127: ["渑池县"],
                    5128: ["义马市"],
                    5129: ["灵宝市"],
                    41575: ["湖滨区"],
                    41576: ["陕县"]
                }]
            }],
            6: ["黑龙江", 0, {
                600: ["哈尔滨市", 0, {
                    612: ["通河县"],
                    613: ["阿城区"],
                    614: ["尚志市"],
                    615: ["延寿县"],
                    616: ["双城市"],
                    645: ["依兰县"],
                    667: ["呼兰区"],
                    671: ["宾县"],
                    672: ["木兰县"],
                    673: ["五常市"],
                    674: ["巴彦县"],
                    679: ["方正县"],
                    41227: ["道里区"],
                    41228: ["南岗区"],
                    41229: ["道外区"],
                    41230: ["香坊区"],
                    41232: ["平房区"],
                    41233: ["松北区"]
                }],
                601: ["齐齐哈尔市", 0, {
                    622: ["克山县"],
                    623: ["拜泉县"],
                    624: ["依安县"],
                    625: ["龙江县"],
                    626: ["讷河市"],
                    627: ["泰来县"],
                    629: ["甘南县"],
                    630: ["富裕县"],
                    669: ["克东县"],
                    41234: ["龙沙区"],
                    41235: ["建华区"],
                    41236: ["铁锋区"],
                    41237: ["昂昂溪区"],
                    41238: ["富拉尔基区"],
                    41239: ["碾子山区"],
                    41240: ["梅里斯达斡尔族区"]
                }],
                602: ["牡丹江市", 0, {
                    634: ["林口县"],
                    635: ["穆棱市"],
                    636: ["东宁县"],
                    637: ["海林市"],
                    638: ["宁安市"],
                    639: ["绥芬河市"],
                    41287: ["东安区"],
                    41288: ["阳明区"],
                    41289: ["爱民区"],
                    41290: ["西安区"]
                }],
                603: ["佳木斯市", 0, {
                    643: ["桦川县"],
                    644: ["汤原县"],
                    648: ["桦南县"],
                    668: ["富锦市"],
                    670: ["抚远县"],
                    676: ["同江市"],
                    41280: ["向阳区"],
                    41281: ["前进区"],
                    41282: ["东风区"],
                    41283: ["郊区"]
                }],
                604: ["绥化市", 0, {
                    617: ["肇东市"],
                    651: ["明水县"],
                    652: ["庆安县"],
                    653: ["海伦市"],
                    654: ["安达市"],
                    657: ["绥棱县"],
                    658: ["望奎县"],
                    659: ["兰西县"],
                    660: ["青冈县"],
                    41293: ["北林区"]
                }],
                605: ["黑河市", 0, {
                    662: ["北安市"],
                    663: ["孙吴县"],
                    664: ["逊克县"],
                    666: ["嫩江县"],
                    41291: ["爱辉区"],
                    41292: ["五大连池市"]
                }],
                610: ["伊春市", 0, {
                    677: ["嘉荫县"],
                    678: ["铁力市"],
                    41264: ["伊春区"],
                    41265: ["南岔区"],
                    41266: ["友好区"],
                    41267: ["西林区"],
                    41268: ["翠峦区"],
                    41269: ["新青区"],
                    41270: ["美溪区"],
                    41271: ["金山屯区"],
                    41272: ["五营区"],
                    41273: ["乌马河区"],
                    41274: ["汤旺河区"],
                    41275: ["带岭区"],
                    41276: ["乌伊岭区"],
                    41277: ["红星区"],
                    41278: ["上甘岭区"]
                }],
                611: ["大庆市", 0, {
                    621: ["林甸县"],
                    655: ["肇州县"],
                    656: ["肇源县"],
                    41258: ["萨尔图区"],
                    41259: ["龙凤区"],
                    41260: ["让胡路区"],
                    41261: ["红岗区"],
                    41262: ["大同区"],
                    41263: ["杜尔伯特蒙古族自治县"]
                }],
                618: ["鸡西市", 0, {
                    632: ["鸡东县"],
                    633: ["密山市"],
                    640: ["虎林市"],
                    41241: ["鸡冠区"],
                    41242: ["恒山区"],
                    41243: ["滴道区"],
                    41244: ["梨树区"],
                    41245: ["城子河区"],
                    41246: ["麻山区"]
                }],
                619: ["鹤岗市", 0, {
                    646: ["萝北县"],
                    41247: ["向阳区"],
                    41248: ["工农区"],
                    41249: ["南山区"],
                    41250: ["兴安区"],
                    41251: ["东山区"],
                    41252: ["兴山区"],
                    41253: ["绥滨县"]
                }],
                620: ["双鸭山市", 0, {
                    631: ["友谊县"],
                    647: ["宝清县"],
                    649: ["饶河县"],
                    650: ["集贤县"],
                    41254: ["尖山区"],
                    41255: ["岭东区"],
                    41256: ["四方台区"],
                    41257: ["宝山区"]
                }],
                641: ["七台河市", 0, {642: ["勃利县"], 41284: ["新兴区"], 41285: ["桃山区"], 41286: ["茄子河区"]}],
                680: ["大兴安岭地区", 0, {606: ["呼玛县"], 607: ["漠河县"], 608: ["塔河县"]}]
            }],
            7: ["吉林", 0, {
                700: ["长春市", 0, {
                    710: ["双阳区"],
                    711: ["德惠市"],
                    712: ["农安县"],
                    713: ["九台市"],
                    714: ["榆树市"],
                    41206: ["南关区"],
                    41207: ["宽城区"],
                    41208: ["朝阳区"],
                    41209: ["二道区"],
                    41210: ["绿园区"]
                }],
                701: ["吉林市", 0, {
                    715: ["永吉县"],
                    716: ["磐石市"],
                    717: ["桦甸市"],
                    718: ["蛟河市"],
                    719: ["舒兰市"],
                    41211: ["昌邑区"],
                    41212: ["龙潭区"],
                    41213: ["船营区"],
                    41214: ["丰满区"]
                }],
                703: ["四平市", 0, {
                    727: ["公主岭市"],
                    728: ["双辽市"],
                    729: ["伊通满族自治县"],
                    730: ["梨树县"],
                    41215: ["铁西区"],
                    41216: ["铁东区"]
                }],
                704: ["通化市", 0, {
                    732: ["通化县"],
                    733: ["梅河口市"],
                    734: ["集安市"],
                    735: ["柳河县"],
                    736: ["辉南县"],
                    41220: ["东昌区"],
                    41221: ["二道江区"]
                }],
                705: ["白城市", 0, {740: ["洮南市"], 741: ["镇赉县"], 743: ["通榆县"], 744: ["大安市"], 41225: ["洮北区"]}],
                706: ["辽源市", 0, {747: ["东丰县"], 41217: ["龙山区"], 41218: ["西安区"], 41219: ["东辽县"]}],
                707: ["松原市", 0, {708: ["前郭尔罗斯蒙古族自治县"], 742: ["扶余县"], 745: ["长岭县"], 746: ["乾安县"], 41224: ["宁江区"]}],
                748: ["白山市", 0, {
                    731: ["临江市"],
                    737: ["靖宇县"],
                    738: ["长白朝鲜族自治县"],
                    739: ["抚松县"],
                    41222: ["八道江区"],
                    41223: ["江源县"]
                }],
                41226: ["延边朝鲜族自治州", 0, {
                    702: ["延吉市"],
                    720: ["汪清县"],
                    721: ["和龙市"],
                    722: ["安图县"],
                    723: ["敦化市"],
                    724: ["图们市"],
                    725: ["珲春市"],
                    726: ["龙井市"]
                }]
            }],
            8: ["辽宁", 0, {
                800: ["沈阳市", 0, {
                    801: ["辽中县"],
                    802: ["新民市"],
                    41137: ["和平区"],
                    41138: ["沈河区"],
                    41139: ["大东区"],
                    41140: ["皇姑区"],
                    41141: ["铁西区"],
                    41142: ["苏家屯区"],
                    41143: ["东陵区"],
                    41145: ["于洪区"],
                    41146: ["康平县"],
                    41147: ["法库县"],
                    42252: ["沈北新区"]
                }],
                806: ["铁岭市", 0, {
                    803: ["昌图县"],
                    804: ["开原市"],
                    805: ["西丰县"],
                    41197: ["银州区"],
                    41198: ["清河区"],
                    41199: ["铁岭县"],
                    41200: ["调兵山市"]
                }],
                807: ["大连市", 0, {
                    808: ["庄河市"],
                    809: ["长海县"],
                    812: ["瓦房店市"],
                    41148: ["中山区"],
                    41149: ["西岗区"],
                    41150: ["沙河口区"],
                    41151: ["甘井子区"],
                    41152: ["旅顺口区"],
                    41153: ["金州区"],
                    41154: ["普兰店市"]
                }],
                813: ["鞍山市", 0, {
                    814: ["海城市"],
                    815: ["台安县"],
                    816: ["岫岩满族自治县"],
                    41155: ["铁东区"],
                    41156: ["铁西区"],
                    41157: ["立山区"],
                    41158: ["千山区"]
                }],
                817: ["抚顺市", 0, {
                    819: ["新宾满族自治县"],
                    41159: ["新抚区"],
                    41160: ["东洲区"],
                    41161: ["望花区"],
                    41162: ["顺城区"],
                    41163: ["抚顺县"],
                    41164: ["清原满族自治县"]
                }],
                820: ["本溪市", 0, {
                    822: ["桓仁满族自治县"],
                    41165: ["平山区"],
                    41166: ["溪湖区"],
                    41167: ["明山区"],
                    41168: ["南芬区"],
                    41169: ["本溪满族自治县"]
                }],
                824: ["丹东市", 0, {
                    823: ["凤城市"],
                    825: ["宽甸满族自治县"],
                    41170: ["元宝区"],
                    41171: ["振兴区"],
                    41172: ["振安区"],
                    41173: ["东港市"]
                }],
                831: ["锦州市", 0, {
                    827: ["北镇市"],
                    829: ["黑山县"],
                    830: ["义县"],
                    41174: ["古塔区"],
                    41175: ["凌河区"],
                    41176: ["太和区"],
                    41177: ["凌海市"]
                }],
                834: ["营口市", 0, {
                    41178: ["站前区"],
                    41179: ["西市区"],
                    41180: ["鲅鱼圈区"],
                    41181: ["老边区"],
                    41182: ["盖州市"],
                    41183: ["大石桥市"]
                }],
                835: ["阜新市", 0, {
                    836: ["彰武县"],
                    41184: ["海州区"],
                    41185: ["新邱区"],
                    41186: ["太平区"],
                    41187: ["清河门区"],
                    41188: ["细河区"],
                    41189: ["阜新蒙古族自治县"]
                }],
                838: ["辽阳市", 0, {
                    839: ["辽阳县"],
                    840: ["灯塔市"],
                    41190: ["白塔区"],
                    41191: ["文圣区"],
                    41192: ["宏伟区"],
                    41193: ["弓长岭区"],
                    41194: ["太子河区"]
                }],
                843: ["朝阳市", 0, {
                    841: ["喀喇沁左翼蒙古族自治县"],
                    842: ["朝阳县"],
                    844: ["建平县"],
                    845: ["北票市"],
                    846: ["凌源市"],
                    41201: ["双塔区"],
                    41202: ["龙城区"]
                }],
                847: ["盘锦市", 0, {848: ["大洼县"], 849: ["盘山县"], 41195: ["双台子区"], 41196: ["兴隆台区"]}],
                854: ["葫芦岛市", 0, {
                    850: ["兴城市"],
                    851: ["绥中县"],
                    852: ["建昌县"],
                    41203: ["连山区"],
                    41204: ["龙港区"],
                    41205: ["南票区"]
                }]
            }],
            9: ["山东", 0, {
                900: ["济南市", 0, {
                    925: ["长清区"],
                    933: ["章丘市"],
                    959: ["商河县"],
                    961: ["济阳县"],
                    997: ["平阴县"],
                    41480: ["历下区"],
                    41481: ["市中区"],
                    41482: ["槐荫区"],
                    41483: ["天桥区"],
                    41484: ["历城区"]
                }],
                901: ["青岛市", 0, {
                    935: ["胶南市"],
                    936: ["胶州市"],
                    937: ["平度市"],
                    938: ["莱西市"],
                    939: ["即墨市"],
                    41485: ["市南区"],
                    41486: ["市北区"],
                    41487: ["四方区"],
                    41488: ["黄岛区"],
                    41489: ["崂山区"],
                    41490: ["李沧区"],
                    41491: ["城阳区"]
                }],
                903: ["淄博市", 0, {
                    902: ["桓台县"],
                    946: ["高青县"],
                    9101: ["沂源县"],
                    41492: ["淄川区"],
                    41493: ["张店区"],
                    41494: ["博山区"],
                    41495: ["临淄区"],
                    41496: ["周村区"]
                }],
                904: ["德州市", 0, {
                    924: ["庆云县"],
                    934: ["夏津县"],
                    953: ["齐河县"],
                    954: ["陵县"],
                    955: ["平原县"],
                    956: ["武城县"],
                    957: ["宁津县"],
                    958: ["乐陵市"],
                    960: ["临邑县"],
                    962: ["禹城市"],
                    41524: ["德城区"]
                }],
                905: ["烟台市", 0, {
                    940: ["招远市"],
                    941: ["莱阳市"],
                    942: ["海阳市"],
                    963: ["长岛县"],
                    964: ["莱州市"],
                    965: ["龙口市"],
                    966: ["蓬莱市"],
                    967: ["栖霞市"],
                    968: ["牟平区"],
                    41504: ["芝罘区"],
                    41505: ["福山区"],
                    41506: ["莱山区"]
                }],
                906: ["潍坊市", 0, {
                    969: ["寿光市"],
                    972: ["昌邑市"],
                    973: ["高密市"],
                    974: ["诸城市"],
                    976: ["安丘市"],
                    977: ["临朐县"],
                    978: ["青州市"],
                    998: ["昌乐县"],
                    41507: ["潍城区"],
                    41508: ["寒亭区"],
                    41509: ["坊子区"],
                    41510: ["奎文区"]
                }],
                907: ["济宁市", 0, {
                    979: ["梁山县"],
                    982: ["曲阜市"],
                    983: ["兖州市"],
                    984: ["邹城市"],
                    985: ["微山县"],
                    986: ["鱼台县"],
                    987: ["金乡县"],
                    988: ["嘉祥县"],
                    992: ["泗水县"],
                    995: ["汶上县"],
                    41511: ["市中区"],
                    41512: ["任城区"]
                }],
                908: ["泰安市", 0, {
                    991: ["新泰市"],
                    993: ["宁阳县"],
                    994: ["东平县"],
                    996: ["肥城市"],
                    41513: ["泰山区"],
                    41514: ["岱岳区"]
                }],
                909: ["临沂市", 0, {
                    989: ["苍山县"],
                    999: ["平邑县"],
                    9100: ["蒙阴县"],
                    9102: ["沂水县"],
                    9103: ["沂南县"],
                    9105: ["莒南县"],
                    9107: ["郯城县"],
                    9108: ["费县"],
                    41520: ["兰山区"],
                    41521: ["罗庄区"],
                    41522: ["河东区"],
                    41523: ["临沭县"]
                }],
                910: ["威海市", 0, {911: ["荣成市"], 913: ["文登市"], 914: ["乳山市"], 41515: ["环翠区"]}],
                912: ["菏泽市", 0, {
                    916: ["巨野县"],
                    917: ["定陶县"],
                    918: ["成武县"],
                    919: ["单县"],
                    920: ["曹县"],
                    921: ["东明县"],
                    922: ["鄄城县"],
                    923: ["郓城县"],
                    41528: ["牡丹区"]
                }],
                915: ["日照市", 0, {975: ["五莲县"], 9104: ["莒县"], 41516: ["东港区"], 41517: ["岚山区"]}],
                926: ["聊城市", 0, {
                    927: ["临清市"],
                    929: ["东阿县"],
                    930: ["阳谷县"],
                    931: ["莘县"],
                    932: ["冠县"],
                    9109: ["高唐县"],
                    41525: ["东昌府区"],
                    41526: ["茌平县"]
                }],
                944: ["滨州市", 0, {
                    945: ["博兴县"],
                    947: ["邹平县"],
                    948: ["惠民县"],
                    949: ["无棣县"],
                    950: ["沾化县"],
                    951: ["阳信县"],
                    41527: ["滨城区"]
                }],
                970: ["东营市", 0, {943: ["利津县"], 952: ["广饶县"], 971: ["垦利县"], 41502: ["东营区"], 41503: ["河口区"]}],
                980: ["枣庄市", 0, {
                    981: ["滕州市"],
                    41497: ["市中区"],
                    41498: ["薛城区"],
                    41499: ["峄城区"],
                    41500: ["台儿庄区"],
                    41501: ["山亭区"]
                }],
                990: ["莱芜市", 0, {41518: ["莱城区"], 41519: ["钢城区"]}]
            }],
            10: ["内蒙古", 1, {
                1e3: ["呼和浩特市", 0, {
                    1003: ["武川县"],
                    1005: ["托克托县"],
                    1041: ["和林格尔县"],
                    1055: ["清水河县"],
                    41104: ["新城区"],
                    41105: ["回民区"],
                    41106: ["玉泉区"],
                    41107: ["赛罕区"],
                    41108: ["土默特左旗"]
                }],
                1008: ["包头市", 0, {
                    1007: ["土默特右旗"],
                    1009: ["固阳县"],
                    1043: ["达尔罕茂明安联合旗"],
                    41109: ["东河区"],
                    41110: ["昆都仑区"],
                    41111: ["青山区"],
                    41112: ["石拐区"],
                    41113: ["白云矿区"],
                    41114: ["九原区"]
                }],
                1011: ["乌海市", 0, {41115: ["海勃湾区"], 41116: ["海南区"], 41117: ["乌达区"]}],
                1013: ["通辽市", 0, {
                    1057: ["开鲁县"],
                    1058: ["库伦旗"],
                    1059: ["奈曼旗"],
                    1060: ["扎鲁特旗"],
                    1061: ["科尔沁左翼中旗"],
                    1063: ["霍林郭勒市"],
                    41121: ["科尔沁区"],
                    41122: ["科尔沁左翼后旗"]
                }],
                1014: ["赤峰市", 0, {
                    1015: ["阿鲁科尔沁旗"],
                    1016: ["敖汉旗"],
                    1017: ["宁城县"],
                    1018: ["翁牛特旗"],
                    1019: ["巴林左旗"],
                    1020: ["巴林右旗"],
                    1021: ["林西县"],
                    1022: ["克什克腾旗"],
                    1023: ["喀喇沁旗"],
                    41118: ["红山区"],
                    41119: ["元宝山区"],
                    41120: ["松山区"]
                }],
                41123: ["鄂尔多斯市", 0, {
                    1024: ["东胜区"],
                    1067: ["达拉特旗"],
                    1068: ["伊金霍洛旗"],
                    1069: ["准格尔旗"],
                    1070: ["杭锦旗"],
                    1071: ["乌审旗"],
                    1072: ["鄂托克旗"],
                    1073: ["鄂托克前旗"]
                }],
                41124: ["呼伦贝尔市", 0, {
                    1001: ["海拉尔区"],
                    1002: ["鄂温克族自治旗"],
                    1028: ["牙克石市"],
                    1029: ["扎兰屯市"],
                    1030: ["鄂伦春自治旗"],
                    1031: ["陈巴尔虎旗"],
                    1032: ["新巴尔虎左旗"],
                    1033: ["新巴尔虎右旗"],
                    1038: ["满洲里市"],
                    1042: ["阿荣旗"],
                    41125: ["莫力达瓦达斡尔族自治旗"],
                    41126: ["额尔古纳市"],
                    41127: ["根河市"]
                }],
                41128: ["巴彦淖尔市", 0, {
                    1025: ["临河区"],
                    1026: ["杭锦后旗"],
                    1075: ["五原县"],
                    1076: ["乌拉特前旗"],
                    1077: ["乌拉特中旗"],
                    1078: ["乌拉特后旗"],
                    41129: ["磴口县"]
                }],
                41130: ["乌兰察布市", 0, {
                    1012: ["集宁区"],
                    1044: ["四子王旗"],
                    1046: ["化德县"],
                    1047: ["丰镇市"],
                    1048: ["卓资县"],
                    1049: ["商都县"],
                    1050: ["兴和县"],
                    1051: ["察哈尔右翼前旗"],
                    1052: ["察哈尔右翼中旗"],
                    1053: ["察哈尔右翼后旗"],
                    1054: ["凉城县"]
                }],
                41131: ["兴安盟", 0, {
                    1040: ["乌兰浩特市"],
                    1056: ["科尔沁右翼中旗"],
                    1064: ["突泉县"],
                    1065: ["扎赉特旗"],
                    1066: ["阿尔山市"],
                    41132: ["科尔沁右翼前旗"]
                }],
                41133: ["锡林郭勒盟", 0, {
                    1027: ["锡林浩特市"],
                    1039: ["二连浩特市"],
                    1080: ["多伦县"],
                    1081: ["太仆寺旗"],
                    1082: ["苏尼特左旗"],
                    1083: ["苏尼特右旗"],
                    1084: ["镶黄旗"],
                    1085: ["东乌珠穆沁旗"],
                    1086: ["西乌珠穆沁旗"],
                    1087: ["正镶白旗"],
                    1088: ["正蓝旗"],
                    41134: ["阿巴嘎旗"]
                }],
                41135: ["阿拉善盟", 0, {1045: ["阿拉善左旗"], 1079: ["阿拉善右旗"], 41136: ["额济纳旗"]}]
            }],
            11: ["江苏", 0, {
                1100: ["南京市", 0, {
                    1108: ["高淳县"],
                    1109: ["溧水县"],
                    1110: ["六合区"],
                    1111: ["江宁区"],
                    41306: ["玄武区"],
                    41307: ["白下区"],
                    41308: ["秦淮区"],
                    41309: ["建邺区"],
                    41310: ["鼓楼区"],
                    41311: ["下关区"],
                    41312: ["浦口区"],
                    41313: ["栖霞区"],
                    41314: ["雨花台区"]
                }],
                1101: ["无锡市", 0, {
                    1103: ["江阴市"],
                    1134: ["宜兴市"],
                    41315: ["崇安区"],
                    41316: ["南长区"],
                    41317: ["北塘区"],
                    41318: ["锡山区"],
                    41319: ["惠山区"],
                    41320: ["滨湖区"]
                }],
                1104: ["镇江市", 0, {
                    1105: ["丹徒区"],
                    1130: ["丹阳市"],
                    1131: ["扬中市"],
                    1175: ["句容市"],
                    41350: ["京口区"],
                    41351: ["润州区"]
                }],
                1106: ["苏州市", 0, {
                    1135: ["常熟市"],
                    1136: ["张家港市"],
                    1137: ["吴江市"],
                    1138: ["昆山市"],
                    1139: ["太仓市"],
                    41331: ["沧浪区"],
                    41332: ["平江区"],
                    41333: ["金阊区"],
                    41334: ["虎丘区"],
                    41335: ["吴中区"],
                    41336: ["相城区"]
                }],
                1112: ["南通市", 0, {
                    1113: ["通州市"],
                    1114: ["如皋市"],
                    1115: ["如东县"],
                    1140: ["海门市"],
                    1141: ["启东市"],
                    1144: ["海安县"],
                    41337: ["崇川区"],
                    41338: ["港闸区"]
                }],
                1116: ["扬州市", 0, {
                    1117: ["邗江区"],
                    1148: ["江都市"],
                    1150: ["宝应县"],
                    1151: ["高邮市"],
                    1174: ["仪征市"],
                    41348: ["广陵区"]
                }],
                1118: ["盐城市", 0, {
                    1153: ["东台市"],
                    1154: ["大丰市"],
                    1155: ["射阳县"],
                    1156: ["滨海县"],
                    1157: ["响水县"],
                    1158: ["阜宁县"],
                    1159: ["建湖县"],
                    41346: ["亭湖区"],
                    41347: ["盐都区"]
                }],
                1119: ["徐州市", 0, {
                    1120: ["铜山县"],
                    1160: ["睢宁县"],
                    1162: ["新沂市"],
                    1163: ["沛县"],
                    1164: ["丰县"],
                    41321: ["鼓楼区"],
                    41322: ["云龙区"],
                    41324: ["贾汪区"],
                    41325: ["泉山区"],
                    41326: ["邳州市"]
                }],
                1123: ["淮安市", 0, {
                    1165: ["涟水县"],
                    1170: ["盱眙县"],
                    1171: ["金湖县"],
                    1172: ["洪泽县"],
                    41342: ["清河区"],
                    41343: ["楚州区"],
                    41344: ["淮阴区"],
                    41345: ["清浦区"]
                }],
                1124: ["连云港市", 0, {
                    1125: ["赣榆县"],
                    1126: ["灌云县"],
                    1127: ["东海县"],
                    1173: ["灌南县"],
                    41339: ["连云区"],
                    41340: ["新浦区"],
                    41341: ["海州区"]
                }],
                1128: ["常州市", 0, {
                    1129: ["武进区"],
                    1132: ["金坛市"],
                    1133: ["溧阳市"],
                    41327: ["天宁区"],
                    41328: ["钟楼区"],
                    41329: ["戚墅堰区"],
                    41330: ["新北区"]
                }],
                1145: ["泰州市", 0, {
                    1146: ["靖江市"],
                    1149: ["兴化市"],
                    1152: ["泰兴市"],
                    41352: ["海陵区"],
                    41353: ["高港区"],
                    41354: ["姜堰市"]
                }],
                1167: ["宿迁市", 0, {1166: ["沭阳县"], 1168: ["泗阳县"], 1169: ["泗洪县"], 41355: ["宿城区"], 41356: ["宿豫区"]}]
            }],
            12: ["安徽", 0, {
                1200: ["合肥市", 0, {
                    1207: ["肥西县"],
                    1208: ["长丰县"],
                    1209: ["肥东县"],
                    41383: ["瑶海区"],
                    41384: ["庐阳区"],
                    41385: ["蜀山区"],
                    41386: ["包河区"],
                    42283: ["巢湖市"],
                    42284: ["庐江县"]
                }],
                1205: ["滁州市", 0, {
                    1201: ["天长市"],
                    1202: ["来安县"],
                    1203: ["定远县"],
                    1206: ["全椒县"],
                    1257: ["凤阳县"],
                    41415: ["琅琊区"],
                    41416: ["南谯区"],
                    41417: ["明光市"]
                }],
                1210: ["蚌埠市", 0, {
                    1211: ["固镇县"],
                    1212: ["五河县"],
                    1213: ["怀远县"],
                    41391: ["龙子湖区"],
                    41392: ["蚌山区"],
                    41393: ["禹会区"],
                    41394: ["淮上区"]
                }],
                1214: ["芜湖市", 0, {
                    1215: ["芜湖县"],
                    1216: ["南陵县"],
                    1217: ["繁昌县"],
                    41387: ["镜湖区"],
                    41388: ["弋江区"],
                    41389: ["鸠江区"],
                    41390: ["三山区"],
                    42285: ["无为县"]
                }],
                1218: ["淮南市", 0, {
                    1219: ["凤台县"],
                    41395: ["大通区"],
                    41396: ["田家庵区"],
                    41397: ["谢家集区"],
                    41398: ["八公山区"],
                    41399: ["潘集区"]
                }],
                1220: ["马鞍山市", 0, {
                    1221: ["当涂县"],
                    41400: ["金家庄区"],
                    41401: ["花山区"],
                    41402: ["雨山区"],
                    42286: ["和县"],
                    42287: ["含山县"]
                }],
                1227: ["安庆市", 0, {
                    1222: ["岳西县"],
                    1223: ["怀宁县"],
                    1224: ["枞阳县"],
                    1225: ["望江县"],
                    1226: ["潜山县"],
                    1228: ["宿松县"],
                    1229: ["太湖县"],
                    1230: ["桐城市"],
                    41410: ["迎江区"],
                    41411: ["大观区"],
                    41412: ["宜秀区"]
                }],
                1232: ["宿州市", 0, {1231: ["萧县"], 1233: ["灵璧县"], 1234: ["泗县"], 41422: ["埇桥区"], 41423: ["砀山县"]}],
                1236: ["阜阳市", 0, {
                    1271: ["阜南县"],
                    1275: ["界首市"],
                    1276: ["颍上县"],
                    1277: ["太和县"],
                    1278: ["临泉县"],
                    41418: ["颍州区"],
                    41419: ["颍东区"],
                    41420: ["颍泉区"]
                }],
                1239: ["黄山市", 0, {
                    1237: ["黟县"],
                    1238: ["歙县"],
                    1240: ["祁门县"],
                    1242: ["休宁县"],
                    1281: ["屯溪区"],
                    41413: ["黄山区"],
                    41414: ["徽州区"]
                }],
                1253: ["淮北市", 0, {1252: ["濉溪县"], 41403: ["杜集区"], 41404: ["相山区"], 41405: ["烈山区"]}],
                1254: ["铜陵市", 0, {41406: ["铜官山区"], 41407: ["狮子山区"], 41408: ["郊区"], 41409: ["铜陵县"]}],
                1266: ["六安市", 0, {
                    1256: ["舒城县"],
                    1265: ["金寨县"],
                    1267: ["寿县"],
                    1268: ["霍邱县"],
                    1269: ["霍山县"],
                    41425: ["金安区"],
                    41426: ["裕安区"]
                }],
                1270: ["亳州市", 0, {1272: ["蒙城县"], 1273: ["涡阳县"], 1274: ["利辛县"], 41427: ["谯城区"]}],
                1282: ["宣城市", 0, {
                    1258: ["宣州区"],
                    1260: ["广德县"],
                    1261: ["郎溪县"],
                    1262: ["宁国市"],
                    1263: ["绩溪县"],
                    1264: ["旌德县"],
                    41429: ["泾县"]
                }],
                41428: ["池州市", 0, {1248: ["东至县"], 1249: ["贵池区"], 1250: ["青阳县"], 1251: ["石台县"]}]
            }],
            13: ["山西", 0, {
                1300: ["太原市", 0, {
                    1336: ["阳曲县"],
                    1337: ["清徐县"],
                    1338: ["古交市"],
                    41070: ["小店区"],
                    41071: ["迎泽区"],
                    41072: ["杏花岭区"],
                    41073: ["尖草坪区"],
                    41074: ["万柏林区"],
                    41075: ["晋源区"],
                    41076: ["娄烦县"]
                }],
                1301: ["大同市", 0, {
                    1341: ["天镇县"],
                    1343: ["阳高县"],
                    1344: ["浑源县"],
                    1346: ["广灵县"],
                    1347: ["灵丘县"],
                    1348: ["左云县"],
                    41077: ["城区"],
                    41078: ["矿区"],
                    41079: ["南郊区"],
                    41080: ["新荣区"],
                    41081: ["大同县"]
                }],
                1306: ["忻州市", 0, {
                    1303: ["原平市"],
                    1304: ["代县"],
                    1349: ["偏关县"],
                    1350: ["静乐县"],
                    1351: ["定襄县"],
                    1352: ["五台县"],
                    1353: ["岢岚县"],
                    1354: ["河曲县"],
                    1355: ["保德县"],
                    1356: ["宁武县"],
                    1357: ["神池县"],
                    1358: ["五寨县"],
                    1391: ["繁峙县"],
                    41095: ["忻府区"]
                }],
                1318: ["阳泉市", 0, {1320: ["平定县"], 41082: ["城区"], 41083: ["矿区"], 41084: ["郊区"], 41085: ["盂县"]}],
                1322: ["长治市", 0, {
                    1363: ["平顺县"],
                    1364: ["黎城县"],
                    1366: ["襄垣县"],
                    1367: ["武乡县"],
                    1368: ["沁县"],
                    1369: ["沁源县"],
                    1370: ["屯留县"],
                    1371: ["长子县"],
                    1372: ["潞城市"],
                    41086: ["长治县"],
                    41087: ["壶关县"],
                    42289: ["城区"],
                    42290: ["郊区"]
                }],
                1323: ["晋城市", 0, {
                    1359: ["高平市"],
                    1360: ["阳城县"],
                    1361: ["沁水县"],
                    1362: ["陵川县"],
                    41088: ["城区"],
                    41089: ["泽州县"]
                }],
                1324: ["临汾市", 0, {
                    1365: ["侯马市"],
                    1383: ["大宁县"],
                    1384: ["曲沃县"],
                    1385: ["翼城县"],
                    1386: ["洪洞县"],
                    1387: ["霍州市"],
                    1388: ["汾西县"],
                    1389: ["蒲县"],
                    1390: ["隰县"],
                    1392: ["乡宁县"],
                    1393: ["吉县"],
                    1394: ["浮山县"],
                    1395: ["古县"],
                    41096: ["尧都区"],
                    41097: ["襄汾县"],
                    41098: ["安泽县"],
                    41099: ["永和县"]
                }],
                1326: ["运城市", 0, {
                    1302: ["芮城县"],
                    1307: ["垣曲县"],
                    1308: ["平陆县"],
                    1310: ["万荣县"],
                    1311: ["稷山县"],
                    1312: ["河津市"],
                    1313: ["新绛县"],
                    1314: ["闻喜县"],
                    1315: ["夏县"],
                    1316: ["绛县"],
                    1317: ["永济市"],
                    41093: ["盐湖区"],
                    41094: ["临猗县"]
                }],
                1339: ["朔州市", 0, {
                    1305: ["山阴县"],
                    1340: ["右玉县"],
                    1342: ["怀仁县"],
                    1345: ["应县"],
                    41090: ["朔城区"],
                    41091: ["平鲁区"]
                }],
                41092: ["晋中市", 0, {
                    1321: ["榆次区"],
                    1373: ["灵石县"],
                    1374: ["昔阳县"],
                    1375: ["和顺县"],
                    1376: ["左权县"],
                    1377: ["榆社县"],
                    1378: ["寿阳县"],
                    1379: ["太谷县"],
                    1380: ["祁县"],
                    1381: ["平遥县"],
                    1382: ["介休市"]
                }],
                41100: ["吕梁市", 0, {
                    1325: ["离石区"],
                    1327: ["方山县"],
                    1328: ["临县"],
                    1329: ["汾阳市"],
                    1330: ["文水县"],
                    1331: ["交城县"],
                    1332: ["孝义市"],
                    1333: ["交口县"],
                    1334: ["中阳县"],
                    1335: ["兴县"],
                    41101: ["柳林县"],
                    41102: ["石楼县"],
                    41103: ["岚县"]
                }]
            }],
            14: ["陕西", 0, {
                1400: ["西安市", 0, {
                    1401: ["长安区"],
                    1402: ["户县"],
                    1403: ["周至县"],
                    1405: ["临潼区"],
                    1406: ["高陵县"],
                    42050: ["新城区"],
                    42051: ["碑林区"],
                    42052: ["莲湖区"],
                    42053: ["灞桥区"],
                    42054: ["未央区"],
                    42055: ["雁塔区"],
                    42056: ["阎良区"],
                    42057: ["蓝田县"]
                }],
                1407: ["咸阳市", 0, {
                    1408: ["兴平市"],
                    1409: ["武功县"],
                    1410: ["永寿县"],
                    1411: ["乾县"],
                    1445: ["彬县"],
                    1446: ["三原县"],
                    1447: ["泾阳县"],
                    1448: ["礼泉县"],
                    1492: ["淳化县"],
                    1493: ["长武县"],
                    1494: ["旬邑县"],
                    42064: ["秦都区"],
                    42065: ["杨凌区"],
                    42066: ["渭城区"]
                }],
                1417: ["延安市", 0, {
                    1412: ["延川县"],
                    1413: ["子长县"],
                    1414: ["延长县"],
                    1416: ["黄陵县"],
                    1418: ["富县"],
                    1419: ["黄龙县"],
                    1420: ["宜川县"],
                    1421: ["洛川县"],
                    1422: ["志丹县"],
                    1423: ["甘泉县"],
                    1424: ["安塞县"],
                    42068: ["宝塔区"],
                    42069: ["吴起县"]
                }],
                1425: ["榆林市", 0, {
                    1449: ["吴堡县"],
                    1450: ["子洲县"],
                    1451: ["佳县"],
                    1452: ["府谷县"],
                    1453: ["米脂县"],
                    1454: ["绥德县"],
                    1455: ["定边县"],
                    1456: ["靖边县"],
                    1457: ["神木县"],
                    1465: ["清涧县"],
                    42071: ["榆阳区"],
                    42072: ["横山县"]
                }],
                1426: ["渭南市", 0, {
                    1427: ["华县"],
                    1458: ["大荔县"],
                    1459: ["华阴市"],
                    1460: ["潼关县"],
                    1461: ["富平县"],
                    1462: ["澄城县"],
                    1463: ["韩城市"],
                    1464: ["蒲城县"],
                    1490: ["合阳县"],
                    1491: ["白水县"],
                    42067: ["临渭区"]
                }],
                1429: ["安康市", 0, {
                    1472: ["镇坪县"],
                    1473: ["岚皋县"],
                    1474: ["宁陕县"],
                    1475: ["汉阴县"],
                    1476: ["旬阳县"],
                    1477: ["白河县"],
                    1478: ["紫阳县"],
                    1479: ["石泉县"],
                    42073: ["汉滨区"],
                    42074: ["平利县"]
                }],
                1430: ["汉中市", 0, {
                    1431: ["南郑县"],
                    1480: ["留坝县"],
                    1481: ["城固县"],
                    1482: ["洋县"],
                    1483: ["佛坪县"],
                    1484: ["西乡县"],
                    1485: ["镇巴县"],
                    1486: ["宁强县"],
                    1487: ["勉县"],
                    1488: ["略阳县"],
                    42070: ["汉台区"]
                }],
                1432: ["宝鸡市", 0, {
                    1434: ["凤翔县"],
                    1435: ["岐山县"],
                    1436: ["扶风县"],
                    1437: ["眉县"],
                    1438: ["太白县"],
                    1439: ["凤县"],
                    1440: ["麟游县"],
                    1441: ["千阳县"],
                    1489: ["陇县"],
                    42061: ["渭滨区"],
                    42062: ["金台区"],
                    42063: ["陈仓区"]
                }],
                1442: ["铜川市", 0, {1444: ["宜君县"], 42058: ["王益区"], 42059: ["印台区"], 42060: ["耀州区"]}],
                42075: ["商洛市", 0, {
                    1428: ["商州区"],
                    1466: ["丹凤县"],
                    1467: ["柞水县"],
                    1468: ["镇安县"],
                    1469: ["山阳县"],
                    1470: ["洛南县"],
                    1471: ["商南县"]
                }]
            }],
            15: ["甘肃", 0, {
                1500: ["兰州市", 0, {
                    1502: ["榆中县"],
                    1503: ["永登县"],
                    1504: ["皋兰县"],
                    1505: ["红古区"],
                    42076: ["城关区"],
                    42077: ["七里河区"],
                    42078: ["西固区"],
                    42079: ["安宁区"]
                }],
                1506: ["定西市", 0, {
                    1529: ["陇西县"],
                    1530: ["漳县"],
                    1531: ["通渭县"],
                    1532: ["岷县"],
                    1533: ["临洮县"],
                    1534: ["渭源县"],
                    42091: ["安定区"]
                }],
                1507: ["平凉市", 0, {
                    1536: ["静宁县"],
                    1537: ["泾川县"],
                    1538: ["灵台县"],
                    1539: ["崇信县"],
                    1540: ["华亭县"],
                    1541: ["庄浪县"],
                    42087: ["崆峒区"]
                }],
                1509: ["武威市", 0, {1549: ["民勤县"], 1550: ["天祝藏族自治县"], 1551: ["古浪县"], 42085: ["凉州区"]}],
                1510: ["张掖市", 0, {
                    1554: ["山丹县"],
                    1555: ["高台县"],
                    1556: ["肃南裕固族自治县"],
                    1557: ["民乐县"],
                    1558: ["临泽县"],
                    42086: ["甘州区"]
                }],
                1511: ["酒泉市", 0, {
                    1563: ["玉门市"],
                    1564: ["安西县"],
                    1565: ["敦煌市"],
                    1566: ["金塔县"],
                    1567: ["肃北蒙古族自治县"],
                    42088: ["肃州区"],
                    42089: ["阿克塞哈萨克族自治县"]
                }],
                1535: ["白银市", 0, {1559: ["平川区"], 1560: ["靖远县"], 1561: ["景泰县"], 1562: ["会宁县"], 42081: ["白银区"]}],
                1542: ["庆阳市", 0, {
                    1508: ["西峰区"],
                    1543: ["宁县"],
                    1544: ["镇原县"],
                    1545: ["环县"],
                    1546: ["合水县"],
                    1547: ["正宁县"],
                    1548: ["华池县"],
                    42090: ["庆城县"]
                }],
                1552: ["金昌市", 0, {1553: ["永昌县"], 42080: ["金川区"]}],
                1568: ["嘉峪关市"],
                1580: ["天水市", 0, {
                    1512: ["甘谷县"],
                    1569: ["武山县"],
                    1570: ["张家川回族自治县"],
                    1571: ["清水县"],
                    42082: ["秦州区"],
                    42083: ["北道区"],
                    42084: ["秦安县"]
                }],
                42092: ["陇南市", 0, {
                    1513: ["武都区"],
                    1572: ["成县"],
                    1573: ["康县"],
                    1574: ["文县"],
                    1576: ["西和县"],
                    1577: ["礼县"],
                    1578: ["徽县"],
                    1579: ["两当县"],
                    42093: ["宕昌县"]
                }],
                42094: ["临夏回族自治州", 0, {
                    1514: ["临夏市"],
                    1515: ["永靖县"],
                    1516: ["和政县"],
                    1517: ["东乡族自治县"],
                    1518: ["康乐县"],
                    1519: ["广河县"],
                    1520: ["积石山保安族东乡族撒拉族自治县"],
                    42095: ["临夏县"]
                }],
                42096: ["甘南藏族自治州", 0, {
                    1522: ["夏河县"],
                    1523: ["临潭县"],
                    1524: ["舟曲县"],
                    1525: ["碌曲县"],
                    1526: ["玛曲县"],
                    1527: ["卓尼县"],
                    1528: ["迭部县"],
                    42097: ["合作市"]
                }]
            }],
            16: ["浙江", 0, {
                1600: ["杭州市", 0, {
                    1620: ["余杭区"],
                    1621: ["萧山区"],
                    1622: ["富阳市"],
                    1623: ["桐庐县"],
                    1624: ["建德市"],
                    1625: ["淳安县"],
                    1626: ["临安市"],
                    41357: ["上城区"],
                    41358: ["下城区"],
                    41359: ["江干区"],
                    41360: ["拱墅区"],
                    41361: ["西湖区"],
                    41362: ["滨江区"]
                }],
                1601: ["湖州市", 0, {1627: ["德清县"], 1628: ["安吉县"], 1629: ["长兴县"], 41373: ["吴兴区"], 41374: ["南浔区"]}],
                1602: ["嘉兴市", 0, {
                    1630: ["嘉善县"],
                    1631: ["平湖市"],
                    1632: ["海盐县"],
                    1633: ["海宁市"],
                    1634: ["桐乡市"],
                    41371: ["南湖区"],
                    41372: ["秀洲区"]
                }],
                1603: ["宁波市", 0, {
                    1605: ["镇海区"],
                    1635: ["象山县"],
                    1636: ["宁海县"],
                    1637: ["奉化市"],
                    1638: ["余姚市"],
                    1639: ["慈溪市"],
                    41363: ["海曙区"],
                    41364: ["江东区"],
                    41365: ["江北区"],
                    41366: ["北仑区"],
                    41367: ["鄞州区"]
                }],
                1606: ["绍兴市", 0, {
                    1607: ["绍兴县"],
                    1640: ["上虞市"],
                    1642: ["新昌县"],
                    1643: ["诸暨市"],
                    1680: ["嵊州市"],
                    41375: ["越城区"]
                }],
                1609: ["温州市", 0, {
                    1655: ["永嘉县"],
                    1656: ["乐清市"],
                    1657: ["洞头县"],
                    1658: ["瑞安市"],
                    1659: ["平阳县"],
                    1660: ["苍南县"],
                    1661: ["泰顺县"],
                    1662: ["文成县"],
                    41368: ["鹿城区"],
                    41369: ["龙湾区"],
                    41370: ["瓯海区"]
                }],
                1611: ["丽水市", 0, {
                    1663: ["缙云县"],
                    1664: ["青田县"],
                    1665: ["云和县"],
                    1666: ["庆元县"],
                    1667: ["龙泉市"],
                    1668: ["遂昌县"],
                    1669: ["松阳县"],
                    1670: ["景宁畲族自治县"],
                    41382: ["莲都区"]
                }],
                1612: ["金华市", 0, {
                    1671: ["浦江县"],
                    1672: ["义乌市"],
                    1673: ["东阳市"],
                    1674: ["永康市"],
                    1675: ["武义县"],
                    1676: ["兰溪市"],
                    1677: ["磐安县"],
                    41376: ["婺城区"],
                    41377: ["金东区"]
                }],
                1614: ["衢州市", 0, {
                    1616: ["江山市"],
                    1617: ["常山县"],
                    1618: ["开化县"],
                    1619: ["龙游县"],
                    41378: ["柯城区"],
                    41379: ["衢江区"]
                }],
                1644: ["舟山市", 0, {1645: ["岱山县"], 1646: ["嵊泗县"], 1678: ["定海区"], 41380: ["普陀区"]}],
                1681: ["台州市", 0, {
                    1608: ["临海市"],
                    1648: ["三门县"],
                    1649: ["黄岩区"],
                    1650: ["温岭市"],
                    1651: ["玉环县"],
                    1652: ["仙居县"],
                    1653: ["天台县"],
                    1654: ["椒江区"],
                    41381: ["路桥区"]
                }]
            }],
            17: ["江西", 0, {
                1700: ["南昌市", 0, {
                    1701: ["南昌县"],
                    1704: ["新建县"],
                    1705: ["进贤县"],
                    1706: ["安义县"],
                    41458: ["东湖区"],
                    41459: ["西湖区"],
                    41460: ["青云谱区"],
                    41461: ["湾里区"],
                    41462: ["青山湖区"]
                }],
                1703: ["新余市", 0, {1702: ["分宜县"], 41472: ["渝水区"]}],
                1707: ["九江市", 0, {
                    1708: ["湖口县"],
                    1709: ["星子县"],
                    1710: ["修水县"],
                    1711: ["瑞昌市"],
                    1712: ["德安县"],
                    1713: ["彭泽县"],
                    1714: ["永修县"],
                    1715: ["庐山区"],
                    1716: ["都昌县"],
                    1717: ["武宁县"],
                    41470: ["浔阳区"],
                    41471: ["九江县"],
                    42291: ["共青城市"]
                }],
                1719: ["上饶市", 0, {
                    1718: ["上饶县"],
                    1720: ["广丰县"],
                    1735: ["婺源县"],
                    1736: ["德兴市"],
                    1737: ["鄱阳县"],
                    1738: ["弋阳县"],
                    1739: ["玉山县"],
                    1785: ["万年县"],
                    1786: ["余干县"],
                    1787: ["横峰县"],
                    41478: ["信州区"],
                    41479: ["铅山县"]
                }],
                1722: ["宜春市", 0, {
                    1750: ["宜丰县"],
                    1751: ["上高县"],
                    1752: ["樟树市"],
                    1753: ["奉新县"],
                    1754: ["靖安县"],
                    1755: ["高安市"],
                    1756: ["万载县"],
                    1757: ["丰城市"],
                    1758: ["铜鼓县"],
                    41477: ["袁州区"]
                }],
                1723: ["吉安市", 0, {
                    1724: ["吉安县"],
                    1729: ["新干县"],
                    1759: ["井冈山市"],
                    1760: ["吉水县"],
                    1761: ["泰和县"],
                    1762: ["安福县"],
                    1763: ["永新县"],
                    1765: ["万安县"],
                    1766: ["永丰县"],
                    1767: ["峡江县"],
                    1768: ["遂川县"],
                    41475: ["吉州区"],
                    41476: ["青原区"]
                }],
                1726: ["赣州市", 0, {
                    1725: ["赣县"],
                    1769: ["于都县"],
                    1770: ["兴国县"],
                    1771: ["宁都县"],
                    1772: ["石城县"],
                    1773: ["瑞金市"],
                    1774: ["会昌县"],
                    1775: ["大余县"],
                    1776: ["上犹县"],
                    1777: ["崇义县"],
                    1778: ["信丰县"],
                    1779: ["龙南县"],
                    1780: ["定南县"],
                    1781: ["全南县"],
                    1782: ["安远县"],
                    1783: ["寻乌县"],
                    1784: ["南康市"],
                    41474: ["章贡区"]
                }],
                1727: ["景德镇市", 0, {1734: ["乐平市"], 41463: ["昌江区"], 41464: ["珠山区"], 41465: ["浮梁县"]}],
                1728: ["萍乡市", 0, {1764: ["莲花县"], 41466: ["安源区"], 41467: ["湘东区"], 41468: ["上栗县"], 41469: ["芦溪县"]}],
                1731: ["鹰潭市", 0, {1732: ["贵溪市"], 1733: ["余江县"], 41473: ["月湖区"]}],
                1788: ["抚州市", 0, {
                    1721: ["临川区"],
                    1740: ["资溪县"],
                    1741: ["广昌县"],
                    1742: ["东乡县"],
                    1743: ["金溪县"],
                    1744: ["崇仁县"],
                    1745: ["宜黄县"],
                    1746: ["乐安县"],
                    1747: ["南城县"],
                    1748: ["南丰县"],
                    1749: ["黎川县"]
                }]
            }],
            18: ["湖北", 0, {
                1800: ["武汉市", 0, {
                    1802: ["汉阳区"],
                    1803: ["黄陂区"],
                    1804: ["新洲区"],
                    41586: ["江岸区"],
                    41587: ["江汉区"],
                    41588: ["硚口区"],
                    41589: ["武昌区"],
                    41590: ["青山区"],
                    41591: ["洪山区"],
                    41592: ["东西湖区"],
                    41593: ["汉南区"],
                    41594: ["蔡甸区"],
                    41595: ["江夏区"]
                }],
                1805: ["襄阳市", 0, {
                    1806: ["襄州区"],
                    1820: ["枣阳市"],
                    1822: ["宜城市"],
                    1824: ["保康县"],
                    1825: ["谷城县"],
                    1826: ["老河口市"],
                    41608: ["襄城区"],
                    41609: ["樊城区"],
                    41610: ["南漳县"]
                }],
                1807: ["鄂州市", 0, {41611: ["梁子湖区"], 41612: ["华容区"], 41613: ["鄂城区"]}],
                1808: ["孝感市", 0, {
                    1829: ["大悟县"],
                    1830: ["汉川市"],
                    1831: ["应城市"],
                    1832: ["云梦县"],
                    1833: ["安陆市"],
                    41617: ["孝南区"],
                    41618: ["孝昌县"]
                }],
                1809: ["黄冈市", 0, {
                    1835: ["麻城市"],
                    1836: ["红安县"],
                    1837: ["浠水县"],
                    1838: ["罗田县"],
                    1839: ["英山县"],
                    1841: ["黄梅县"],
                    1842: ["武穴市"],
                    41620: ["黄州区"],
                    41621: ["团风县"],
                    41622: ["蕲春县"]
                }],
                1811: ["黄石市", 0, {
                    1810: ["大冶市"],
                    1843: ["阳新县"],
                    41596: ["黄石港区"],
                    41597: ["西塞山区"],
                    41598: ["下陆区"],
                    41599: ["铁山区"]
                }],
                1812: ["咸宁市", 0, {
                    1844: ["通山县"],
                    1845: ["崇阳县"],
                    1846: ["通城县"],
                    1848: ["嘉鱼县"],
                    41623: ["咸安区"],
                    41624: ["赤壁市"]
                }],
                1815: ["宜昌市", 0, {
                    1857: ["远安县"],
                    1858: ["当阳市"],
                    1859: ["枝江市"],
                    1860: ["宜都市"],
                    1861: ["长阳土家族自治县"],
                    1862: ["五峰土家族自治县"],
                    1864: ["兴山县"],
                    41602: ["西陵区"],
                    41603: ["伍家岗区"],
                    41604: ["点军区"],
                    41605: ["猇亭区"],
                    41606: ["夷陵区"],
                    41607: ["秭归县"]
                }],
                1818: ["十堰市", 0, {
                    1872: ["郧县"],
                    1873: ["丹江口市"],
                    1874: ["房县"],
                    1876: ["竹山县"],
                    1877: ["竹溪县"],
                    1878: ["郧西县"],
                    41600: ["茅箭区"],
                    41601: ["张湾区"]
                }],
                1819: ["荆门市", 0, {1855: ["钟祥市"], 1856: ["京山县"], 41614: ["东宝区"], 41615: ["掇刀区"], 41616: ["沙洋县"]}],
                1821: ["随州市", 0, {1834: ["广水市"], 41625: ["曾都区"], 42292: ["随县"]}],
                1828: ["仙桃市"],
                1849: ["天门市"],
                1850: ["潜江市"],
                1875: ["神农架林区"],
                1879: ["荆州市", 0, {
                    1813: ["江陵县"],
                    1814: ["沙市区"],
                    1827: ["洪湖市"],
                    1851: ["监利县"],
                    1852: ["石首市"],
                    1853: ["公安县"],
                    1854: ["松滋市"],
                    41619: ["荆州区"]
                }],
                41626: ["恩施土家族苗族自治州", 0, {
                    1817: ["恩施市"],
                    1865: ["建始县"],
                    1866: ["巴东县"],
                    1867: ["鹤峰县"],
                    1868: ["宣恩县"],
                    1869: ["来凤县"],
                    1870: ["咸丰县"],
                    1871: ["利川市"]
                }]
            }],
            19: ["湖南", 0, {
                1900: ["长沙市", 0, {
                    1901: ["长沙县"],
                    1905: ["望城县"],
                    1906: ["宁乡县"],
                    1907: ["浏阳市"],
                    41627: ["芙蓉区"],
                    41628: ["天心区"],
                    41629: ["岳麓区"],
                    41630: ["开福区"],
                    41631: ["雨花区"]
                }],
                1902: ["岳阳市", 0, {
                    1903: ["岳阳县"],
                    1904: ["临湘市"],
                    1930: ["湘阴县"],
                    1931: ["华容县"],
                    1932: ["平江县"],
                    1933: ["汨罗市"],
                    41650: ["岳阳楼区"],
                    41651: ["云溪区"],
                    41652: ["君山区"]
                }],
                1908: ["湘潭市", 0, {1909: ["韶山市"], 1910: ["湘乡市"], 41638: ["雨湖区"], 41639: ["岳塘区"], 41640: ["湘潭县"]}],
                1911: ["株洲市", 0, {
                    1912: ["株洲县"],
                    1955: ["茶陵县"],
                    1957: ["醴陵市"],
                    41632: ["荷塘区"],
                    41633: ["芦淞区"],
                    41634: ["石峰区"],
                    41635: ["天元区"],
                    41636: ["攸县"],
                    41637: ["炎陵县"]
                }],
                1913: ["衡阳市", 0, {
                    1914: ["衡阳县"],
                    1915: ["衡南县"],
                    1958: ["耒阳市"],
                    1959: ["常宁市"],
                    1960: ["衡东县"],
                    1961: ["衡山县"],
                    1962: ["祁东县"],
                    41641: ["珠晖区"],
                    41642: ["雁峰区"],
                    41643: ["石鼓区"],
                    41644: ["蒸湘区"],
                    41645: ["南岳区"]
                }],
                1916: ["郴州市", 0, {
                    1963: ["资兴市"],
                    1964: ["桂东县"],
                    1965: ["汝城县"],
                    1966: ["临武县"],
                    1967: ["嘉禾县"],
                    1968: ["安仁县"],
                    1969: ["桂阳县"],
                    1970: ["永兴县"],
                    1971: ["宜章县"],
                    41660: ["北湖区"],
                    41661: ["苏仙区"]
                }],
                1918: ["常德市", 0, {
                    1917: ["桃源县"],
                    1919: ["汉寿县"],
                    1972: ["石门县"],
                    1973: ["澧县"],
                    1974: ["津市市"],
                    1975: ["安乡县"],
                    1976: ["临澧县"],
                    41653: ["武陵区"],
                    41654: ["鼎城区"]
                }],
                1920: ["益阳市", 0, {
                    1921: ["桃江县"],
                    1977: ["安化县"],
                    1978: ["南县"],
                    41657: ["资阳区"],
                    41658: ["赫山区"],
                    41659: ["沅江市"]
                }],
                1922: ["娄底市", 0, {1979: ["双峰县"], 1980: ["冷水江市"], 1981: ["新化县"], 1982: ["涟源市"], 41665: ["娄星区"]}],
                1925: ["邵阳市", 0, {
                    1923: ["邵东县"],
                    1924: ["新邵县"],
                    1926: ["邵阳县"],
                    1994: ["新宁县"],
                    1995: ["城步苗族自治县"],
                    1996: ["绥宁县"],
                    1998: ["洞口县"],
                    1999: ["隆回县"],
                    41646: ["双清区"],
                    41647: ["大祥区"],
                    41648: ["北塔区"],
                    41649: ["武冈市"]
                }],
                1927: ["永州市", 0, {
                    1934: ["冷水滩区"],
                    1935: ["东安县"],
                    1936: ["祁阳县"],
                    1937: ["新田县"],
                    1938: ["宁远县"],
                    1939: ["蓝山县"],
                    1940: ["江华瑶族自治县"],
                    1941: ["江永县"],
                    1942: ["道县"],
                    1943: ["双牌县"],
                    41662: ["零陵区"]
                }],
                1928: ["怀化市", 0, {
                    1929: ["麻阳苗族自治县"],
                    1944: ["芷江侗族自治县"],
                    1946: ["溆浦县"],
                    1947: ["通道侗族自治县"],
                    1948: ["靖州苗族侗族自治县"],
                    1949: ["会同县"],
                    1950: ["新晃侗族自治县"],
                    1951: ["辰溪县"],
                    1952: ["沅陵县"],
                    1953: ["洪江市"],
                    41663: ["鹤城区"],
                    41664: ["中方县"]
                }],
                19100: ["张家界市", 0, {1985: ["桑植县"], 1993: ["慈利县"], 41655: ["永定区"], 41656: ["武陵源区"]}],
                41666: ["湘西土家族苗族自治州", 0, {
                    1983: ["凤凰县"],
                    1984: ["吉首市"],
                    1987: ["龙山县"],
                    1988: ["永顺县"],
                    1989: ["保靖县"],
                    1990: ["花垣县"],
                    1991: ["古丈县"],
                    1992: ["泸溪县"]
                }]
            }],
            20: ["贵州", 0, {
                2e3: ["贵阳市", 0, {
                    2022: ["清镇市"],
                    2023: ["修文县"],
                    2025: ["开阳县"],
                    41918: ["南明区"],
                    41919: ["云岩区"],
                    41920: ["花溪区"],
                    41921: ["乌当区"],
                    41922: ["白云区"],
                    41923: ["小河区"],
                    41924: ["息烽县"]
                }],
                2001: ["遵义市", 0, {
                    2010: ["赤水市"],
                    2011: ["习水县"],
                    2012: ["仁怀市"],
                    2013: ["遵义县"],
                    2014: ["绥阳县"],
                    2015: ["湄潭县"],
                    2016: ["凤冈县"],
                    2017: ["务川仡佬族苗族自治县"],
                    2056: ["余庆县"],
                    41927: ["红花岗区"],
                    41928: ["汇川区"],
                    41929: ["桐梓县"],
                    41930: ["正安县"],
                    41931: ["道真仡佬族苗族自治县"]
                }],
                2002: ["安顺市", 0, {
                    2018: ["平坝县"],
                    2019: ["紫云苗族布依族自治县"],
                    2020: ["镇宁布依族苗族自治县"],
                    2021: ["普定县"],
                    41932: ["西秀区"],
                    41933: ["关岭布依族苗族自治县"]
                }],
                2007: ["六盘水市", 0, {2051: ["六枝特区"], 2052: ["盘县"], 41925: ["钟山区"], 41926: ["水城县"]}],
                41934: ["铜仁市", 0, {
                    2041: ["玉屏侗族自治县"],
                    2042: ["石阡县"],
                    41935: ["江口县"],
                    41936: ["思南县"],
                    41937: ["印江土家族苗族自治县"],
                    41938: ["德江县"],
                    41939: ["沿河土家族自治县"],
                    41940: ["松桃苗族自治县"],
                    41941: ["万山特区"],
                    42294: ["碧江区"]
                }],
                41942: ["黔西南布依族苗族自治州", 0, {
                    2008: ["兴义市"],
                    41943: ["兴仁县"],
                    41944: ["普安县"],
                    41945: ["晴隆县"],
                    41946: ["贞丰县"],
                    41947: ["望谟县"],
                    41948: ["册亨县"],
                    41949: ["安龙县"]
                }],
                41950: ["毕节市", 0, {
                    2043: ["威宁彝族回族苗族自治县"],
                    2044: ["赫章县"],
                    2045: ["纳雍县"],
                    2046: ["黔西县"],
                    2047: ["大方县"],
                    2048: ["金沙县"],
                    2049: ["织金县"],
                    42293: ["七星关区"]
                }],
                41951: ["黔东南苗族侗族自治州", 0, {
                    2004: ["凯里市"],
                    2034: ["黄平县"],
                    2035: ["施秉县"],
                    2036: ["镇远县"],
                    2037: ["天柱县"],
                    2038: ["锦屏县"],
                    2039: ["黎平县"],
                    2040: ["从江县"],
                    2050: ["剑河县"],
                    2053: ["雷山县"],
                    2054: ["台江县"],
                    41952: ["三穗县"],
                    41953: ["岑巩县"],
                    41954: ["榕江县"],
                    41955: ["麻江县"],
                    41956: ["丹寨县"]
                }],
                41957: ["黔南布依族苗族自治州", 0, {
                    2003: ["都匀市"],
                    2026: ["贵定县"],
                    2027: ["福泉市"],
                    2028: ["瓮安县"],
                    2029: ["三都水族自治县"],
                    2030: ["独山县"],
                    2031: ["平塘县"],
                    2032: ["惠水县"],
                    2033: ["龙里县"],
                    41958: ["荔波县"],
                    41959: ["罗甸县"],
                    41960: ["长顺县"]
                }]
            }],
            21: ["四川", 0, {
                2100: ["成都市", 0, {
                    2108: ["温江区"],
                    2128: ["金堂县"],
                    2129: ["双流县"],
                    2135: ["新津县"],
                    2145: ["蒲江县"],
                    2146: ["郫县"],
                    2147: ["新都区"],
                    2149: ["都江堰市"],
                    2151: ["大邑县"],
                    2152: ["邛崃市"],
                    41815: ["锦江区"],
                    41816: ["青羊区"],
                    41817: ["金牛区"],
                    41818: ["武侯区"],
                    41819: ["成华区"],
                    41820: ["龙泉驿区"],
                    41821: ["青白江区"],
                    41822: ["彭州市"],
                    41823: ["崇州市"]
                }],
                2105: ["攀枝花市", 0, {2143: ["米易县"], 2144: ["盐边县"], 41829: ["东区"], 41830: ["西区"], 41831: ["仁和区"]}],
                2106: ["自贡市", 0, {
                    2130: ["荣县"],
                    41824: ["自流井区"],
                    41825: ["贡井区"],
                    41826: ["大安区"],
                    41827: ["沿滩区"],
                    41828: ["富顺县"]
                }],
                2109: ["绵阳市", 0, {
                    2153: ["平武县"],
                    2155: ["安县"],
                    2156: ["江油市"],
                    2157: ["梓潼县"],
                    2165: ["三台县"],
                    2168: ["盐亭县"],
                    41841: ["涪城区"],
                    41842: ["游仙区"],
                    41843: ["北川羌族自治县"]
                }],
                2110: ["南充市", 0, {
                    2162: ["西充县"],
                    2170: ["南部县"],
                    2171: ["阆中市"],
                    2173: ["营山县"],
                    2174: ["蓬安县"],
                    2175: ["仪陇县"],
                    41859: ["顺庆区"],
                    41860: ["高坪区"],
                    41861: ["嘉陵区"]
                }],
                2111: ["达州市", 0, {
                    2180: ["宣汉县"],
                    2181: ["开江县"],
                    2182: ["万源市"],
                    2183: ["大竹县"],
                    2184: ["渠县"],
                    21116: ["达县"],
                    41873: ["通川区"]
                }],
                2114: ["泸州市", 0, {
                    41832: ["江阳区"],
                    41833: ["纳溪区"],
                    41834: ["龙马潭区"],
                    41835: ["泸县"],
                    41836: ["合江县"],
                    41837: ["叙永县"],
                    41838: ["古蔺县"]
                }],
                2115: ["宜宾市", 0, {
                    2116: ["宜宾县"],
                    41863: ["翠屏区"],
                    41864: ["南溪县"],
                    41865: ["江安县"],
                    41866: ["长宁县"],
                    41867: ["高县"],
                    41868: ["珙县"],
                    41869: ["筠连县"],
                    41870: ["兴文县"],
                    41871: ["屏山县"]
                }],
                2117: ["内江市", 0, {41850: ["市中区"], 41851: ["东兴区"], 41852: ["威远县"], 41853: ["资中县"], 41854: ["隆昌县"]}],
                2118: ["乐山市", 0, {
                    2188: ["峨眉山市"],
                    2190: ["井研县"],
                    2193: ["沐川县"],
                    2197: ["马边彝族自治县"],
                    2198: ["犍为县"],
                    21100: ["夹江县"],
                    21101: ["金口河区"],
                    41855: ["市中区"],
                    41856: ["沙湾区"],
                    41857: ["五通桥区"],
                    41858: ["峨边彝族自治县"]
                }],
                2120: ["雅安市", 0, {
                    2192: ["宝兴县"],
                    2199: ["石棉县"],
                    21108: ["名山县"],
                    21109: ["荥经县"],
                    21110: ["汉源县"],
                    21111: ["天全县"],
                    21112: ["芦山县"],
                    41874: ["雨城区"]
                }],
                2122: ["德阳市", 0, {
                    2123: ["中江县"],
                    2124: ["绵竹市"],
                    2125: ["广汉市"],
                    2126: ["什邡市"],
                    41839: ["旌阳区"],
                    41840: ["罗江县"]
                }],
                2127: ["广元市", 0, {
                    2158: ["剑阁县"],
                    2160: ["旺苍县"],
                    2161: ["青川县"],
                    2172: ["苍溪县"],
                    41844: ["利州区"],
                    41845: ["元坝区"],
                    41846: ["朝天区"]
                }],
                2163: ["遂宁市", 0, {2166: ["蓬溪县"], 2167: ["射洪县"], 41847: ["船山区"], 41848: ["安居区"], 41849: ["大英县"]}],
                2178: ["广安市", 0, {2169: ["华蓥市"], 2176: ["岳池县"], 2177: ["武胜县"], 2185: ["邻水县"], 41872: ["广安区"]}],
                2187: ["眉山市", 0, {
                    2189: ["仁寿县"],
                    2191: ["洪雅县"],
                    2194: ["彭山县"],
                    2195: ["青神县"],
                    2196: ["丹棱县"],
                    41862: ["东坡区"]
                }],
                21115: ["巴中市", 0, {2179: ["平昌县"], 21114: ["通江县"], 41875: ["巴州区"], 41876: ["南江县"]}],
                21119: ["资阳市", 0, {2186: ["乐至县"], 41877: ["雁江区"], 41878: ["安岳县"], 41879: ["简阳市"]}],
                41880: ["阿坝藏族羌族自治州", 0, {
                    2121: ["马尔康县"],
                    21113: ["汶川县"],
                    21117: ["九寨沟县"],
                    41881: ["理县"],
                    41882: ["茂县"],
                    41883: ["松潘县"],
                    41884: ["金川县"],
                    41885: ["小金县"],
                    41886: ["黑水县"],
                    41887: ["壤塘县"],
                    41888: ["阿坝县"],
                    41889: ["若尔盖县"],
                    41890: ["红原县"]
                }],
                41891: ["甘孜藏族自治州", 0, {
                    21118: ["康定县"],
                    41892: ["泸定县"],
                    41893: ["丹巴县"],
                    41894: ["九龙县"],
                    41895: ["雅江县"],
                    41896: ["道孚县"],
                    41897: ["炉霍县"],
                    41898: ["甘孜县"],
                    41899: ["新龙县"],
                    41900: ["德格县"],
                    41901: ["白玉县"],
                    41902: ["石渠县"],
                    41903: ["色达县"],
                    41904: ["理塘县"],
                    41905: ["巴塘县"],
                    41906: ["乡城县"],
                    41907: ["稻城县"],
                    41908: ["得荣县"]
                }],
                41909: ["凉山彝族自治州", 0, {
                    2119: ["西昌市"],
                    2154: ["宁南县"],
                    2159: ["盐源县"],
                    21102: ["会理县"],
                    21103: ["会东县"],
                    21104: ["冕宁县"],
                    21105: ["德昌县"],
                    21106: ["雷波县"],
                    21107: ["普格县"],
                    41910: ["木里藏族自治县"],
                    41911: ["布拖县"],
                    41912: ["金阳县"],
                    41913: ["昭觉县"],
                    41914: ["喜德县"],
                    41915: ["越西县"],
                    41916: ["甘洛县"],
                    41917: ["美姑县"]
                }]
            }],
            22: ["云南", 0, {
                2200: ["昆明市", 0, {
                    2202: ["禄劝彝族苗族自治县"],
                    2204: ["晋宁县"],
                    2205: ["呈贡县"],
                    2206: ["富民县"],
                    2207: ["嵩明县"],
                    2208: ["安宁市"],
                    2209: ["宜良县"],
                    2248: ["寻甸回族彝族自治县"],
                    2249: ["东川区"],
                    41961: ["五华区"],
                    41962: ["盘龙区"],
                    41963: ["官渡区"],
                    41964: ["西山区"],
                    41965: ["石林彝族自治县"]
                }],
                2201: ["昭通市", 0, {
                    2250: ["盐津县"],
                    2251: ["绥江县"],
                    2252: ["水富县"],
                    2253: ["镇雄县"],
                    2254: ["鲁甸县"],
                    2255: ["大关县"],
                    2256: ["巧家县"],
                    2257: ["彝良县"],
                    22112: ["永善县"],
                    22113: ["威信县"],
                    41970: ["昭阳区"]
                }],
                2217: ["曲靖市", 0, {
                    2214: ["马龙县"],
                    2215: ["师宗县"],
                    2216: ["富源县"],
                    2258: ["陆良县"],
                    2259: ["罗平县"],
                    2260: ["宣威市"],
                    2261: ["会泽县"],
                    41966: ["麒麟区"],
                    41967: ["沾益县"]
                }],
                2218: ["保山市", 0, {2219: ["昌宁县"], 22103: ["腾冲县"], 22104: ["龙陵县"], 22105: ["施甸县"], 41969: ["隆阳区"]}],
                2228: ["玉溪市", 0, {
                    2221: ["江川县"],
                    2222: ["元江哈尼族彝族傣族自治县"],
                    2223: ["通海县"],
                    2224: ["易门县"],
                    2225: ["澄江县"],
                    2226: ["峨山彝族自治县"],
                    2227: ["华宁县"],
                    2229: ["新平彝族傣族自治县"],
                    41968: ["红塔区"]
                }],
                2234: ["普洱市", 0, {
                    2235: ["镇沅彝族哈尼族拉祜族自治县"],
                    2241: ["墨江哈尼族自治县"],
                    2264: ["澜沧拉祜族自治县"],
                    2265: ["景谷傣族彝族自治县"],
                    2266: ["江城哈尼族彝族自治县"],
                    2267: ["景东彝族自治县"],
                    2268: ["西盟佤族自治县"],
                    2269: ["孟连傣族拉祜族佤族自治县"],
                    2270: ["普洱哈尼族彝族自治县"],
                    41973: ["思茅区"]
                }],
                2243: ["临沧市", 0, {
                    2236: ["镇康县"],
                    2237: ["永德县"],
                    2240: ["耿马傣族佤族自治县"],
                    2244: ["沧源佤族自治县"],
                    2245: ["凤庆县"],
                    2246: ["云县"],
                    2247: ["双江拉祜族佤族布朗族傣族自治县"],
                    41974: ["临翔区"]
                }],
                22115: ["丽江市", 0, {
                    22116: ["宁蒗彝族自治县"],
                    22117: ["华坪县"],
                    22118: ["永胜县"],
                    41971: ["古城区"],
                    41972: ["玉龙纳西族自治县"]
                }],
                22124: ["西双版纳傣族自治州", 0, {2263: ["勐海县"], 2271: ["景洪市"], 2272: ["勐腊县"]}],
                41975: ["楚雄彝族自治州", 0, {
                    2231: ["楚雄市"],
                    2232: ["姚安县"],
                    2233: ["双柏县"],
                    2288: ["永仁县"],
                    2289: ["禄丰县"],
                    2290: ["大姚县"],
                    2291: ["南华县"],
                    2292: ["牟定县"],
                    2293: ["武定县"],
                    2294: ["元谋县"]
                }],
                41976: ["红河哈尼族彝族自治州", 0, {
                    2213: ["个旧市"],
                    2273: ["元阳县"],
                    2274: ["石屏县"],
                    2275: ["弥勒县"],
                    2276: ["红河县"],
                    2277: ["开远市"],
                    2278: ["蒙自县"],
                    2279: ["建水县"],
                    2280: ["河口瑶族自治县"],
                    2281: ["泸西县"],
                    2282: ["屏边苗族自治县"],
                    22120: ["金平苗族瑶族傣族自治县"],
                    22123: ["绿春县"]
                }],
                41977: ["文山壮族苗族自治州", 0, {
                    2220: ["文山县"],
                    2242: ["麻栗坡县"],
                    2262: ["砚山县"],
                    2284: ["广南县"],
                    2285: ["富宁县"],
                    2286: ["马关县"],
                    2287: ["西畴县"],
                    41978: ["丘北县"]
                }],
                41979: ["大理白族自治州", 0, {
                    2210: ["宾川县"],
                    2211: ["弥渡县"],
                    2212: ["大理市"],
                    2295: ["南涧彝族自治县"],
                    2296: ["剑川县"],
                    2297: ["鹤庆县"],
                    2298: ["祥云县"],
                    2299: ["漾濞彝族自治县"],
                    22100: ["洱源县"],
                    22101: ["永平县"],
                    22102: ["巍山彝族回族自治县"],
                    22114: ["云龙县"]
                }],
                41980: ["德宏傣族景颇族自治州", 0, {
                    22106: ["梁河县"],
                    22107: ["盈江县"],
                    22109: ["瑞丽市"],
                    22110: ["陇川县"],
                    22111: ["潞西市"]
                }],
                41981: ["怒江傈僳族自治州", 0, {2238: ["福贡县"], 2239: ["兰坪白族普米族自治县"], 22121: ["泸水县"], 41982: ["贡山独龙族怒族自治县"]}],
                41983: ["迪庆藏族自治州", 0, {41984: ["香格里拉县"], 41985: ["德钦县"], 41986: ["维西傈僳族自治县"]}]
            }],
            23: ["新疆", 1, {
                2300: ["乌鲁木齐市", 0, {
                    42137: ["天山区"],
                    42138: ["沙依巴克区"],
                    42139: ["新市区"],
                    42140: ["水磨沟区"],
                    42141: ["头屯河区"],
                    42142: ["达坂城区"],
                    42144: ["乌鲁木齐县"],
                    42250: ["米东区"]
                }],
                2301: ["克拉玛依市", 0, {42145: ["独山子区"], 42146: ["克拉玛依区"], 42147: ["白碱滩区"], 42148: ["乌尔禾区"]}],
                2302: ["石河子市"],
                42149: ["吐鲁番地区", 0, {2305: ["吐鲁番市"], 42150: ["鄯善县"], 42151: ["托克逊县"]}],
                42152: ["哈密地区", 0, {2304: ["哈密市"], 42153: ["巴里坤哈萨克自治县"], 42154: ["伊吾县"]}],
                42155: ["昌吉回族自治州", 0, {
                    42156: ["昌吉市"],
                    42157: ["阜康市"],
                    42159: ["呼图壁县"],
                    42160: ["玛纳斯县"],
                    42161: ["奇台县"],
                    42162: ["吉木萨尔县"],
                    42163: ["木垒哈萨克自治县"]
                }],
                42164: ["博尔塔拉蒙古自治州", 0, {42165: ["博乐市"], 42166: ["精河县"], 42167: ["温泉县"]}],
                42168: ["巴音郭楞蒙古自治州", 0, {
                    42169: ["库尔勒市"],
                    42170: ["轮台县"],
                    42171: ["尉犁县"],
                    42172: ["若羌县"],
                    42173: ["且末县"],
                    42174: ["焉耆回族自治县"],
                    42175: ["和静县"],
                    42176: ["和硕县"],
                    42177: ["博湖县"]
                }],
                42178: ["阿克苏地区", 0, {
                    42179: ["阿克苏市"],
                    42180: ["温宿县"],
                    42181: ["库车县"],
                    42182: ["沙雅县"],
                    42183: ["新和县"],
                    42184: ["拜城县"],
                    42185: ["乌什县"],
                    42186: ["阿瓦提县"],
                    42187: ["柯坪县"]
                }],
                42188: ["克孜勒苏柯尔克孜自治州", 0, {42189: ["阿图什市"], 42190: ["阿克陶县"], 42191: ["阿合奇县"], 42192: ["乌恰县"]}],
                42193: ["喀什地区", 0, {
                    2303: ["喀什市"],
                    42194: ["疏附县"],
                    42195: ["疏勒县"],
                    42196: ["英吉沙县"],
                    42197: ["泽普县"],
                    42198: ["莎车县"],
                    42199: ["叶城县"],
                    42200: ["麦盖提县"],
                    42201: ["岳普湖县"],
                    42202: ["伽师县"],
                    42203: ["巴楚县"],
                    42204: ["塔什库尔干塔吉克自治县"]
                }],
                42205: ["和田地区", 0, {
                    42206: ["和田市"],
                    42207: ["和田县"],
                    42208: ["墨玉县"],
                    42209: ["皮山县"],
                    42210: ["洛浦县"],
                    42211: ["策勒县"],
                    42212: ["于田县"],
                    42213: ["民丰县"]
                }],
                42214: ["伊犁哈萨克自治州", 0, {
                    2306: ["伊宁市"],
                    42215: ["奎屯市"],
                    42216: ["伊宁县"],
                    42217: ["察布查尔锡伯自治县"],
                    42218: ["霍城县"],
                    42219: ["巩留县"],
                    42220: ["新源县"],
                    42221: ["昭苏县"],
                    42222: ["特克斯县"],
                    42223: ["尼勒克县"]
                }],
                42224: ["塔城地区", 0, {
                    42225: ["塔城市"],
                    42226: ["乌苏市"],
                    42227: ["额敏县"],
                    42228: ["沙湾县"],
                    42229: ["托里县"],
                    42230: ["裕民县"],
                    42231: ["和布克赛尔蒙古自治县"]
                }],
                42232: ["阿勒泰地区", 0, {
                    42233: ["阿勒泰市"],
                    42234: ["布尔津县"],
                    42235: ["富蕴县"],
                    42236: ["福海县"],
                    42237: ["哈巴河县"],
                    42238: ["青河县"],
                    42239: ["吉木乃县"]
                }],
                42240: ["阿拉尔市"],
                42241: ["图木舒克市"],
                42242: ["五家渠市"]
            }],
            24: ["宁夏", 1, {
                2400: ["银川市", 0, {
                    2401: ["贺兰县"],
                    2402: ["永宁县"],
                    2412: ["灵武市"],
                    42123: ["兴庆区"],
                    42124: ["西夏区"],
                    42125: ["金凤区"]
                }],
                2404: ["石嘴山市", 0, {2403: ["平罗县"], 42126: ["大武口区"], 42127: ["惠农区"]}],
                2406: ["吴忠市", 0, {2407: ["青铜峡市"], 2409: ["盐池县"], 42128: ["利通区"], 42129: ["同心县"], 42295: ["红寺堡区"]}],
                2408: ["固原市", 0, {42130: ["原州区"], 42131: ["西吉县"], 42132: ["隆德县"], 42133: ["泾源县"], 42134: ["彭阳县"]}],
                2411: ["中卫市", 0, {2410: ["中宁县"], 42135: ["沙坡头区"], 42136: ["海原县"]}]
            }],
            25: ["青海", 0, {
                2500: ["西宁市", 0, {
                    2501: ["大通回族土族自治县"],
                    2512: ["湟中县"],
                    2514: ["湟源县"],
                    42098: ["城东区"],
                    42099: ["城中区"],
                    42100: ["城西区"],
                    42101: ["城北区"]
                }],
                2528: ["海东地区", 0, {
                    2502: ["平安县"],
                    2511: ["乐都县"],
                    2513: ["互助土族自治县"],
                    2515: ["民和回族土族自治县"],
                    2516: ["循化撒拉族自治县"],
                    2517: ["化隆回族自治县"]
                }],
                42102: ["海北藏族自治州", 0, {2508: ["门源回族自治县"], 2529: ["海晏县"], 42103: ["祁连县"], 42104: ["刚察县"]}],
                42105: ["黄南藏族自治州", 0, {2503: ["同仁县"], 2510: ["河南蒙古族自治县"], 2518: ["尖扎县"], 2519: ["泽库县"]}],
                42106: ["海南藏族自治州", 0, {2504: ["共和县"], 2526: ["贵德县"], 42107: ["同德县"], 42108: ["兴海县"], 42109: ["贵南县"]}],
                42110: ["果洛藏族自治州", 0, {
                    2505: ["玛沁县"],
                    42111: ["班玛县"],
                    42112: ["甘德县"],
                    42113: ["达日县"],
                    42114: ["久治县"],
                    42115: ["玛多县"]
                }],
                42116: ["玉树藏族自治州", 0, {
                    2506: ["玉树县"],
                    42117: ["杂多县"],
                    42118: ["称多县"],
                    42119: ["治多县"],
                    42120: ["囊谦县"],
                    42121: ["曲麻莱县"]
                }],
                42122: ["海西蒙古族藏族自治州", 0, {2507: ["德令哈市"], 2509: ["格尔木市"], 2521: ["乌兰县"], 2522: ["都兰县"], 2523: ["天峻县"]}]
            }],
            26: ["西藏", 1, {
                2600: ["拉萨市", 0, {
                    41987: ["城关区"],
                    41988: ["林周县"],
                    41989: ["当雄县"],
                    41990: ["尼木县"],
                    41991: ["曲水县"],
                    41992: ["堆龙德庆县"],
                    41993: ["达孜县"],
                    41994: ["墨竹工卡县"]
                }],
                2602: ["山南", 0, {
                    42001: ["乃东县"],
                    42002: ["扎囊县"],
                    42003: ["贡嘎县"],
                    42004: ["桑日县"],
                    42005: ["琼结县"],
                    42006: ["曲松县"],
                    42007: ["措美县"],
                    42008: ["洛扎县"],
                    42009: ["加查县"],
                    42010: ["隆子县"],
                    42011: ["错那县"],
                    42012: ["浪卡子县"]
                }],
                2615: ["阿里地区", 0, {
                    2614: ["措勤县"],
                    42037: ["普兰县"],
                    42038: ["札达县"],
                    42039: ["噶尔县"],
                    42040: ["日土县"],
                    42041: ["革吉县"],
                    42042: ["改则县"]
                }],
                41995: ["昌都地区", 0, {
                    2604: ["昌都县"],
                    2605: ["江达县"],
                    2606: ["芒康县"],
                    2607: ["八宿县"],
                    2608: ["洛隆县"],
                    2609: ["丁青县"],
                    41996: ["贡觉县"],
                    41997: ["类乌齐县"],
                    41998: ["察雅县"],
                    41999: ["左贡县"],
                    42e3: ["边坝县"]
                }],
                42013: ["日喀则地区", 0, {
                    2601: ["日喀则市"],
                    42014: ["南木林县"],
                    42015: ["江孜县"],
                    42016: ["定日县"],
                    42017: ["萨迦县"],
                    42018: ["拉孜县"],
                    42019: ["昂仁县"],
                    42020: ["谢通门县"],
                    42021: ["白朗县"],
                    42022: ["仁布县"],
                    42023: ["康马县"],
                    42024: ["定结县"],
                    42025: ["仲巴县"],
                    42026: ["亚东县"],
                    42027: ["吉隆县"],
                    42028: ["聂拉木县"],
                    42029: ["萨嘎县"],
                    42030: ["岗巴县"]
                }],
                42031: ["那曲地区", 0, {
                    2610: ["巴青县"],
                    2611: ["比如县"],
                    2612: ["那曲县"],
                    2613: ["班戈县"],
                    2616: ["索县"],
                    42032: ["嘉黎县"],
                    42033: ["聂荣县"],
                    42034: ["安多县"],
                    42035: ["申扎县"],
                    42036: ["尼玛县"]
                }],
                42043: ["林芝地区", 0, {
                    2603: ["林芝县"],
                    42044: ["工布江达县"],
                    42045: ["米林县"],
                    42046: ["墨脱县"],
                    42047: ["波密县"],
                    42048: ["察隅县"],
                    42049: ["朗县"]
                }]
            }],
            27: ["广西", 1, {
                2700: ["南宁市", 0, {
                    2702: ["武鸣县"],
                    2703: ["宾阳县"],
                    2704: ["横县"],
                    2706: ["邕宁区"],
                    2748: ["上林县"],
                    2752: ["马山县"],
                    2756: ["隆安县"],
                    41736: ["兴宁区"],
                    41737: ["青秀区"],
                    41738: ["江南区"],
                    41739: ["西乡塘区"],
                    41740: ["良庆区"]
                }],
                2701: ["防城港市", 0, {2787: ["上思县"], 2788: ["防城区"], 41757: ["港口区"], 41758: ["东兴市"]}],
                2712: ["柳州市", 0, {
                    2707: ["融安县"],
                    2708: ["三江侗族自治县"],
                    2709: ["柳城县"],
                    2710: ["融水苗族自治县"],
                    2713: ["鹿寨县"],
                    2714: ["柳江县"],
                    41741: ["城中区"],
                    41742: ["鱼峰区"],
                    41743: ["柳南区"],
                    41744: ["柳北区"]
                }],
                2722: ["桂林市", 0, {
                    2716: ["平乐县"],
                    2717: ["永福县"],
                    2718: ["恭城瑶族自治县"],
                    2719: ["阳朔县"],
                    2720: ["临桂县"],
                    2721: ["灵川县"],
                    2763: ["灌阳县"],
                    2764: ["兴安县"],
                    2765: ["全州县"],
                    2766: ["龙胜各族自治县"],
                    2767: ["资源县"],
                    41745: ["秀峰区"],
                    41746: ["叠彩区"],
                    41747: ["象山区"],
                    41748: ["七星区"],
                    41749: ["雁山区"],
                    41750: ["荔浦县"]
                }],
                2723: ["梧州市", 0, {
                    2724: ["苍梧县"],
                    2725: ["藤县"],
                    2726: ["蒙山县"],
                    2727: ["岑溪市"],
                    41751: ["万秀区"],
                    41752: ["蝶山区"],
                    41753: ["长洲区"]
                }],
                2733: ["玉林市", 0, {
                    2729: ["北流市"],
                    2730: ["陆川县"],
                    2731: ["博白县"],
                    2732: ["容县"],
                    41764: ["玉州区"],
                    41765: ["兴业县"]
                }],
                2734: ["百色市", 0, {
                    2768: ["田阳县"],
                    2769: ["乐业县"],
                    2770: ["靖西县"],
                    2771: ["田东县"],
                    2772: ["平果县"],
                    2773: ["德保县"],
                    2774: ["那坡县"],
                    2775: ["田林县"],
                    2776: ["隆林各族自治县"],
                    2777: ["西林县"],
                    2778: ["凌云县"],
                    41766: ["右江区"]
                }],
                2735: ["钦州市", 0, {2785: ["灵山县"], 2786: ["浦北县"], 41759: ["钦南区"], 41760: ["钦北区"]}],
                2736: ["河池市", 0, {
                    2738: ["罗城仫佬族自治县"],
                    2739: ["南丹县"],
                    2740: ["环江毛南族自治县"],
                    2743: ["都安瑶族自治县"],
                    2744: ["东兰县"],
                    2746: ["天峨县"],
                    2747: ["巴马瑶族自治县"],
                    41768: ["金城江区"],
                    41769: ["凤山县"],
                    41770: ["大化瑶族自治县"],
                    41771: ["宜州市"]
                }],
                2741: ["北海市", 0, {2742: ["合浦县"], 41754: ["海城区"], 41755: ["银海区"], 41756: ["铁山港区"]}],
                2750: ["崇左市", 0, {
                    2749: ["凭祥市"], 2751: ["宁明县"], 2753: ["龙州县"], 2754: ["大新县"],
                    2755: ["天等县"], 2757: ["扶绥县"], 41773: ["江洲区"]
                }],
                2758: ["来宾市", 0, {
                    2711: ["金秀瑶族自治县"],
                    2759: ["忻城县"],
                    2760: ["合山市"],
                    2761: ["武宣县"],
                    2762: ["象州县"],
                    41772: ["兴宾区"]
                }],
                2779: ["贺州市", 0, {2728: ["昭平县"], 2780: ["钟山县"], 2781: ["富川瑶族自治县"], 41767: ["八步区"]}],
                2784: ["贵港市", 0, {2782: ["桂平市"], 2783: ["平南县"], 41761: ["港北区"], 41762: ["港南区"], 41763: ["覃塘区"]}]
            }],
            28: ["广东", 0, {
                2800: ["深圳市", 0, {
                    41678: ["罗湖区"],
                    41679: ["福田区"],
                    41680: ["南山区"],
                    41681: ["宝安区"],
                    41682: ["龙岗区"],
                    41683: ["盐田区"]
                }],
                2801: ["广州市", 0, {
                    2813: ["番禺区"],
                    2815: ["从化市"],
                    2816: ["增城市"],
                    41667: ["荔湾区"],
                    41668: ["越秀区"],
                    41669: ["海珠区"],
                    41670: ["天河区"],
                    41671: ["白云区"],
                    41672: ["黄埔区"],
                    41673: ["花都区"],
                    41674: ["南沙区"],
                    41675: ["萝岗区"]
                }],
                2802: ["珠海市", 0, {2847: ["斗门区"], 41684: ["香洲区"], 41685: ["金湾区"]}],
                2803: ["中山市"],
                2804: ["汕头市", 0, {
                    2845: ["澄海区"],
                    2846: ["南澳县"],
                    2873: ["潮阳区"],
                    41686: ["龙湖区"],
                    41687: ["金平区"],
                    41688: ["濠江区"],
                    41689: ["潮南区"]
                }],
                2805: ["汕尾市", 0, {41708: ["城区"], 41709: ["海丰县"], 41710: ["陆河县"], 41711: ["陆丰市"]}],
                2809: ["茂名市", 0, {
                    41698: ["茂南区"],
                    41699: ["茂港区"],
                    41700: ["电白县"],
                    41701: ["高州市"],
                    41702: ["化州市"],
                    41703: ["信宜市"]
                }],
                2810: ["东莞市"],
                2817: ["江门市", 0, {
                    2818: ["鹤山市"],
                    2819: ["新会区"],
                    2820: ["台山市"],
                    2821: ["开平市"],
                    2822: ["恩平市"],
                    41691: ["蓬江区"],
                    41692: ["江海区"]
                }],
                2823: ["韶关市", 0, {
                    2824: ["乐昌市"],
                    2825: ["仁化县"],
                    2826: ["始兴县"],
                    2827: ["翁源县"],
                    2828: ["南雄市"],
                    2829: ["新丰县"],
                    2830: ["乳源瑶族自治县"],
                    2831: ["曲江区"],
                    41676: ["武江区"],
                    41677: ["浈江区"]
                }],
                2833: ["惠州市", 0, {2832: ["博罗县"], 2834: ["惠阳区"], 2835: ["惠东县"], 2836: ["龙门县"], 41706: ["惠城区"]}],
                2837: ["梅州市", 0, {
                    2838: ["梅县"],
                    2839: ["蕉岭县"],
                    2840: ["大埔县"],
                    2841: ["丰顺县"],
                    2842: ["五华县"],
                    2843: ["兴宁市"],
                    2844: ["平远县"],
                    41707: ["梅江区"]
                }],
                2848: ["佛山市", 0, {2811: ["顺德区"], 2849: ["南海区"], 2850: ["三水区"], 2851: ["高明区"], 41690: ["禅城区"]}],
                2853: ["肇庆市", 0, {
                    2852: ["高要市"],
                    2854: ["封开县"],
                    2855: ["德庆县"],
                    2856: ["怀集县"],
                    2857: ["广宁县"],
                    2858: ["四会市"],
                    41704: ["端州区"],
                    41705: ["鼎湖区"]
                }],
                2859: ["湛江市", 0, {
                    2861: ["遂溪县"],
                    2862: ["廉江市"],
                    2863: ["吴川市"],
                    2864: ["徐闻县"],
                    41693: ["赤坎区"],
                    41694: ["霞山区"],
                    41695: ["坡头区"],
                    41696: ["麻章区"],
                    41697: ["雷州市"]
                }],
                2865: ["河源市", 0, {
                    2806: ["紫金县"],
                    2812: ["龙川县"],
                    2866: ["东源县"],
                    2867: ["连平县"],
                    2868: ["和平县"],
                    41712: ["源城区"]
                }],
                2869: ["潮州市", 0, {41723: ["湘桥区"], 41724: ["潮安县"], 41725: ["饶平县"]}],
                2870: ["阳江市", 0, {41713: ["江城区"], 41714: ["阳西县"], 41715: ["阳东县"], 41716: ["阳春市"]}],
                2871: ["揭阳市", 0, {41726: ["榕城区"], 41727: ["揭东县"], 41728: ["揭西县"], 41729: ["惠来县"], 41730: ["普宁市"]}],
                2872: ["清远市", 0, {
                    2807: ["佛冈县"],
                    2808: ["英德市"],
                    41717: ["清城区"],
                    41718: ["阳山县"],
                    41719: ["连山壮族瑶族自治县"],
                    41720: ["连南瑶族自治县"],
                    41721: ["清新县"],
                    41722: ["连州市"]
                }],
                2874: ["云浮市", 0, {41731: ["云城区"], 41732: ["新兴县"], 41733: ["郁南县"], 41734: ["云安县"], 41735: ["罗定市"]}]
            }],
            29: ["福建", 0, {
                2900: ["福州市", 0, {
                    2903: ["罗源县"],
                    2904: ["连江县"],
                    2905: ["长乐市"],
                    2906: ["福清市"],
                    2907: ["平潭县"],
                    2908: ["永泰县"],
                    2909: ["闽清县"],
                    41430: ["鼓楼区"],
                    41431: ["台江区"],
                    41432: ["仓山区"],
                    41433: ["马尾区"],
                    41434: ["晋安区"],
                    41435: ["闽侯县"]
                }],
                2901: ["厦门市", 0, {
                    2911: ["同安区"],
                    41436: ["思明区"],
                    41437: ["海沧区"],
                    41438: ["湖里区"],
                    41439: ["集美区"],
                    41440: ["翔安区"]
                }],
                2920: ["宁德市", 0, {
                    2912: ["福安市"],
                    2913: ["柘荣县"],
                    2914: ["福鼎市"],
                    2915: ["霞浦县"],
                    2916: ["古田县"],
                    2917: ["屏南县"],
                    2918: ["周宁县"],
                    2919: ["寿宁县"],
                    41457: ["蕉城区"]
                }],
                2921: ["莆田市", 0, {2923: ["仙游县"], 41441: ["城厢区"], 41442: ["涵江区"], 41443: ["荔城区"], 41444: ["秀屿区"]}],
                2924: ["泉州市", 0, {
                    2925: ["石狮市"],
                    2926: ["晋江市"],
                    2927: ["惠安县"],
                    2928: ["南安市"],
                    2929: ["安溪县"],
                    2930: ["永春县"],
                    2931: ["德化县"],
                    41447: ["鲤城区"],
                    41448: ["丰泽区"],
                    41449: ["洛江区"],
                    41450: ["泉港区"],
                    41451: ["金门县"]
                }],
                2932: ["漳州市", 0, {
                    2933: ["长泰县"],
                    2934: ["龙海市"],
                    2935: ["漳浦县"],
                    2936: ["东山县"],
                    2938: ["诏安县"],
                    2939: ["平和县"],
                    2940: ["南靖县"],
                    2941: ["华安县"],
                    41452: ["芗城区"],
                    41453: ["龙文区"],
                    41454: ["云霄县"]
                }],
                2942: ["龙岩市", 0, {
                    2943: ["漳平市"],
                    2944: ["永定县"],
                    2945: ["上杭县"],
                    2946: ["武平县"],
                    2947: ["长汀县"],
                    2948: ["连城县"],
                    41456: ["新罗区"]
                }],
                2949: ["三明市", 0, {
                    2950: ["沙县"],
                    2951: ["尤溪县"],
                    2952: ["大田县"],
                    2953: ["永安市"],
                    2954: ["清流县"],
                    2955: ["宁化县"],
                    2956: ["明溪县"],
                    2957: ["建宁县"],
                    2958: ["泰宁县"],
                    2959: ["将乐县"],
                    41445: ["梅列区"],
                    41446: ["三元区"]
                }],
                2960: ["南平市", 0, {
                    2902: ["建阳市"],
                    2961: ["浦城县"],
                    2962: ["松溪县"],
                    2963: ["政和县"],
                    2964: ["建瓯市"],
                    2965: ["顺昌县"],
                    2966: ["邵武市"],
                    2967: ["光泽县"],
                    2968: ["武夷山市"],
                    41455: ["延平区"]
                }]
            }],
            30: ["海南", 0, {
                3e3: ["海口市", 0, {41774: ["秀英区"], 41775: ["龙华区"], 41776: ["琼山区"], 41777: ["美兰区"]}],
                3001: ["三亚市"],
                3003: ["琼海市"],
                3004: ["儋州市"],
                3005: ["文昌市"],
                3006: ["东方市"],
                3008: ["万宁市"],
                3009: ["定安县"],
                3010: ["屯昌县"],
                3011: ["澄迈县"],
                3012: ["临高县"],
                41778: ["五指山市"],
                41779: ["白沙黎族自治县"],
                41780: ["昌江黎族自治县"],
                41781: ["乐东黎族自治县"],
                41782: ["陵水黎族自治县"],
                41783: ["保亭黎族苗族自治县"],
                41784: ["琼中黎族苗族自治县"],
                41785: ["西沙群岛"],
                41786: ["南沙群岛"],
                41787: ["中沙群岛的岛礁及其海域"]
            }],
            31: ["台湾", 1, {3100: ["台北市"], 3101: ["高雄市"], 3102: ["台中市"], 3107: ["台南市"], 3115: ["南投县"], 42243: ["金门县"]}],
            32: ["香港", 1, {3200: ["香港", 1]}],
            33: ["澳门", 1, {3300: ["澳门", 1]}],
            42245: ["海外", 1, {42246: ["海外", 1]}]
        }), window._regionMap
    }

    return t
}),define("components/paipai_region/com", ["require", "components/paipai_region/region_data"], function (e) {
    function t(e) {
        return "string" == typeof e ? document.getElementById(e) : e
    }

    function n(e, t, n) {
        var i = new Option(t, n);
        return e.options[e.options.length] = i, i
    }

    function i(e) {
        function i() {
            o(), r(), a(), l(), c()
        }

        function o() {
            if (d.initValue)for (var e in u) {
                if (e.toString() === d.initValue.toString())return void(d.provId = d.initValue);
                if ("object" == typeof u[e][2]) {
                    var t = e;
                    for (var n in u[e][2]) {
                        if (n.toString() === d.initValue.toString())return d.provId = t, void(d.cityId = n);
                        var i = u[e][2][n][2];
                        if ("object" == typeof i) {
                            var s = n;
                            for (var o in i)if (o.toString() === d.initValue.toString())return d.provId = t, d.cityId = s, void(d.areaId = o)
                        }
                    }
                }
            }
        }

        function a() {
            var e = d.provinceHander;
            if (e) {
                if (e.options.length > 0)return;
                n(e, "请选择省", "");
                for (var t in u)n(e, u[t][0], t);
                d.provId && (e.value = d.provId)
            }
        }

        function l() {
            var e = d.cityHander;
            if (e) {
                if (!d.provId)return;
                var t = u[d.provId][2];
                e.options.length = 0, n(e, "请选择市", "");
                for (var i in t)n(e, t[i][0], i);
                d.cityId && (e.value = d.cityId)
            }
        }

        function c() {
            var e = d.areaHander;
            if (e && d.area) {
                var t;
                if (!d.cityId)return void(e[0].options.length = 0);
                t = u[d.provId][2][d.cityId][2], e.options.length = 0, n(e, "请选择地区", "");
                for (var i in t)n(e, t[i][0], i);
                d.areaId && e.val(d.areaId)
            }
        }

        function r() {
            function e() {
                var e = this.getAttribute("vprovince"), n = this.getAttribute("vcity"), s = this.getAttribute("varea"), o = this.getAttribute("stype"), a = this.value, l = a;
                d.onSelect(this, o), "province" === o && "" === a && (d.onSelectBlankProv(this), t(n) ? t(n).options.length = 0 : "", s && t(s) ? t(s).options.length = 0 : ""), "city" === o && "" === a && (d.onSelectBlankCity(this), l = t(e).value), d.provId = "", d.cityId = "", d.areaId = "", d.initValue = l, i()
            }

            d.cityHander && (d.provinceHander.onchange = "", d.provinceHander.onchange = e), d.areaHander && (d.cityHander.onchange = "", d.cityHander.onchange = e)
        }

        var d = {
            province: "",
            city: "",
            area: "",
            provId: "",
            cityId: "",
            areaId: "",
            initValue: "",
            onSelect: function () {
                return !0
            },
            onSelectBlankProv: function () {
                return !0
            },
            onSelectBlankCity: function () {
                return !0
            }
        };
        for (var p in e)d[p] = e[p];
        d.provinceHander = "" === d.province ? null : t(d.province), d.cityHander = "" === d.city ? null : t(d.city), d.areaHander = "" === d.area ? null : t(d.area), d.provinceHander && (d.provinceHander.setAttribute("stype", "province"), d.provinceHander.setAttribute("vprovince", d.province), d.provinceHander.setAttribute("vcity", d.city), d.provinceHander.setAttribute("varea", d.area)), d.cityHander && (d.cityHander.setAttribute("stype", "city"), d.cityHander.setAttribute("vprovince", d.province), d.cityHander.setAttribute("vcity", d.city), d.cityHander.setAttribute("varea", d.area)), d.areaHander && (d.cityHander.setAttribute("stype", "area"), d.cityHander.setAttribute("vprovince", d.province), d.cityHander.setAttribute("vcity", d.city), d.cityHander.setAttribute("varea", d.area)), d.initaddress = i;
        var u = s();
        return i(), d
    }

    var s = e("components/paipai_region/region_data");
    return i
}),define("components/validation/validate", ["backbone", "backboneValidate"], function (e) {
    _.extend(e.Validation.patterns, {
        mobile: /^1\d{10}$/,
        integer: /^[1-9]\d*$/,
        zipCode: /^\d{6}$/
    }), _.extend(e.Validation.messages, {mobile: "请输入正确的手机号码"}), _.extend(e.Validation.callbacks, {
        valid: function (e, t, n) {
            t.indexOf(".") >= 0 && (t = t.split(".").join("_"));
            var i, s;
            return i = e.$("[" + n + "=" + t + "]"), 0 === i.length ? (i = e.$("[" + n + '^="' + t + '"]'), s = i.parents(".control-group").first()) : s = i.parents(".control-group").first(), s.removeClass("error"), "tooltip" !== i.data("error-style") ? "inline" === i.data("error-style") ? s.find(".help-inline.error-message").remove() : s.find(".help-block.error-message").remove() : i.data("tooltip") ? i.tooltip("hide") : void 0
        }, invalid: function (e, t, n, i) {
            t.indexOf(".") >= 0 && (t = t.split(".").join("_"));
            var s, o, a, l;
            return s = e.$("[" + i + "=" + t + "]"), 0 === s.length ? (s = e.$("[" + i + '^="' + t + '"]'), o = s.parents(".control-group").first()) : o = s.parents(".control-group").first(), o.addClass("error"), "tooltip" === s.data("error-style") ? (a = s.data("tooltip-position") || "right", s.tooltip({
                placement: a,
                trigger: "manual",
                title: n
            }), s.tooltip("show")) : "inline" === s.data("error-style") ? (0 === o.find(".help-inline").length && o.find(".controls").append('<span class="help-inline error-message"></span>'), l = o.find(".help-inline"), l.html(n)) : "block" === s.data("error-style") ? (0 === o.find(".help-block").length && o.append('<p class="help-block error-message"></p>'), l = o.find(".help-block"), l.html(n)) : (0 === o.find(".help-block").length && o.find(".controls").append('<p class="help-block error-message"></p>'), l = o.find(".help-block"), l.html(n))
        }
    })
}),define("text!templates/other_info.html", [], function () {
    return '<div class="info-group-title vbox">\n    <div class="group-inner">物流/其它</div>\n</div>\n<div class="info-group-cont vbox">\n    <div class="group-inner">\n        <div class="control-group">\n            <label class="control-label"><em class="required">*</em>运费设置：</label>\n            <div class="controls">\n                <% if(goods_type == \'10\' && fx_shipper_type == \'supplier\') { %>\n                    <div class="static-value">\n                        该商品为分销商品，暂不支持修改运费、配送信息\n                    </div>\n                <% } else { %>\n                    <label class="radio">\n                        <input id="js-unified-postage" type="radio" name="delivery" value="0" <% if (delivery_template_id == \'\') { %>checked<% } %>>统一邮费\n                        <div class="input-prepend">\n                            <span class="add-on">￥</span>\n                            <input type="text" name="postage" value="<%= postage %>" class="input-small js-postage">\n                        </div>\n                    </label>\n                <% } %>\n            </div>\n        </div>\n        <% if(goods_type == \'10\' && fx_shipper_type == \'supplier\') { %>\n        <% } else { %>\n            <div class="control-group" style="margin-top: -20px;">\n                <label class="control-label"></label>\n                <div class="controls">\n                    <label class="radio mat10">\n                        <input id="js-use-delivery" type="radio" name="delivery" value="1" <% if (delivery_template_id != \'\') { %>checked<% } %>>运费模版\n                        <div class="delivery-template" style="display: inline-block;">\n                            <input type="hidden" name="delivery_template_id" value="<%=delivery_template_id %>" class="js-delivery-template">\n                            <a class="js-refresh-delivery" href="javascript:;">刷新</a>\n                            <a href="<%=window._global.url.www %>/trade/delivery#add" target="_blank" class="new-window">+新建</a>\n                        </div>\n                    </label>\n                </div>\n            </div>\n        <% } %>\n\n        <% if(class_type != \'0\') { %>\n        <div class="control-group">\n            <label class="control-label">商品所在地：</label>\n            <div class="controls">\n                <select class="js-location input-medium" name="province_id" id="js-province"></select>\n                <select class="js-location input-medium" name="city_id" id="js-city"></select>\n            </div>\n        </div>\n        <% } %>\n\n        <div class="control-group">\n            <label class="control-label">每人限购：</label>\n            <div class="controls">\n\n                <input type="text" name="quota" value="<%=quota %>" class="input-small js-quota">\n                <span class="gray">0 代表不限购</span>\n\n            </div>\n        </div>\n        <div class="control-group">\n            <label class="control-label">要求留言：</label>\n            <div class="controls">\n                <input type="hidden" name="messages" />\n                <div id="messages-region"></div>\n            </div>\n        </div>\n\n        <div class="control-group">\n            <label class="control-label">开售时间：</label>\n            <div class="controls">\n                <label class="radio">\n                    <input type="radio" name="sold_time" value="0" <% if (sold_time == \'0\') { %>checked<% } %>>立即开售\n                </label>\n                <label class="radio mat5" for="sold_time">\n                    <input type="radio" id="sold_time" name="sold_time" value="1" <% if (sold_time == \'1\') { %>checked<% } %>>定时开售\n                    <input id="start_sold_time" name="start_sold_time" readonly class="input-medium js-sold-time <% if (sold_time == \'0\') { %>v-hide<% } %>" type="text" value="<% if (sold_time == \'1\') { %><%= start_sold_time %><% } %>">\n                </label>\n            </div>\n        </div>\n\n        <div class="js-level-discount control-group control-group-notes-wrap">\n            <label class="control-label">会员折扣：</label>\n            <div class="controls">\n                <label class="checkbox inline">\n                    <input type="checkbox" name="join_level_discount" value="1" <% if (join_level_discount == \'1\') { %>checked<% } %>>参加会员折扣\n                </label>\n                <div class="js-join-discount-alert hide alert" style="margin: 0; width: 400px;">该商品是分销商品，若勾选会员折扣，有可能最终出售价格低于成本价，造成亏损，请参考成本价合理设置折扣</div>\n            </div>\n        </div>\n\n        <div class="control-group">\n            <label class="control-label">发票：</label>\n            <div class="controls">\n                <label class="radio inline">\n                    <input type="radio" name="invoice" value="0" <% if (invoice == \'0\') { %>checked<% } %> >无\n                </label>\n                <label class="radio inline">\n                    <input type="radio" name="invoice" value="1" <% if (invoice == \'1\') { %>checked<% } %> >有\n                </label>\n            </div>\n        </div>\n        <div class="control-group">\n            <label class="control-label">保修：</label>\n            <div class="controls">\n                <label class="radio inline">\n                    <input type="radio" name="warranty" value="0" <% if (warranty == \'0\') { %>checked<% } %>>无\n                </label>\n                <label class="radio inline">\n                    <input type="radio" name="warranty" value="1" <% if (warranty == \'1\') { %>checked<% } %>>有\n                </label>\n            </div>\n        </div>\n    </div>\n</div>\n'
}),define("text!templates/messages.html", [], function () {
    return '<div class="js-message-container message-container"></div>\n<div class="message-add">\n    <a href="javascript:;" class="js-add-message control-action">+ 添加字段</a>\n    <a style="display: none;" href="javascript:;" class="js-help-notes circle-help">?</a>\n</div>\n'
}),define("models/message_item", ["require", "backbone"], function (e) {
    var t = e("backbone");
    return t.Model.extend({defaults: {name: "留言", type: "text", multiple: "0", required: "1"}})
}),define("text!templates/message_item.html", [], function () {
    return '<input type="text" name="name" value="<%= name %>" class="input-mini message-input" maxlength="5">\n<select class="input-small message-input" name="type">\n    <option value="text" <% if (type == \'text\') { %>selected<% } %>>文本格式</option>\n    <option value="tel" <% if (type == \'tel\') { %>selected<% } %>>数字格式</option>\n    <option value="email" <% if (type == \'email\') { %>selected<% } %>>邮件格式</option>\n    <option value="date" <% if (type == \'date\') { %>selected<% } %>>日期</option>\n    <option value="time" <% if (type == \'time\') { %>selected<% } %>>时间</option>\n    <option value="id_no" <% if (type == \'id_no\') { %>selected<% } %>>身份证号码</option>\n    <option value="image" <% if (type == \'image\') { %>selected<% } %>>图片</option>\n</select>\n<label class="checkbox inline message-input">\n    <input type="checkbox" name="multiple" value="<%= multiple %>" <% if (multiple == 1) { %> checked<% } %> <% if (type != \'text\') { %>disabled<% } %>>多行\n</label>\n<label class="checkbox inline message-input">\n    <input type="checkbox" name="required" value="<%= required %>" <% if (required == 1) { %> checked<% } %>>必填\n</label>\n<a href="javascript:;" class="js-remove-message remove-message">删除</a>\n'
}),define("views/message_item", ["require", "underscore", "backbone", "marionette", "core/event", "commons/utils", "text!templates/message_item.html"], function (e) {
    var t = e("underscore"), n = e("backbone"), i = e("marionette"), s = e("core/event"), o = e("commons/utils"), a = e("text!templates/message_item.html"), l = i.ItemView.extend({
        tagName: "div",
        className: "message-item",
        template: t.template(a),
        ui: {typeSelect: "select", multipleChk: '[name="multiple"]'},
        events: {"click .js-remove-message": "removeMessage", "change @ui.typeSelect": "onTypeChange"},
        _modelBinder: void 0,
        initialize: function (e) {
            var t = this;
            t.setConfig(e), t._modelBinder = new n.ModelBinder({modelSetOptions: {validate: !0}}), t.listenTo(t.model, "change", t.modelChanged)
        },
        setConfig: function (e) {
            var n = this;
            n.settings = {}, t(n.settings).extend(e)
        },
        onRender: function () {
        },
        onShow: function () {
            var e = this;
            e.initDataBindings()
        },
        modelChanged: function () {
            s.trigger("message_item:change")
        },
        initDataBindings: function () {
            var e = this, t = {
                name: '[name="name"]',
                type: '[name="type"]',
                multiple: {selector: '[name="multiple"]', converter: o.booleanConverter},
                required: {selector: '[name="required"]', converter: o.booleanConverter}
            };
            e._modelBinder.bind(e.model, e.el, t)
        },
        removeMessage: function (e) {
            var t = this;
            e.preventDefault(), e.stopPropagation();
            var n = t.model.collection;
            n.remove(t.model)
        },
        onTypeChange: function (e) {
            var t = this, n = t.ui.multipleChk, i = t.ui.typeSelect.val(), s = "text" !== i, o = {disabled: s};
            s && (o.checked = !1), n.prop(o).trigger("change")
        }
    });
    return l
}),define("views/messages", ["require", "underscore", "backbone", "marionette", "core/event", "core/utils", "text!templates/messages.html", "models/message_item", "views/message_item"], function (e) {
    var t = e("underscore"), n = (e("backbone"), e("marionette")), i = e("core/event"), s = e("core/utils"), o = e("text!templates/messages.html"), a = e("models/message_item"), l = e("views/message_item"), c = n.CompositeView.extend({
        template: t.template(o),
        itemView: l,
        itemViewContainer: ".js-message-container",
        events: {"click .js-add-message": "addMessage"},
        collectionEvents: {"add remove reset": "reverseUpdate"},
        maxSize: 20,
        initialize: function (e) {
            var t = this;
            t.listenTo(i, "message_item:change", t.reverseUpdate)
        },
        reverseUpdate: function () {
            var e = this, t = e.collection.toJSON();
            i.trigger("messages:update", t)
        },
        addMessage: function (e) {
            var t = this;
            if (e.preventDefault(), !t.checkMaxSize())return s.errorNotify("留言最多支持 20 组。"), !1;
            var n = new a({name: "留言" + (t.collection.size() + 1)});
            t.collection.add(n)
        },
        checkMaxSize: function () {
            var e = this, t = e.collection.size(), n = t < e.maxSize;
            return n
        }
    });
    return c
}),define("views/other_info", ["require", "underscore", "jquery", "backbone", "marionette", "core/event", "commons/utils", "core/utils", "components/paipai_region/com", "datetimepicker", "components/validation/validate", "text!templates/other_info.html", "views/messages"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("backbone"), s = e("marionette"), o = e("core/event"), a = e("commons/utils"), l = e("core/utils"), c = e("components/paipai_region/com");
    e("datetimepicker"), e("components/validation/validate");
    var r = e("text!templates/other_info.html"), d = e("views/messages"), p = s.Layout.extend({
        tagName: "div",
        className: "goods-info-group-inner",
        template: t.template(r),
        ui: {
            quotaTxt: ".js-quota",
            citySelect: "#js-city",
            postageTxt: ".js-postage",
            unifiedPostage: "#js-unified-postage",
            useDelivery: "#js-use-delivery",
            deliveryTemplate: ".js-delivery-template",
            refreshDelivery: ".js-refresh-delivery",
            soldTimeRadio: 'input[name="sold_time"]',
            startSoldTxt: 'input[name="start_sold_time"]',
            levelDiscount: ".js-level-discount"
        },
        events: {
            "change @ui.soldTimeRadio": "showTimepicker",
            "focus @ui.postageTxt": "onPostageTxtFocus",
            "click @ui.refreshDelivery": "onRefreshDeliveryClick",
            "change @ui.unifiedPostage": "onUnifiedPostageChange",
            "change @ui.useDelivery": "onUseDeliveryChange"
        },
        modelEvents: {"change:join_level_discount": "handleJoinLevelDiscountChange"},
        regions: {messagesRegion: "#messages-region"},
        _modelBinder: void 0,
        initialize: function (e) {
            var t = this;
            t.setConfig(e), t._modelBinder = new i.ModelBinder, t.listenTo(t.model, "change", a.showLog), t.listenTo(t.model, "change:shop_method", t.onShopMethodChange)
        },
        onClose: function () {
            var e = this;
            e._modelBinder.unbind()
        },
        onRender: function () {
            var e = this, t = e.model.get("shop_method");
            "0" == t && e.hideSelf(), this.handleJoinLevelDiscountChange()
        },
        serializeData: function () {
            var e = this, t = {};
            return this.model && (t = this.model.toJSON(), t = e.processData(t)), t
        },
        processData: function (e) {
            var t = "0" == e.delivery_template_id ? "" : e.delivery_template_id;
            return e.delivery_template_id = t, e
        },
        onShow: function () {
            this.initMessages(), this.initTimepicker(), this.initDataBindings(), this.initDeliveryTemplate(), this.initLocation()
        },
        setConfig: function (e) {
            var n = this;
            n.settings = {}, t(n.settings).extend(e)
        },
        initLocation: function () {
            var e = this, t = e.model.get("class_type");
            if ("0" == t)return !1;
            var n = e.model.get("city_id");
            c({province: "js-province", city: "js-city", initValue: n})
        },
        initMessages: function () {
            var e = this, t = e.model.get("messages");
            e.messageList = new i.Collection(t);
            var n = new d({collection: e.messageList, parentModel: e.model});
            e.messagesRegion.show(n), e.listenTo(o, "messages:update", e.updateMessages)
        },
        updateMessages: function (e) {
            var t = this;
            t.model.set({messages: e})
        },
        initDataBindings: function () {
            var e = this, n = {invoice: '[name="invoice"]', warranty: '[name="warranty"]'};
            "10" != e.model.get("goods_type") && t(n).extend({
                postage: {
                    selector: '[name="postage"]',
                    converter: e.postageConverter
                }
            }), "0" != e.model.get("class_type") && t(n).extend({
                province_id: {
                    selector: '[name="province_id"]',
                    converter: e.provinceConverter.bind(e)
                }, city_id: {selector: '[name="city_id"]', converter: e.cityConverter.bind(e)}
            }), t(n).extend({
                quota: '[name="quota"]',
                join_level_discount: {selector: '[name="join_level_discount"]', converter: a.booleanConverter}
            }), e._modelBinder.bind(e.model, e.el, n)
        },
        postageConverter: function (e, t, n, i, s) {
            return t = a.numberValueFix(t)
        },
        provinceConverter: function (e, t, i, s, o) {
            var a = this;
            if (t) {
                var l = n(o[0]), c = l.find("option:selected"), r = c.text();
                s.set("province", r, {silent: !0}), a.ui.citySelect.trigger("change")
            }
            return t
        },
        cityConverter: function (e, t, i, s, o) {
            if (t) {
                var a = n(o[0]), l = a.find("option:selected"), c = l.text();
                s.set("city", c, {silent: !0})
            }
            return t
        },
        onUnifiedPostageChange: function () {
            this.ui.unifiedPostage.prop("checked") && (this.model.set("delivery", "0"), this.setToUsePostage())
        },
        onUseDeliveryChange: function () {
            this.ui.useDelivery.prop("checked") && (this.model.set("delivery", "1", {silent: !0}), this.ui.deliveryTemplate.select2("open"))
        },
        setToUsePostage: function () {
            var e = this;
            e.setDeliveryTemplate("0");
            var t = e.getPostageValue();
            e.model.set("postage", t)
        },
        getPostageValue: function () {
            var e = this, t = e.ui.postageTxt.val();
            return t = a.numberValueFix(t)
        },
        onPostageTxtFocus: function (e) {
            var t = this;
            t.ui.unifiedPostage.prop("checked", !0).trigger("change")
        },
        onRefreshDeliveryClick: function (e) {
            var t = this;
            e.preventDefault(), t.setDeliveryTemplate("0"), t.fetchDeliveryData()
        },
        setDeliveryTemplate: function (e) {
            var t = this;
            t.ui.deliveryTemplate.select2("val", e), t.model.set("delivery_template_id", e)
        },
        fetchDeliveryData: function () {
            var e = this;
            if (e.isFetching)return !1;
            try {
                e.xhr.abort()
            } catch (t) {
            }
            e.isFetching = !0;
            var n = window._global.url.www + "/trade/delivery/idToNameMap.json";
            e.xhr = l.ajax({url: n, method: "GET"}).done(function (t) {
                e.processDeliveryData(t)
            }).fail(function (e) {
                l.errorNotify(e)
            }).always(function () {
                e.isFetching = !1
            })
        },
        processDeliveryData: function (e) {
            var n = this, i = [];
            t(e).each(function (e, t) {
                i.push({id: t, text: e})
            });
            var s = n.getSelect2Config(i);
            n.initDeliverySelect2(s)
        },
        initDeliverySelect2: function (e) {
            var t = this;
            try {
                t.ui.deliveryTemplate.select2("destroy"), t.ui.deliveryTemplate.select2(e).on("select2-opening", function (e) {
                }).on("select2-selecting", function (e) {
                    var n = e.object;
                    t.selectDeliveryTemplate(n, e)
                })
            } catch (n) {
            }
        },
        getSelect2Config: function (e) {
            var n = {multiple: !1, maximumInputLength: 12, width: 200, data: e};
            return n.placeholder = t.isEmpty(e) ? "没有可用运费模板" : "请选择运费模版...", n
        },
        initDeliveryTemplate: function () {
            var e = this;
            e.deliveryData = [], e.fetchDeliveryData()
        },
        selectDeliveryTemplate: function (e, t) {
            var n = this;
            n.ui.useDelivery.prop("checked", !0);
            var i = e.id;
            n.model.set("delivery_template_id", i)
        },
        initTimepicker: function () {
            var e = this, t = e.ui.startSoldTxt, n = +new Date, i = new Date(n + 6e4);
            t.datetimepicker({
                dateFormat: "yy-mm-dd",
                timeFormat: "HH:mm:ss",
                minDate: i,
                showSecond: !0,
                onSelect: function (n) {
                    e.model.set({start_sold_time: n}), t.siblings("input").trigger("click")
                }.bind(e)
            })
        },
        showTimepicker: function (e) {
            var t = this, i = t.ui.startSoldTxt, s = n(e.target), o = s.val();
            t.model.set({sold_time: o}, {silent: !0}), "1" == o && (i.removeClass("v-hide"), i.datetimepicker("show"))
        },
        initTakeDownTime: function () {
            var e = this, t = e.ui.takeDownTxt, n = +new Date;
            new Date(n + 6e4);
            t.datetimepicker({
                dateFormat: "yy-mm-dd",
                timeFormat: "HH:mm:ss",
                minDate: new Date,
                showSecond: !0,
                onSelect: function (t) {
                    e.model.set({take_down_time: t})
                }.bind(e)
            })
        },
        onShopMethodChange: function (e, t) {
            var n = this;
            "0" == t ? n.hideSelf() : n.showSelf()
        },
        handleJoinLevelDiscountChange: function () {
            var e = +this.model.get("join_level_discount"), t = this.model.get("goods_type");
            "10" == t && e ? this.$(".js-join-discount-alert").show() : this.$(".js-join-discount-alert").hide()
        },
        getData: function () {
            var e = this, t = e.model.toJSON();
            return t
        },
        showSelf: function () {
            var e = this;
            e.$el.show()
        },
        hideSelf: function () {
            var e = this;
            e.$el.hide()
        }
    });
    return p
}),define("tpl!templates/step2", [], function () {
    return function (obj) {
        var __p = "";
        Array.prototype.join;
        with (obj || {})__p += '<div id="base-info-region" class="goods-info-group"></div>\n<div id="sku-info-region" class="goods-info-group"></div>\n<div id="goods-info-region" class="goods-info-group"></div>\n<div id="other-info-region" class="goods-info-group"></div>\n<div class="app-actions">\n    <div class="form-actions text-center">\n        <button data-next-step="3" class="btn btn-primary js-switch-step">下一步</button>\n    </div>\n</div>\n';
        return __p
    }
}),define("views/step2", ["require", "jquery", "underscore", "backbone", "marionette", "core/reqres", "core/event", "components/popover/price_range/app", "views/base_info", "views/goods_info", "views/sku_stock_info", "views/other_info", "tpl!templates/step2"], function (e) {
    var t = e("jquery"), n = e("underscore"), i = e("backbone"), s = e("marionette"), o = e("core/reqres"), a = e("core/event"), l = e("components/popover/price_range/app"), c = e("views/base_info"), r = e("views/goods_info"), d = e("views/sku_stock_info"), p = e("views/other_info"), u = s.Layout.extend({
        tagName: "div",
        className: "form-horizontal fm-goods-info",
        template: e("tpl!templates/step2"),
        events: {},
        regions: {
            baseInfoRegion: "#base-info-region",
            skuStockInfoRegion: "#sku-info-region",
            goodsInfoRegion: "#goods-info-region",
            otherInfoRegion: "#other-info-region"
        },
        initialize: function () {
            i.Validation.bind(this), this.listenTo(this.model, "change", this.validateModel), this.bindPriceRangePop()
        },
        onRender: function () {
            this.$el.attr("novalidate", !0)
        },
        onShow: function () {
            this.initBaseInfo(), this.initSkuStockInfo(), this.initGoodsInfo(), this.initOtherInfo(), "goods" === window._global.goods_type && this.model.isNew() && a.trigger("sku_stock:update")
        },
        validateModel: function (e) {
            e.validate(e.changed)
        },
        initBaseInfo: function () {
            this.baseInfoRegion.show(new c({model: this.model}))
        },
        initGoodsInfo: function () {
            this.goodsInfoRegion.show(new r({model: this.model}))
        },
        initSkuStockInfo: function () {
            this.skuStockInfoRegion.show(new d({model: this.model}))
        },
        initOtherInfo: function () {
            this.otherInfoRegion.show(new p({model: this.model}))
        },
        bindPriceRangePop: function () {
            return this.model.isFx ? void n(this.events).extend({"click .js-price": "onAtomPriceClick"}) : !1
        },
        onAtomPriceClick: function (e) {
            var n = t(e.target), i = n.data("stock-id"), s = o.request("price_range:get", i) || {};
            new l({of: n, arrow: "bottom-center", data: s})
        }
    });
    return u
}),define("text!templates/design.html", [], function () {
    return '<div class="app-preview">\n    <div class="app-header"></div>\n    <div class="app-entry">\n        <div class="app-config ">\n            <div class="app-field" style="cursor: default;">\n                <h1><span></span></h1>\n                <div class="goods-details-block">\n                    <h4>基本信息区</h4>\n                    <p>固定样式，显示商品主图、价格等信息</p>\n                </div>\n            </div>\n            <div class="js-config-region"></div>\n        </div>\n        <div class="app-fields js-fields-region"></div>\n    </div>\n    <div class="js-add-region"></div>\n</div>\n<div class="app-sidebar">\n    <div class="app-sidebar-inner goods-sidebar-goods-template js-goods-sidebar-sub-title hide">\n        <div class="form-horizontal">\n            <div class="control-group">\n                <label class="control-label">商品页模版：</label>\n                <div class="controls">\n                    <select class="js-goods-template chosen-select" name="components_extra_id" data-selected-id="<%= obj[\'items\'][0][\'components_extra_id\'] %>" data-placeholder="选择商品页模版">\n                    </select>\n                    <p class="help-inline">\n                        <a class="js-refresh-goods-template" href="javascript:void(0);">刷新</a>\n                        <span>|</span>\n                        <a class="new_window" target="_blank" href="<%= window._global.url.www + \'/showcase/goodstemplate#create\' %>">+新建</a>\n                        <div class="ui-block-head-help soldout-help js-soldout-help hide" style="display: block; top: -180px;">\n                            <a href="javascript:void(0);" class="js-help-notes" data-class="left"></a>\n                            <div class="js-notes-cont hide">\n                                <p>默认启用简洁流畅版， 了解什么是<a href="http://kdt.im/W89xujwlV" target="_blank" class="new-window">商品模板</a></p>\n                            </div>\n                        </div>\n                    </p>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class="app-sidebar-inner goods-sidebar-sub-title js-goods-sidebar-sub-title hide">\n        <p class="">商品简介(选填，微信分享给好友时会显示这里的文案)</p>\n        <textarea rows="2" class="js-sub-title input-sub-title"><%=obj[\'items\'][0][\'sub_title\'] %></textarea>\n    </div>\n    <div class="arrow"></div>\n    <div class="app-sidebar-inner js-sidebar-region">\n\n    </div>\n</div>\n<div class="app-actions">\n    <div class="form-actions text-center">\n        <button class="btn js-switch-step" data-next-step="2">上一步</button>\n        <input class="btn btn-primary js-btn-load" type="submit" value="上架" data-loading-text="上架...">\n        <input class="btn js-btn-unload" type="submit" value="下架" data-loading-text="下架...">\n        <input class="btn js-btn-preview" type="submit" value="预览" data-loading-text="预览效果...">\n    </div>\n</div>\n'
}),define("text!templates/add_content.html", [], function () {
    return '<div class="app-add-field">\n    <h4>添加内容</h4>\n    <ul>\n        <li><a class="js-new-field" data-field-type="rich_text">富文本</a></li>\n        <li><a class="js-new-field" data-field-type="goods">商品</a></li>\n        <li><a class="js-new-field" data-field-type="goods_list">商品<br/>列表</a></li>\n        <li><a class="js-new-field" data-field-type="image_ad">图片<br/>广告</a> </li>\n        <li><a class="js-new-field" data-field-type="cube2">魔方</a></li>\n        <li><a class="js-new-field" data-field-type="title">标题</a></li>\n        <li><a class="js-new-field" data-field-type="text_nav">文本<br/>导航</a></li>\n        <li><a class="js-new-field" data-field-type="nav">图片<br/>导航</a></li>\n        <li><a class="js-new-field" data-field-type="link">关联<br/>链接</a></li>\n        <li><a class="js-new-field" data-field-type="search">商品<br/>搜索</a></li>\n        <li><a class="js-new-field" data-field-type="showcase">橱窗</a></li>\n        <li><a class="js-new-field" data-field-type="line">辅助线</a></li>\n        <li><a class="js-new-field" data-field-type="white">辅助<br/>空白</a></li>\n        <li><a class="js-new-field" data-field-type="component">自定义<br/>模块</a></li>\n    </ul>\n</div>\n'
}),define("components/showcase/2.0.0/base/views/show_collection", ["require", "marionette"], function (e) {
    var t = e("marionette");
    return t.CollectionView.extend({
        className: "app-fields",
        initialize: function (e) {
            this.options = e || {}, this.layout = this.options.layout
        }, onShow: function () {
            this.options.unsortable || this.sortable()
        }, itemViewOptions: function () {
            return {layout: this.layout}
        }, addItemView: function (e) {
            return "config" !== e.get("type") ? t.CollectionView.prototype.addItemView.apply(this, arguments) : void 0
        }, getItemView: function (e) {
            var t = e.get("type");
            return window.SHOWCASE_CONFIG.showViews[t]
        }, sortable: function () {
            var e = this;
            this.$el.sortable({
                axis: "y", items: "> div:not(.js-not-sortable)", cursor: "move", start: function (e, t) {
                    t.item.data("startPos", t.item.index())
                }, stop: function (t, n) {
                    var i = n.item.data("startPos"), s = n.item.index();
                    i !== s && (e.includeConfigModel() && (i += 1, s += 1), e.sort(i, s, e.collection.models), e.layout.displayEditView(), e.collection.trigger("sort"))
                }
            })
        }, sort: function (e, t, n) {
            var i = n.splice(e, 1)[0];
            return n.splice(t, 0, i), n
        }, includeConfigModel: function () {
            return this.collection.includeConfigModel()
        }, isEmpty: function () {
            return !this.collection || this.includeConfigModel() && 1 === this.collection.length || 0 === this.collection.length
        }
    })
}),define("text!components/showcase/2.0.0/base/templates/stroagealert.html", [], function () {
    return '<div class="alert fade in">\n    <button type="button" class="close" data-dismiss="alert">×</button>\n    <strong>提示：</strong>在浏览器中发现未提交的内容，是否使用该内容替换当前内容？<a class="js-use-storage" href="javascript:;"> 使用 </a>\n</div>\n'
}),define("components/showcase/2.0.0/rich_text/models/rich_text", ["require", "components/showcase/2.0.0/base/models/base"], function (e) {
    var t = e("components/showcase/2.0.0/base/models/base"), n = t.extend({
        defaults: {
            type: "rich_text",
            content: "",
            color: "#ffffff",
            fullscreen: 0
        }
    });
    return {
        initialize: function (e, t) {
            return new n(e, t)
        }
    }
}),define("components/showcase/2.0.0/goods/models/goods", ["require", "underscore", "components/showcase/2.0.0/base/models/base"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/models/base"), i = n.extend({
        defaults: {
            type: "goods",
            goods: null,
            size: "2",
            size_type: "0",
            buy_btn: "1",
            buy_btn_type: "1",
            title: "0",
            price: "1",
            show_wish_btn: "0",
            wish_btn_type: "1",
            show_sub_title: "0"
        }, initialize: function () {
            this.listenTo(this, "change", this.onChange), this.listenTo(this, "change:size", this.onSizeChange)
        }, onChange: function () {
            var e = this.get("size"), t = this.get("size_type"), n = this.get("buy_btn_type");
            "3" === e && "2" === t && "3" === n && this.set("buy_btn_type", "1"), "1" === e && "3" === t && this.set("price", "1")
        }, onSizeChange: function (e, t) {
            var n = this.get("size_type");
            1 !== +t && 1 === +n && this.set("size_type", "0"), 1 !== +t && 3 === +n && this.set("size_type", "0")
        }, deleteGoods: function (e) {
            var t = this.get("goods");
            t.splice(e, 1), this.set("goods", t), this.trigger("change"), this.trigger("change:goods")
        }
    });
    return {
        initialize: function (e, n) {
            return t.isUndefined(e) ? new i({goods: []}) : new i(e, n)
        }
    }
}),define("components/showcase/2.0.0/goods_list/models/goods", ["require", "underscore", "components/showcase/2.0.0/base/models/base"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/models/base"), i = n.extend({
        defaults: {
            type: "goods_list",
            goods: null,
            goods_number: 6,
            goods_number_type: 0,
            size: "2",
            size_type: "0",
            buy_btn: "1",
            buy_btn_type: "1",
            title: "0",
            price: "1",
            show_wish_btn: "0",
            show_sub_title: "0"
        }, initialize: function () {
            this.listenTo(this, "change", this.onChange), this.listenTo(this, "change:size", this.onSizeChange)
        }, onChange: function () {
            var e = this.get("size"), t = this.get("size_type"), n = this.get("buy_btn_type");
            "3" === e && "2" === t && "3" === n && this.set("buy_btn_type", "1"), "1" === e && "3" === t && this.set("price", "1")
        }, onSizeChange: function (e, t) {
            var n = this.get("size_type");
            1 !== +t && 1 === +n && this.set("size_type", "0"), 1 !== +t && 3 === +n && this.set("size_type", "0")
        }, deleteGoods: function (e) {
            var t = this.get("goods");
            t.splice(e, 1), this.set("goods", t), this.trigger("change:goods")
        }, validation: {}
    });
    return {
        initialize: function (e, n) {
            return t.isUndefined(e) ? new i : new i(e, n)
        }
    }
}),define("components/showcase/2.0.0/goods_template_split/models/model", ["require", "underscore", "components/showcase/2.0.0/base/models/base"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/models/base"), i = n.extend({defaults: {type: "goods_template_split"}});
    return {
        initialize: function (e, n) {
            return t.isUndefined(e) ? new i : new i(e, n)
        }
    }
}),define("components/showcase/2.0.0/image_ad/models/item", ["require", "components/showcase/2.0.0/base/models/base"], function (e) {
    var t = e("components/showcase/2.0.0/base/models/base"), n = t.extend({
        defaults: {
            type: "image_ad_selection",
            title: "",
            image_id: "",
            image_url: "",
            image_thumb_url: "",
            image_width: 0,
            image_height: 0,
            link_id: "",
            link_type: "",
            link_title: "",
            link_url: ""
        }, validation: {
            image_url: {required: !0, msg: "请选择一张图片。"}, title: function (e) {
                return e.length > 20 ? "图片标题最长20个字。" : void 0
            }
        }
    });
    return {
        initialize: function (e, t) {
            return new n(e, t)
        }, Model: n
    }
}),define("components/showcase/2.0.0/image_ad/collections/collection", ["require", "backbone", "components/showcase/2.0.0/image_ad/models/item"], function (e) {
    var t = e("backbone"), n = e("components/showcase/2.0.0/image_ad/models/item");
    return t.Collection.extend({model: n.Model})
}),define("components/showcase/2.0.0/image_ad/models/model", ["require", "underscore", "components/showcase/2.0.0/base/models/base", "components/showcase/2.0.0/image_ad/collections/collection"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/models/base"), i = e("components/showcase/2.0.0/image_ad/collections/collection"), s = n.extend({
        defaults: {
            type: "image_ad",
            size: "0",
            show_method: "0",
            height: 0,
            sub_entry: new i
        }, calculateImage: function () {
            var e = 0;
            this.get("sub_entry").each(function (t) {
                var n = Number(t.get("image_width")) / 320;
                n = 1 > n ? 1 : n;
                var i = 0 === Number(t.get("image_height")) ? 320 : Number(t.get("image_height")) / n;
                e = i > e ? i : e
            }), 0 === e && (e = 260), this.set("height", e)
        }, validation: {
            sub_entry: function (e) {
                return e.length > 10 ? "图片广告不能多于10个" : void 0
            }
        }, parse: function (e) {
            if (t.isArray(e.sub_entry)) {
                var n = new i;
                t.each(e.sub_entry, function (e) {
                    n.add(e)
                }), e.sub_entry = n
            }
            return e
        }, initialize: function () {
            this.listenTo(this, "change:show_method", function () {
                "0" == this.get("show_method") && this.set("size", "0")
            })
        }
    });
    return {
        initialize: function (e, n) {
            return t.isUndefined(e) ? new s({sub_entry: new i}) : new s(e, n)
        }
    }
}),define("components/showcase/2.0.0/nav/models/item", ["require", "components/showcase/2.0.0/base/models/base"], function (e) {
    var t = e("components/showcase/2.0.0/base/models/base"), n = t.extend({
        defaults: function () {
            return {
                type: "nav_selection",
                title: "",
                image_id: "",
                image_url: "",
                image_thumb_url: "",
                image_width: 0,
                image_height: 0,
                link_id: "",
                link_type: "",
                link_title: "",
                link_url: ""
            }
        }, validation: {
            image_url: {required: !0, msg: "请选择一张图片。"}, title: function (e) {
                return e.length > 5 ? "图片标题最长5个字。" : void 0
            }, link_url: function (e) {
                return e ? void 0 : "链接不能为空。"
            }
        }, initialize: function () {
            this.listenTo(this, "editing", function (e) {
                "error" === e && this.collection.trigger("editing:error", this)
            })
        }
    });
    return {
        initialize: function (e, t) {
            return new n(e, t)
        }, Model: n
    }
}),define("components/showcase/2.0.0/nav/collections/collection", ["require", "backbone", "components/showcase/2.0.0/nav/models/item"], function (e) {
    var t = e("backbone"), n = e("components/showcase/2.0.0/nav/models/item");
    return t.Collection.extend({model: n.Model})
}),define("components/showcase/2.0.0/nav/models/model", ["require", "components/showcase/2.0.0/base/models/base", "components/showcase/2.0.0/nav/collections/collection"], function (e) {
    var t = e("components/showcase/2.0.0/base/models/base"), n = e("components/showcase/2.0.0/nav/collections/collection"), i = t.extend({
        defaults: function () {
            return {type: "nav", sub_entry: new n}
        }, validation: {
            sub_entry: function (e) {
                return e.length > 20 ? "图片广告不能多余20个" : void 0
            }
        }, parse: function (e) {
            if (_.isArray(e.sub_entry)) {
                var t = new n;
                _.each(e.sub_entry, function (e) {
                    t.add(e)
                }), e.sub_entry = t
            }
            return e
        }, initialize: function () {
            this.get("sub_entry").length < 4 && this.get("sub_entry").add(_(4).times(n.prototype.model.prototype.defaults))
        }
    });
    return {
        initialize: function (e, t) {
            return _.isUndefined(e) ? new i({sub_entry: new n}) : new i(e, t)
        }
    }
}),define("components/showcase/2.0.0/showcase/models/item", ["require", "components/showcase/2.0.0/base/models/base"], function (e) {
    var t = e("components/showcase/2.0.0/base/models/base"), n = t.extend({
        defaults: function () {
            return {
                type: "showcase_selection",
                title: "",
                image_id: "",
                image_url: "",
                image_thumb_url: "",
                image_width: 0,
                image_height: 0,
                link_id: "",
                link_type: "",
                link_title: "",
                link_url: ""
            }
        }, validation: {
            image_url: {required: !0, msg: "请选择一张图片。"}, title: function (e) {
                return e.length > 5 ? "图片标题最长5个字。" : void 0
            }
        }
    });
    return {
        initialize: function (e, t) {
            return new n(e, t)
        }, Model: n
    }
}),define("components/showcase/2.0.0/showcase/collections/collection", ["require", "backbone", "components/showcase/2.0.0/showcase/models/item"], function (e) {
    var t = e("backbone"), n = e("components/showcase/2.0.0/showcase/models/item");
    return t.Collection.extend({model: n.Model})
}),define("components/showcase/2.0.0/showcase/models/model", ["require", "underscore", "components/showcase/2.0.0/base/models/base", "components/showcase/2.0.0/showcase/collections/collection"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/models/base"), i = e("components/showcase/2.0.0/showcase/collections/collection"), s = n.extend({
        defaults: function () {
            return {type: "showcase", mode: "0", title: "", body_title: "", body_desc: "", sub_entry: new i}
        }, validation: {
            sub_entry: function (e) {
                return e.length > 20 ? "图片广告不能多余20个" : void 0
            }
        }, parse: function (e) {
            if (t.isArray(e.sub_entry)) {
                var n = new i;
                t.each(e.sub_entry, function (e) {
                    n.add(e)
                }), e.sub_entry = n
            }
            return e
        }, initialize: function () {
            this.get("sub_entry").length < 3 && this.get("sub_entry").add(t(3).times(i.prototype.model.prototype.defaults))
        }
    });
    return {
        initialize: function (e, n) {
            return t.isUndefined(e) ? new s({sub_entry: new i}) : new s(e, n)
        }
    }
}),define("components/showcase/2.0.0/level/models/level", ["components/showcase/2.0.0/base/models/base"], function (e) {
    var t = e.extend({
        defaults: {
            type: "level",
            image: {id: "", url: window._global.url.v1_static + "/assets/img/avatar/" + window._global.mp_id + ".jpg"},
            show_level: "1",
            level_msg: "尊贵的",
            show_point: "1",
            point_msg: "您拥有本店积分：",
            is_default: !0
        },
        validation: {level_msg: {required: !0, msg: "等级提示不能为空"}, point_msg: {required: !0, msg: "积分提示不能为空"}},
        initialize: function () {
            this.listenTo(this, "editing", function (e) {
                "error" === e && this.trigger("editing:error", this)
            })
        }
    });
    return {
        initialize: function (e, n) {
            return new t(e, n)
        }
    }
}),define("components/showcase/2.0.0/link/models/item", ["require", "core/utils", "components/showcase/2.0.0/base/models/base"], function (e) {
    var t = e("core/utils"), n = e("components/showcase/2.0.0/base/models/base"), i = n.extend({
        defaults: {
            type: "link_selection",
            source_type: "",
            source_url: "",
            source_id: "",
            source_title: "",
            source_image: "",
            number: "3"
        }, validation: {
            source_url: function (e) {
                return t.REG.url.test(e) || t.REG.tel.test(e) ? void 0 : "内容来源不能为空且必须是一个合法的网站地址。"
            }, source_title: {required: !0, msg: "链接名称不能为空。"}
        }
    });
    return {
        initialize: function (e, t) {
            return new i(e, t)
        }, Model: i
    }
}),define("components/showcase/2.0.0/link/collections/collection", ["require", "backbone", "components/showcase/2.0.0/link/models/item"], function (e) {
    var t = e("backbone"), n = e("components/showcase/2.0.0/link/models/item");
    return t.Collection.extend({model: n.Model})
}),define("components/showcase/2.0.0/link/models/model", ["require", "underscore", "components/showcase/2.0.0/base/models/base", "components/showcase/2.0.0/link/collections/collection"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/models/base"), i = e("components/showcase/2.0.0/link/collections/collection"), s = n.extend({
        defaults: {
            type: "link",
            show_method: "0",
            sub_entry: new i
        }, validation: {
            sub_entry: function (e) {
                return e.length > 20 ? "关联链接不能多余20个" : void 0
            }
        }, parse: function (e) {
            if (t.isArray(e.sub_entry)) {
                var n = new i;
                t.each(e.sub_entry, function (e) {
                    n.add(e)
                }), e.sub_entry = n
            }
            return e
        }
    });
    return {
        initialize: function (e, n) {
            return t.isUndefined(e) ? new s({sub_entry: new i}) : new s(e, n)
        }
    }
}),define("components/showcase/2.0.0/text_nav/models/item", ["require", "core/utils", "components/showcase/2.0.0/base/models/base"], function (e) {
    var t = e("core/utils"), n = e("components/showcase/2.0.0/base/models/base"), i = n.extend({
        defaults: {
            type: "text_nav_selection",
            title: "",
            link_id: "",
            link_type: "",
            link_title: "",
            link_url: ""
        }, validation: {
            title: {required: !0, msg: "导航名称不能为空"}, link_url: function (e) {
                return e ? t.REG.url.test(e) || t.REG.tel.test(e) ? void 0 : "链接地址必须是一个合法的网站地址。" : "链接地址不能为空"
            }
        }
    });
    return {
        initialize: function (e, t) {
            return new i(e, t)
        }, Model: i
    }
}),define("components/showcase/2.0.0/text_nav/collections/collection", ["require", "backbone", "components/showcase/2.0.0/text_nav/models/item"], function (e) {
    var t = e("backbone"), n = e("components/showcase/2.0.0/text_nav/models/item");
    return t.Collection.extend({model: n.Model})
}),define("components/showcase/2.0.0/text_nav/models/model", ["require", "underscore", "components/showcase/2.0.0/base/models/base", "components/showcase/2.0.0/text_nav/collections/collection"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/models/base"), i = e("components/showcase/2.0.0/text_nav/collections/collection"), s = n.extend({
        defaults: {
            type: "text_nav",
            show_method: "0",
            sub_entry: new i
        }, validation: {
            sub_entry: function (e) {
                return e.length > 20 ? "关联链接不能多余20个" : void 0
            }
        }, parse: function (e) {
            if (t.isArray(e.sub_entry)) {
                var n = new i;
                t.each(e.sub_entry, function (e) {
                    n.add(e)
                }), e.sub_entry = n
            }
            return e
        }
    });
    return {
        initialize: function (e, n) {
            return t.isUndefined(e) ? new s({sub_entry: new i}) : new s(e, n)
        }
    }
}),define("components/showcase/2.0.0/tag_list/models/item", ["require", "components/showcase/2.0.0/base/models/base"], function (e) {
    var t = e("components/showcase/2.0.0/base/models/base"), n = t.extend({
        idAttribute: "_id", defaults: function () {
            return {type: "tag", id: "", title: "", url: "", goods_number: 10, timestamp: +new Date + this.cid}
        }, validation: {title: {required: !0, msg: "请选择商品分组"}}
    });
    return {
        initialize: function (e, t) {
            return new n(e, t)
        }, Model: n
    }
}),define("components/showcase/2.0.0/tag_list/collections/collection", ["require", "backbone", "components/showcase/2.0.0/tag_list/models/item"], function (e) {
    var t = e("backbone"), n = e("components/showcase/2.0.0/tag_list/models/item");
    return t.Collection.extend({model: n.Model})
}),define("components/showcase/2.0.0/tag_list/models/model", ["require", "underscore", "components/showcase/2.0.0/base/models/base", "components/showcase/2.0.0/tag_list/collections/collection"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/models/base"), i = e("components/showcase/2.0.0/tag_list/collections/collection"), s = n.extend({
        defaults: function () {
            return {type: "tag_list", timestamp: +new Date, sub_entry: new i}
        }, parse: function (e) {
            if (t.isArray(e.sub_entry)) {
                var n = new i;
                t.each(e.sub_entry, function (e) {
                    n.add(e)
                }), e.sub_entry = n
            }
            return e
        }
    });
    return {
        initialize: function (e, n) {
            return t.isUndefined(e) ? new s({sub_entry: new i}) : new s(e, n)
        }
    }
}),define("components/showcase/2.0.0/title/models/item", ["require", "jquery", "components/showcase/2.0.0/base/models/base"], function (e) {
    var t = e("jquery"), n = e("components/showcase/2.0.0/base/models/base"), i = n.extend({
        defaults: {
            type: "title_nav_selection",
            title: "",
            link_id: "",
            link_type: "",
            link_title: "",
            link_url: ""
        }, validation: {
            title: {required: !0, msg: "导航名称不能为空。"}, link_url: function (e) {
                return "" === t.trim(e) ? "导航链接不能为空。" : void 0
            }
        }
    });
    return {
        initialize: function (e, t) {
            return new i(e, t)
        }, Model: i
    }
}),define("components/showcase/2.0.0/title/collections/collection", ["require", "backbone", "components/showcase/2.0.0/title/models/item"], function (e) {
    var t = e("backbone"), n = e("components/showcase/2.0.0/title/models/item");
    return t.Collection.extend({model: n.Model})
}),define("components/showcase/2.0.0/title/models/model", ["require", "underscore", "components/showcase/2.0.0/base/models/base", "components/showcase/2.0.0/title/collections/collection"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/models/base"), i = e("components/showcase/2.0.0/title/collections/collection"), s = n.extend({
        defaults: {
            type: "title",
            title: "",
            sub_title: "",
            show_method: "0",
            color: "#ffffff",
            sub_entry: new i,
            title_template: "0",
            wx_title_date: "",
            wx_title_author: "",
            wx_title_link: "",
            wx_title_link_type: 0,
            wx_link: {},
            wx_link_url: ""
        }, validation: {
            title: {required: !0, msg: "标题不能为空。"}, wx_link_url: function (e, t, n) {
                return "1" == n.title_template && "1" == n.wx_title_link_type && "" === e ? "链接不能为空" : void 0
            }
        }, parse: function (e) {
            if (t.isArray(e.sub_entry)) {
                var n = new i;
                t.each(e.sub_entry, function (e) {
                    n.add(e)
                }), e.sub_entry = n
            }
            return e
        }
    });
    return {
        initialize: function (e, n) {
            return t.isUndefined(e) ? new s({sub_entry: new i}) : new s(e, n)
        }
    }
}),define("components/showcase/2.0.0/component/models/component", ["require", "underscore", "components/showcase/2.0.0/base/models/base"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/models/base"), i = n.extend({
        defaults: {
            type: "component",
            _id: "",
            title: "",
            link: ""
        }, validation: {
            _id: function (e) {
                return "" === e ? "请选择一个自定义页面模块。" : void 0
            }
        }
    });
    return {
        initialize: function (e, n) {
            return t.isUndefined(e) ? new i : new i(e, n)
        }
    }
}),define("components/showcase/2.0.0/search/models/model", ["require", "underscore", "components/showcase/2.0.0/base/models/base"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/models/base"), i = n.extend({defaults: {type: "search"}});
    return {
        initialize: function (e, n) {
            return t.isUndefined(e) ? new i : new i(e, n)
        }
    }
}),define("components/showcase/2.0.0/line/models/model", ["require", "underscore", "components/showcase/2.0.0/base/models/base"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/models/base"), i = n.extend({defaults: {type: "line"}});
    return {
        initialize: function (e, n) {
            return t.isUndefined(e) ? new i : new i(e, n)
        }
    }
}),define("components/showcase/2.0.0/cube2/models/item", ["require", "underscore", "components/showcase/2.0.0/base/models/base"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/models/base"), i = n.extend({
        defaults: function () {
            return {
                type: "cube_selection",
                x: 0,
                y: 0,
                width: 1,
                height: 1,
                title: "",
                image_id: "",
                image_url: "",
                image_thumb_url: "",
                image_width: 0,
                image_height: 0,
                link_id: "",
                link_type: "",
                link_title: "",
                link_url: "",
                show_method: "1"
            }
        }, validation: {image_url: [{required: !0, msg: "图片不能为空。"}]}, layout: function (e) {
            for (var n = t.clone(this.attributes), i = [], s = [], o = n.y; o < e.length; o++) {
                for (var a = n.x; a < e[o].length; a++) {
                    var l = e[o][a];
                    if (l && (n.x !== l.x || n.y !== l.y))break;
                    if (o - n.y > 0) {
                        var c = t.find(i, function (e) {
                            return e.rows === o - n.y && e.cols === a - n.x + 1
                        });
                        if (!c)break
                    }
                    s.push({cols: a - n.x + 1, rows: o - n.y + 1})
                }
                if (!s.length)break;
                i = i.concat(s), s = []
            }
            return i
        }
    });
    return {
        initialize: function (e, t) {
            return new i(e, t)
        }, Model: i
    }
}),define("components/showcase/2.0.0/cube2/collections/collection", ["require", "backbone", "components/showcase/2.0.0/cube2/models/item"], function (e) {
    var t = e("backbone"), n = e("components/showcase/2.0.0/cube2/models/item");
    return t.Collection.extend({model: n.Model})
}),define("text!components/showcase/2.0.0/cube2/templates/td.html", [], function () {
    return '<td class="not-empty cols-<%- width %> rows-<%- height %> <%- image_url ? \'\' : \'index-\' + index %>" colspan="<%- width %>" rowspan="<%- height %>" data-index="<%- index %>">\n    <% if(link_url) { %>\n        <a href="<%- link_url %>">\n            <img src="<%- image_url %>">\n        </a>\n    <% } else { %>\n        <img src="<%- image_url %>">\n    <% } %>\n</td>\n'
}),define("components/showcase/2.0.0/cube2/models/model", ["require", "underscore", "components/showcase/2.0.0/base/models/base", "components/showcase/2.0.0/cube2/collections/collection", "text!components/showcase/2.0.0/cube2/templates/td.html", "core/utils"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/models/base"), i = e("components/showcase/2.0.0/cube2/collections/collection"), s = e("text!components/showcase/2.0.0/cube2/templates/td.html"), o = e("core/utils"), a = n.extend({
        tdTemplate: t.template(s),
        defaults: function () {
            return {
                type: "cube2",
                layout_width: 4,
                layout_height: 4,
                layout_map: "",
                tableContent: "",
                sub_entry: new i
            }
        },
        validation: {
            layout_map: function () {
                for (var e = !1, t = !1, n = this.layoutMap, i = n.length - 1; i >= 0; i--) {
                    t = !1;
                    for (var s = 0; s < n[i].length; s++)n[i][s] ? e = !0 : t = !0;
                    if (t && e)return "必须添加满4列。"
                }
                return !1
            }
        },
        parse: function (e) {
            if (t.isArray(e.sub_entry)) {
                var n = new i;
                t.each(e.sub_entry, function (e) {
                    n.add(e)
                }), e.sub_entry = n
            }
            return e
        },
        denerateTableContent: function () {
            for (var e = t.result(this, "defaults"), n = this.denerateLayoutMap(), i = [], s = 0; s < e.layout_height; s++) {
                i.push("<tr>");
                for (var a = 0; a < e.layout_width; a++) {
                    var l = n[s][a];
                    if (l) {
                        if (s === l.y && a === l.x) {
                            var c = l.image_url;
                            c && (c = o.fullfillImage(c, "!730x0.jpg")), l.image_url = c, l.image_thumb_url = c, i.push(this.tdTemplate(l))
                        }
                    } else i.push('<td class="empty" data-x="' + a + '" data-y="' + s + '"></td>')
                }
                i.push("</tr>")
            }
            this.set("tableContent", i.join(""))
        },
        denerateLayoutMap: function () {
            var e = t.result(this, "defaults"), n = this.get("sub_entry").toJSON(), i = new Array(e.layout_width), s = this.layoutMap = [];
            return t.times(e.layout_height, function () {
                s.push(t.clone(i))
            }), t.each(t.clone(n), function (e, t) {
                e.index = t;
                for (var n = e.y; n < e.height + e.y; n++)for (var i = e.x; i < e.width + e.x; i++)s[n][i] = e
            }), s
        }
    });
    return {
        initialize: function (e, t) {
            return new a(e, t)
        }
    }
}),define("components/showcase/2.0.0/tpl_shop/models/model", ["require", "underscore", "components/showcase/2.0.0/base/models/base"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/models/base"), i = n.extend({
        defaults: {
            type: "tpl_shop",
            backgroundImage: "",
            backgroundColor: "#EF483F"
        }
    });
    return {
        initialize: function (e, n) {
            return t.isUndefined(e) ? new i : new i(e, n)
        }
    }
}),define("components/showcase/2.0.0/tpl_weixin/models/item", ["require", "jquery", "components/showcase/2.0.0/base/models/base"], function (e) {
    var t = e("jquery"), n = e("components/showcase/2.0.0/base/models/base"), i = n.extend({
        defaults: {
            type: "tpl_weixin_nav_selection",
            title: "",
            link_id: "",
            link_type: "",
            link_title: "",
            link_url: ""
        }, validation: {
            title: {required: !0, msg: "导航名称不能为空。"}, link_url: function (e) {
                return "" === t.trim(e) ? "导航链接不能为空。" : void 0
            }
        }
    });
    return {
        initialize: function (e, t) {
            return new i(e, t)
        }, Model: i
    }
}),define("components/showcase/2.0.0/tpl_weixin/collections/collection", ["require", "backbone", "components/showcase/2.0.0/tpl_weixin/models/item"], function (e) {
    var t = e("backbone"), n = e("components/showcase/2.0.0/tpl_weixin/models/item");
    return t.Collection.extend({model: n.Model})
}),define("components/showcase/2.0.0/tpl_weixin/models/model", ["require", "underscore", "components/showcase/2.0.0/base/models/base", "components/showcase/2.0.0/tpl_weixin/collections/collection"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/models/base"), i = e("components/showcase/2.0.0/tpl_weixin/collections/collection"), s = n.extend({
        defaults: {
            type: "tpl_weixin",
            background: window._global.url["static"] + "/image/tpl_weixin.jpg",
            width: 600,
            height: 900,
            top: "80",
            bg_link_id: "",
            bg_link_type: "",
            bg_link_title: "",
            bg_link_url: "",
            sub_entry: new i
        }, validation: {background: {required: !0, msg: "必须选择一张背景图片"}}, parse: function (e) {
            if (t.isArray(e.sub_entry)) {
                var n = new i;
                t.each(e.sub_entry, function (e) {
                    n.add(e)
                }), e.sub_entry = n
            }
            return e
        }
    });
    return {
        initialize: function (e, n) {
            return t.isUndefined(e) ? new s({sub_entry: new i}) : new s(e, n)
        }
    }
}),define("components/showcase/2.0.0/tpl_fbb/models/item", ["require", "jquery", "components/showcase/2.0.0/base/models/base"], function (e) {
    var t = e("jquery"), n = e("components/showcase/2.0.0/base/models/base"), i = n.extend({
        defaults: {
            type: "tpl_fbb_nav_selection",
            title: "",
            text: "",
            date: "",
            link_id: "",
            link_type: "",
            link_title: "",
            link_url: "",
            bg_image_id: "",
            bg_image_url: "",
            bg_image_width: "",
            bg_image_height: "",
            icon_image_id: "",
            icon_image_url: "",
            icon_image_width: "",
            icon_image_height: ""
        }, validation: {
            title: {required: !0, msg: "导航名称不能为空。"}, link_url: function (e) {
                return "" === t.trim(e) ? "导航链接不能为空。" : void 0
            }
        }
    });
    return {
        initialize: function (e, t) {
            return new i(e, t)
        }, Model: i
    }
}),define("components/showcase/2.0.0/tpl_fbb/collections/collection", ["require", "backbone", "components/showcase/2.0.0/tpl_fbb/models/item"], function (e) {
    var t = e("backbone"), n = e("components/showcase/2.0.0/tpl_fbb/models/item");
    return t.Collection.extend({model: n.Model})
}),define("components/showcase/2.0.0/tpl_fbb/models/model", ["require", "underscore", "components/showcase/2.0.0/base/models/base", "components/showcase/2.0.0/tpl_fbb/collections/collection"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/models/base"), i = e("components/showcase/2.0.0/tpl_fbb/collections/collection"), s = n.extend({
        defaults: {
            type: "tpl_fbb",
            background: window._global.url["static"] + "/image/tpl_fbb.jpg",
            width: 600,
            height: 900,
            bg_link_id: "",
            bg_link_type: "",
            bg_link_title: "",
            bg_link_url: "",
            sub_entry: new i,
            is_fullscreen_component: "1"
        }, validation: {background: {required: !0, msg: "必须选择一张背景图片"}}, parse: function (e) {
            if (t.isArray(e.sub_entry)) {
                var n = new i;
                t.each(e.sub_entry, function (e) {
                    n.add(e)
                }), e.sub_entry = n
            }
            return e
        }
    });
    return {
        initialize: function (e, n) {
            return t.isUndefined(e) ? new s({
                sub_entry: new i([{
                    type: "title_nav_selection",
                    title: "行程",
                    link_id: "",
                    link_type: "link",
                    link_title: "有赞",
                    link_url: "http://koudaitong.com",
                    text: "范冰冰微站全新上线",
                    bg_image_id: "",
                    bg_image_url: "",
                    bg_image_width: "",
                    bg_image_height: "",
                    icon_image_id: "",
                    icon_image_url: "http://static.koudaitong.com/v2/image/tpl_fbb_icon_1.png",
                    icon_image_width: "",
                    icon_image_height: "",
                    date: "4月10号"
                }, {
                    type: "title_nav_selection",
                    title: "抽奖",
                    link_id: "",
                    link_type: "link",
                    link_title: "有赞",
                    link_url: "http://koudaitong.com",
                    text: "神秘大奖等你来拿",
                    bg_image_id: "",
                    bg_image_url: "",
                    bg_image_width: "",
                    bg_image_height: "",
                    icon_image_id: "",
                    icon_image_url: "http://static.koudaitong.com/v2/image/tpl_fbb_icon_2.png",
                    icon_image_width: "",
                    icon_image_height: "",
                    date: ""
                }, {
                    type: "title_nav_selection",
                    title: "投票",
                    link_id: "",
                    link_type: "link",
                    link_title: "有赞",
                    link_url: "http://koudaitong.com",
                    text: "冰邦们的家！DIY范小胖专属表情",
                    bg_image_id: "",
                    bg_image_url: "",
                    bg_image_width: "",
                    bg_image_height: "",
                    icon_image_id: "",
                    icon_image_url: "http://static.koudaitong.com/v2/image/tpl_fbb_icon_3.png",
                    icon_image_width: "",
                    icon_image_height: "",
                    date: ""
                }, {
                    type: "title_nav_selection",
                    title: "新闻资讯",
                    link_id: "",
                    link_type: "link",
                    link_title: "有赞",
                    link_url: "http://koudaitong.com",
                    text: "《X战警》范冰冰海报曝光 搭档佩姬联合出击",
                    bg_image_id: "",
                    bg_image_url: "",
                    bg_image_width: "",
                    bg_image_height: "",
                    icon_image_id: "",
                    icon_image_url: "http://static.koudaitong.com/v2/image/tpl_fbb_icon_4.png",
                    icon_image_width: "",
                    icon_image_height: "",
                    date: ""
                }, {
                    type: "title_nav_selection",
                    title: "写真",
                    link_id: "",
                    link_type: "link",
                    link_title: "有赞",
                    link_url: "http://koudaitong.com",
                    text: "",
                    bg_image_id: "",
                    bg_image_url: "http://static.koudaitong.com/v2/image/tpl_fbb_bg_1.jpg",
                    bg_image_width: "",
                    bg_image_height: "",
                    icon_image_id: "",
                    icon_image_url: "",
                    icon_image_width: "",
                    icon_image_height: "",
                    date: ""
                }, {
                    type: "title_nav_selection",
                    title: "影视",
                    link_id: "",
                    link_type: "link",
                    link_title: "有赞",
                    link_url: "http://koudaitong.com",
                    text: "",
                    bg_image_id: "",
                    bg_image_url: "http://static.koudaitong.com/v2/image/tpl_fbb_bg_2.jpg",
                    bg_image_width: "",
                    bg_image_height: "",
                    icon_image_id: "",
                    icon_image_url: "",
                    icon_image_width: "",
                    icon_image_height: "",
                    date: ""
                }, {
                    type: "title_nav_selection",
                    title: "微视",
                    link_id: "",
                    link_type: "link",
                    link_title: "有赞",
                    link_url: "http://koudaitong.com",
                    text: "三三不尽，关注微站！",
                    bg_image_id: "",
                    bg_image_url: "",
                    bg_image_width: "",
                    bg_image_height: "",
                    icon_image_id: "",
                    icon_image_url: "http://static.koudaitong.com/v2/image/tpl_fbb_icon_5.png",
                    icon_image_width: "",
                    icon_image_height: "",
                    date: ""
                }, {
                    type: "title_nav_selection",
                    title: "爱里的心",
                    link_id: "",
                    link_type: "link",
                    link_title: "有赞",
                    link_url: "http://koudaitong.com",
                    text: "“爱里的心”公益项目",
                    bg_image_id: "",
                    bg_image_url: "",
                    bg_image_width: "",
                    bg_image_height: "",
                    icon_image_id: "",
                    icon_image_url: "http://static.koudaitong.com/v2/image/tpl_fbb_icon_4.png",
                    icon_image_width: "",
                    icon_image_height: "",
                    date: ""
                }, {
                    type: "title_nav_selection",
                    title: "音乐",
                    link_id: "",
                    link_type: "link",
                    link_title: "有赞",
                    link_url: "http://koudaitong.com",
                    text: "聆听范冰冰的电台",
                    bg_image_id: "",
                    bg_image_url: "",
                    bg_image_width: "",
                    bg_image_height: "",
                    icon_image_id: "",
                    icon_image_url: "http://static.koudaitong.com/v2/image/tpl_fbb_icon_6.png",
                    icon_image_width: "",
                    icon_image_height: "",
                    date: ""
                }, {
                    type: "title_nav_selection",
                    title: "荣耀时刻",
                    link_id: "",
                    link_type: "link",
                    link_title: "有赞",
                    link_url: "http://koudaitong.com",
                    text: "一同见证范冰冰星路历程",
                    bg_image_id: "",
                    bg_image_url: "",
                    bg_image_width: "",
                    bg_image_height: "",
                    icon_image_id: "",
                    icon_image_url: "http://static.koudaitong.com/v2/image/tpl_fbb_icon_1.png",
                    icon_image_width: "",
                    icon_image_height: "",
                    date: ""
                }])
            }) : new s(e, n)
        }
    }
}),define("components/showcase/2.0.0/tpl_course/models/item", ["require", "jquery", "components/showcase/2.0.0/base/models/base"], function (e) {
    var t = e("jquery"), n = e("components/showcase/2.0.0/base/models/base"), i = n.extend({
        defaults: {
            type: "tpl_fbb_nav_selection",
            title: "",
            text: "",
            date: "",
            link_id: "",
            link_type: "",
            link_title: "",
            link_url: "",
            icon_image_id: "",
            icon_image_url: "",
            icon_image_width: "",
            icon_image_height: ""
        }, validation: {
            title: {required: !0, msg: "导航名称不能为空。"}, link_url: function (e) {
                return "" === t.trim(e) ? "导航链接不能为空。" : void 0
            }
        }, initialize: function () {
            this.listenTo(this, "editing", function (e) {
                "error" === e && this.collection.trigger("editing:error", this)
            })
        }
    });
    return {
        initialize: function (e, t) {
            return new i(e, t)
        }, Model: i
    }
}),define("components/showcase/2.0.0/tpl_course/collections/collection", ["require", "backbone", "components/showcase/2.0.0/tpl_course/models/item"], function (e) {
    var t = e("backbone"), n = e("components/showcase/2.0.0/tpl_course/models/item");
    return t.Collection.extend({model: n.Model})
}),define("components/showcase/2.0.0/tpl_course/models/model", ["require", "underscore", "jquery", "components/showcase/2.0.0/base/models/base", "components/showcase/2.0.0/tpl_course/collections/collection"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("components/showcase/2.0.0/base/models/base"), s = e("components/showcase/2.0.0/tpl_course/collections/collection"), o = i.extend({
        defaults: {
            type: "tpl_course",
            background: window._global.url["static"] + "/image/tpl_course.jpg",
            width: 600,
            height: 900,
            title: "新品上架，限时优惠",
            title_color: "#ffffff",
            sub_title: "微信购买8折起",
            sub_title_color: "#cfcfcf",
            button_text: "立即购买",
            button_link_id: "",
            button_link_type: "link",
            button_link_title: "有赞",
            button_link_url: "http://koudaitong.com",
            top: "50",
            sub_entry: new s,
            is_fullscreen_component: "1"
        },
        validation: {
            button_text: {required: !0, msg: "请输入按钮文字"},
            background: {required: !0, msg: "必须选择一张背景图片"},
            button_link_url: function (e) {
                return "" === n.trim(e) ? "按钮链接不能为空。" : void 0
            }
        },
        parse: function (e) {
            if (t.isArray(e.sub_entry)) {
                var n = new s;
                t.each(e.sub_entry, function (e) {
                    n.add(e)
                }), e.sub_entry = n
            }
            return e
        }
    });
    return {
        initialize: function (e, n) {
            return t.isUndefined(e) ? new o({
                sub_entry: new s([{
                    type: "title_nav_selection",
                    title: "上新",
                    link_id: "",
                    link_type: "link",
                    link_title: "有赞",
                    link_url: "http://koudaitong.com",
                    icon_image_id: "",
                    icon_image_url: "http://static.koudaitong.com/v2/image/tpl_fbb_icon_1.png",
                    icon_image_width: "",
                    icon_image_height: ""
                }, {
                    type: "title_nav_selection",
                    title: "抽奖",
                    link_id: "",
                    link_type: "link",
                    link_title: "有赞",
                    link_url: "http://koudaitong.com",
                    icon_image_id: "",
                    icon_image_url: "http://static.koudaitong.com/v2/image/tpl_fbb_icon_2.png",
                    icon_image_width: "",
                    icon_image_height: ""
                }, {
                    type: "title_nav_selection",
                    title: "投票",
                    link_id: "",
                    link_type: "link",
                    link_title: "有赞",
                    link_url: "http://koudaitong.com",
                    icon_image_id: "",
                    icon_image_url: "http://static.koudaitong.com/v2/image/tpl_fbb_icon_3.png",
                    icon_image_width: "",
                    icon_image_height: ""
                }, {
                    type: "title_nav_selection",
                    title: "杂志",
                    link_id: "",
                    link_type: "link",
                    link_title: "有赞",
                    link_url: "http://koudaitong.com",
                    icon_image_id: "",
                    icon_image_url: "http://static.koudaitong.com/v2/image/tpl_fbb_icon_4.png",
                    icon_image_width: "",
                    icon_image_height: ""
                }, {
                    type: "title_nav_selection",
                    title: "小游戏",
                    link_id: "",
                    link_type: "link",
                    link_title: "有赞",
                    link_url: "http://koudaitong.com",
                    icon_image_id: "",
                    icon_image_url: "http://static.koudaitong.com/v2/image/tpl_fbb_icon_5.png",
                    icon_image_width: "",
                    icon_image_height: ""
                }, {
                    type: "title_nav_selection",
                    title: "关注",
                    link_id: "",
                    link_type: "link",
                    link_title: "有赞",
                    link_url: "http://koudaitong.com",
                    icon_image_id: "",
                    icon_image_url: "http://static.koudaitong.com/v2/image/tpl_fbb_icon_4.png",
                    icon_image_width: "",
                    icon_image_height: ""
                }])
            }) : new o(e, n)
        }
    }
}),define("components/showcase/2.0.0/tpl_wxd/models/model", ["require", "underscore", "components/showcase/2.0.0/base/models/base"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/models/base"), i = n.extend({
        defaults: {
            type: "tpl_wxd",
            backgroundImage: window._global.url["static"] + "/image/tpl_wxd_bg.png",
            avatar: window._global.mp_data ? window._global.mp_data.logo || "" : ""
        }
    });
    return {
        initialize: function (e, n) {
            return t.isUndefined(e) ? new i : new i(e, n)
        }
    }
}),define("components/showcase/2.0.0/tpl_11_11/models/model", ["require", "underscore", "components/showcase/2.0.0/base/models/base"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/models/base"), i = n.extend({
        defaults: {
            type: "tpl_11_11",
            banner: "",
            notice: "",
            tradeincard: []
        }, validation: {
            banner: {required: !0, msg: "请选择背景图片"}, tradeincard: function (e) {
                return e.length ? void 0 : "请添加优惠券"
            }, notice: {required: !0, msg: "请填写店铺公告"}
        }
    });
    return {
        initialize: function (e, n) {
            return t.isUndefined(e) ? new i : new i(e, n)
        }
    }
}),define("components/showcase/2.0.0/category/models/item", ["require", "components/showcase/2.0.0/base/models/base"], function (e) {
    var t = e("components/showcase/2.0.0/base/models/base"), n = t.extend({
        defaults: function () {
            return {type: "category_selection", title: "导航名称", link_id: "", link_type: "", link_title: "", link_url: ""}
        }, validation: {
            title: function (e) {
                return e.length > 6 ? "分类名称最长6个字。" : void 0
            }, link_url: function (e) {
                return e ? void 0 : "链接不能为空。"
            }
        }
    });
    return {
        initialize: function (e, t) {
            return new n(e, t)
        }, Model: n
    }
}),define("components/showcase/2.0.0/category/collections/collection", ["require", "components/showcase/2.0.0/category/models/item", "backbone"], function (e) {
    var t = e("components/showcase/2.0.0/category/models/item"), n = e("backbone");
    return n.Collection.extend({model: t.Model})
}),define("components/showcase/2.0.0/category/models/model", ["require", "underscore", "components/showcase/2.0.0/base/models/base", "components/showcase/2.0.0/category/collections/collection"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/models/base"), i = e("components/showcase/2.0.0/category/collections/collection"), s = n.extend({
        defaults: function () {
            return {type: "category", sub_entry: new i}
        }, parse: function (e) {
            if (t.isArray(e.sub_entry)) {
                var n = new i;
                t.each(e.sub_entry, function (e, t) {
                    4 > t && n.add(e)
                }), e.sub_entry = n
            }
            return e
        }, initialize: function () {
            var e = this.get("sub_entry").length;
            if (4 > e)for (; 4 > e; e++)this.get("sub_entry").add(i.prototype.model.prototype.defaults)
        }
    });
    return {
        initialize: function (e, n) {
            return t.isUndefined(e) ? new s({sub_entry: new i}) : new s(e, n)
        }
    }
}),define("components/showcase/2.0.0/white/models/model", ["require", "underscore", "components/showcase/2.0.0/base/models/base"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/models/base"), i = n.extend({
        defaults: {
            type: "white",
            height: "30"
        }
    });
    return {
        initialize: function (e, n) {
            return t.isUndefined(e) ? new i : new i(e, n)
        }
    }
}),define("components/showcase/2.0.0/store/models/model", ["require", "underscore", "components/showcase/2.0.0/base/models/base"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/models/base"), i = n.extend({defaults: {type: "store"}});
    return {
        initialize: function (e, n) {
            return t.isUndefined(e) ? new i : new i(e, n)
        }
    }
}),define("components/showcase/2.0.0/recommend_goods/models/model", ["require", "underscore", "components/showcase/2.0.0/base/models/base"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/models/base"), i = n.extend({defaults: {type: "recommend_goods"}});
    return {
        initialize: function (e, n) {
            return t.isUndefined(e) ? new i : new i(e, n)
        }
    }
}),define("components/showcase/2.0.0/scroll/models/item", ["require", "components/showcase/2.0.0/base/models/base"], function (e) {
    var t = e("components/showcase/2.0.0/base/models/base"), n = t.extend({
        defaults: function () {
            return {
                type: "scroll_item",
                image_id: "",
                image_url: "",
                image_thumb_url: "",
                image_width: 0,
                image_height: 0,
                link_id: "",
                link_type: "",
                link_title: "",
                link_url: ""
            }
        }, validation: {image_url: {required: !0, msg: "请选择一张图片。"}}
    });
    return {
        initialize: function (e, t) {
            return new n(e, t)
        }, Model: n
    }
}),define("components/showcase/2.0.0/scroll/collections/collection", ["require", "backbone", "components/showcase/2.0.0/scroll/models/item"], function (e) {
    var t = e("backbone"), n = e("components/showcase/2.0.0/scroll/models/item");
    return t.Collection.extend({model: n.Model})
}),define("components/showcase/2.0.0/scroll/models/model", ["require", "underscore", "components/showcase/2.0.0/base/models/base", "components/showcase/2.0.0/scroll/collections/collection"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/models/base"), i = e("components/showcase/2.0.0/scroll/collections/collection"), s = n.extend({
        defaults: function () {
            return {
                type: "scroll",
                homepage_icon: "1",
                music_icon: "1",
                music_url: "",
                music_title: "",
                loop: "1",
                flipway: "default",
                first_page_image_id: "",
                first_page_image_url: "",
                first_page_image_thumb_url: "",
                first_page_image_width: 0,
                first_page_image_height: 0,
                first_page_wipe: "0",
                first_page_wipe_image_id: "",
                first_page_wipe_image_url: "",
                first_page_wipe_image_thumb_url: "",
                first_page_wipe_image_width: 0,
                first_page_wipe_image_height: 0,
                last_page_image_id: "",
                last_page_image_url: "",
                last_page_image_thumb_url: "",
                last_page_image_width: 0,
                last_page_image_height: 0,
                last_page_link_id: "",
                last_page_link_type: "",
                last_page_link_title: "",
                last_page_link_url: "",
                sub_entry: new i,
                is_fullscreen_component: "1"
            }
        },
        parse: function (e) {
            if (t.isArray(e.sub_entry)) {
                var n = new i;
                t.each(e.sub_entry, function (e) {
                    n.add(e)
                }), e.sub_entry = n
            }
            return e
        },
        validation: {
            first_page_image_url: {required: !0, msg: "请选择一张图片。"},
            last_page_image_url: {required: !0, msg: "请选择一张图片。"}
        }
    });
    return {
        initialize: function (e, n) {
            return t.isUndefined(e) ? new s({sub_entry: new i}) : new s(e, n)
        }
    }
}),define("components/showcase/2.0.0/scroll_nav/models/item", ["require", "components/showcase/2.0.0/base/models/base"], function (e) {
    var t = e("components/showcase/2.0.0/base/models/base"), n = t.extend({
        defaults: function () {
            return {
                type: "scroll_nav_item",
                title: "",
                sub_title: "",
                image_id: "",
                image_url: "",
                image_thumb_url: "",
                image_width: 0,
                image_height: 0,
                link_id: "",
                link_type: "",
                link_title: "",
                link_url: ""
            }
        }, validation: {image_url: {required: !0, msg: "请选择一张图片。"}}
    });
    return {
        initialize: function (e, t) {
            return new n(e, t)
        }, Model: n
    }
}),define("components/showcase/2.0.0/scroll_nav/collections/collection", ["require", "backbone", "components/showcase/2.0.0/scroll_nav/models/item"], function (e) {
    var t = e("backbone"), n = e("components/showcase/2.0.0/scroll_nav/models/item");
    return t.Collection.extend({model: n.Model})
}),define("components/showcase/2.0.0/scroll_nav/models/model", ["require", "underscore", "components/showcase/2.0.0/base/models/base", "components/showcase/2.0.0/scroll_nav/collections/collection"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/models/base"), i = e("components/showcase/2.0.0/scroll_nav/collections/collection"), s = n.extend({
        defaults: function () {
            return {
                type: "scroll_nav",
                homepage_icon: "1",
                background_images: [],
                nav_style: "right",
                animate: "zoom",
                zoom_type: "zoom_out",
                slide_type: "slide_left",
                sub_entry: new i,
                is_fullscreen_component: "1"
            }
        }, parse: function (e) {
            if (t.isArray(e.sub_entry)) {
                var n = new i;
                t.each(e.sub_entry, function (e) {
                    n.add(e)
                }), e.sub_entry = n
            }
            return e
        }, validation: {
            background_images: function (e) {
                return e && 0 !== e.length ? void 0 : "请选择背景图片"
            }
        }
    });
    return {
        initialize: function (e, n) {
            return t.isUndefined(e) ? new s({
                sub_entry: new i([{title: "标题", sub_title: "副标题"}, {
                    title: "标题",
                    sub_title: "副标题"
                }])
            }) : new s(e, n)
        }
    }
}),define("components/showcase/2.0.0/image_text/models/model", ["require", "underscore", "components/showcase/2.0.0/base/models/base"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/models/base"), i = n.extend({
        defaults: {
            type: "image_text",
            title: "",
            digest: "",
            author: "",
            image: "",
            image_id: "",
            show_image: 0,
            content: "",
            link_id: "",
            link_url: "",
            link_type: "",
            link_title: ""
        }, validation: {
            title: [{required: !0, msg: "标题不能为空"}, {maxLength: 64, msg: "标题长度不能超过64个字"}], author: function (e) {
                return e.length > 8 ? "作者长度不超过8个字" : void 0
            }, content: [{required: !0, msg: "正文不能为空"}], image: {required: !0, msg: "必须选择一张图片"}, digest: function (e) {
                return e.length > 120 ? "摘要不能超过120个字" : void 0
            }
        }
    });
    return {
        initialize: function (e, n) {
            var s;
            return s = t.isUndefined(e) ? new i : new i(e, n)
        }
    }
}),define("components/showcase/2.0.0/advanced_news/models/model", ["require", "underscore", "components/showcase/2.0.0/base/models/base"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/models/base"), i = n.extend({
        defaults: {
            type: "advanced_news",
            title: "",
            digest: "",
            cover_id: "",
            cover_url: "",
            link_id: "",
            link_url: "",
            link_type: "",
            link_title: ""
        },
        validation: {
            title: [{required: !0, msg: "标题不能为空"}, {maxLength: 64, msg: "标题长度不能超过64个字"}],
            link_url: {required: !0, msg: "请设置链接地址"},
            digest: function (e) {
                return e.length > 120 ? "摘要不能超过120个字" : void 0
            },
            cover_url: function (e) {
                return this.isSingle() || 0 !== this.position() || e ? void 0 : "请添加封面"
            }
        },
        isSingle: function () {
            return 1 === this.collection.length
        }
    });
    return {
        initialize: function (e, n) {
            var s;
            return s = t.isUndefined(e) ? new i : new i(e, n)
        }
    }
}),define("components/showcase/2.0.0/audio/models/model", ["require", "components/showcase/2.0.0/base/models/base"], function (e) {
    var t = e("components/showcase/2.0.0/base/models/base"), n = t.extend({
        defaults: {
            type: "audio",
            reload: "1",
            style: "0",
            audio: "",
            title: "",
            loop: "0",
            avatar: "",
            bubble: "left"
        }, validation: {
            title: function (e) {
                return 1 === +this.get("style") && e.length <= 0 ? "标题不能为空" : void 0
            }, audio: {required: !0, msg: "必须选择一个音频文件"}
        }
    });
    return {
        initialize: function (e, t) {
            return new n(e, t)
        }
    }
}),define("components/showcase/2.0.0/shop_banner/models/model", ["require", "underscore", "components/showcase/2.0.0/base/models/base"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/models/base"), i = n.extend({
        defaults: {
            type: "shop_banner",
            background_color: "#EF483F",
            background_image: window._global.url["static"] + "/image/widget/showcase/shop_banner/default.jpg",
            intro: ""
        }
    });
    return {
        initialize: function (e, n) {
            return t.isUndefined(e) ? new i : new i(e, n)
        }
    }
}),define("components/showcase/2.0.0/tags/models/item", ["require", "components/showcase/2.0.0/base/models/base"], function (e) {
    var t = e("components/showcase/2.0.0/base/models/base"), n = t.extend({
        idAttribute: "_id", defaults: function () {
            return {type: "tag", id: "", alias: "", title: "", url: ""}
        }
    });
    return {
        initialize: function (e, t) {
            return new n(e, t)
        }, Model: n
    }
}),define("components/showcase/2.0.0/tags/collections/collection", ["require", "backbone", "../models/item"], function (e) {
    var t = e("backbone"), n = e("../models/item");
    return t.Collection.extend({model: n.Model})
}),define("components/showcase/2.0.0/tags/models/model", ["require", "underscore", "components/showcase/2.0.0/base/models/base", "../collections/collection"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/models/base"), i = e("../collections/collection"), s = n.extend({
        defaults: function () {
            return {
                type: "tags",
                show_union_goods: "0",
                size: "3",
                size_type: "2",
                buy_btn: "1",
                buy_btn_type: "1",
                title: "0",
                price: "1",
                cart: "1",
                show_wish_btn: "0",
                wish_btn_type: "1",
                show_sub_title: "0",
                sub_entry: new i
            }
        }, initialize: function () {
            this.listenTo(this, "change", this.onChange), this.listenTo(this, "change:size", this.onSizeChange)
        }, onChange: function () {
            var e = this.get("size"), t = this.get("size_type"), n = this.get("buy_btn_type");
            "3" === e && "2" === t && "3" === n && this.set("buy_btn_type", "1"), "1" === e && "3" === t && this.set("price", "1")
        }, onSizeChange: function (e, t) {
            var n = this.get("size_type");
            1 !== +t && 1 === +n && this.set("size_type", "0"), 1 !== +t && 3 === +n && this.set("size_type", "0")
        }, parse: function (e) {
            if (t.isArray(e.sub_entry)) {
                var n = new i;
                t.each(e.sub_entry, function (e) {
                    n.add(e)
                }), e.sub_entry = n
            }
            return e
        }
    });
    return {
        initialize: function (e, n) {
            return t.isUndefined(e) ? new s({sub_entry: new i}) : new s(e, n)
        }
    }
}),define("components/showcase/2.0.0/notice/models/model", ["require", "underscore", "components/showcase/2.0.0/base/models/base"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/models/base"), i = n.extend({
        defaults: {
            type: "notice",
            content: ""
        }, validation: {content: {required: !0, msg: "请填写公告内容"}}
    });
    return {
        initialize: function (e, n) {
            return t.isUndefined(e) ? new i : new i(e, n)
        }
    }
}),define("components/showcase/2.0.0/base/views/edit_base", ["require", "underscore", "jquery", "backbone", "marionette", "core/utils"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("backbone"), s = e("marionette"), o = e("core/utils");
    return s.Layout.extend({
        initialize: function (e) {
            this._setOptions(e), this._bind(), this.triggerMethod("init", e)
        }, _setOptions: function (e) {
            this.options = e || {}, this.layout = this.options.layout
        }, _bind: function () {
            this.listenTo(this, "before:close", this._handleViewBeforeClose), this.listenTo(this, "close", this._handleViewClose), this.listenTo(this.model, "destroy", this.close), this.listenTo(this.model, "change", this._handleModelChange), this.bindValidation()
        }, bindValidation: function () {
            i.Validation.bind(this)
        }, _handleViewBeforeClose: function () {
            this.$(":focus").blur(), this.save()
        }, _handleViewClose: function () {
            this.layout = null
        }, _handleModelChange: function () {
            t.isFunction(this.model.validate) && this.model.validate(this.model.changed)
        }, save: function () {
        }, updateModel: o.updateModel, fullfillUrl: function (e, t) {
            var i = n(e.target), s = n.trim(i.val());
            s = o.urlCheck(s), this.model.set(t, s), i.val(s), e.stopPropagation(), e.stopImmediatePropagation()
        }, sort: function (e, t, n) {
            var i = n.splice(e, 1)[0];
            return n.splice(t, 0, i), n
        }
    })
}),define("text!components/showcase/2.0.0/rich_text/templates/edit.html", [], function () {
    return '<form class="form-horizontal" novalidate>\n\n    <div class="control-group">\n        <div class="pull-left">\n            <label class="control-label">背景颜色：</label>\n            <div class="input-append">\n                <input type="color" value="<%= color %>" name="color" class="span1">\n                <button class="btn js-reset-bg" type="button">重置</button>\n            </div>\n        </div>\n        <div class="pull-left">\n            <label class="control-label">是否全屏：</label>\n            <label class="checkbox inline">\n                <input type="checkbox" name="fullscreen" <% if (fullscreen == 1) { %>checked<% } %>> 全屏显示\n            </label>\n        </div>\n    </div>\n\n    <div class="control-group">\n        <% if (is_fenxiao) { %>\n        <textarea class="js-editor"><%= content %></textarea>\n        <% } else { %>\n        <script class="js-editor" type="text/plain"></script>\n        <% } %>\n    </div>\n</form>\n'
}),define("components/showcase/2.0.0/rich_text/views/edit", ["require", "underscore", "core/utils", "components/showcase/2.0.0/base/views/edit_base", "text!components/showcase/2.0.0/rich_text/templates/edit.html", "components/image/2.0.0/app"], function (e) {
    var t = e("underscore"), n = e("core/utils"), i = e("components/showcase/2.0.0/base/views/edit_base"), s = e("text!components/showcase/2.0.0/rich_text/templates/edit.html"), o = window.UE;
    return window.imageModal = e("components/image/2.0.0/app"), i.extend({
        className: "edit-rich-text",
        template: t.template(s),
        events: {
            "blur textarea": "updateModel",
            'change input[type="color"]': "updateModel",
            'change input[type="checkbox"]': "updateModel",
            "click .js-reset-bg": "handleResetBackground"
        },
        handleResetBackground: function () {
            this.model.set("color", "#F9F9F9"), this.$('input[type="color"]').val("#F9F9F9")
        },
        serializeData: function () {
            var e = this.model.toJSON();
            return n.insertFenxiaoInto(e), e
        },
        onClose: function () {
            this._editor && this._editor.destroy()
        },
        onShow: function () {
            var e, t = this, i = this;
            n.isFenxiao() ? tinyMCE.init({
                selector: ".js-editor",
                language: "zh_CN",
                plugins: ["advlist autolink link lists charmap print preview hr", "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking", "save table contextmenu directionality emoticons template paste textcolor"],
                toolbar1: "fullpage | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | formatselect fontsizeselect",
                toolbar2: "searchreplace | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor imageupload media | forecolor backcolor",
                toolbar3: "table | removeformat | subscript superscript | charmap emoticons | print fullscreen | ltr rtl",
                fontsize_formats: "10px 12px 14px 16px 18px 20px 22px 24px",
                menubar: !1,
                contextmenu: "link inserttable | cell row column deletetable",
                block_formats: "Paragraph=p;Header 1=h1;Header 2=h2;Header 3=h3;Header 4=h4;Header 5=h5;Header 6=h6",
                toolbar_items_size: "small",
                height: 400,
                image_dimensions: !1,
                media_poster: !1,
                media_alt_source: !1,
                media_dimensions: !1,
                link_title: !1,
                object_resizing: "table",
                statusbar: !1,
                setup: function (e) {
                    e.on("change", function (t) {
                        i.model.set("content", e.getContent())
                    }), e.on("blur", function (t) {
                        i.model.set("content", e.getContent())
                    }), t._editor = e, e.addButton("imageupload", {
                        tooltip: "插入图片",
                        icon: "image",
                        onclick: function () {
                            imageModal.initialize({
                                uploadURL: _global.url.fenxiao + "/common/qiniu/upToken.json",
                                hideIconList: !0,
                                callback: function (t) {
                                    if ("[object Array]" == Object.prototype.toString.call(t))for (var s = 0; s < t.length; s++)e.selection.setContent(e.dom.createHTML("img", {src: n.fullfillImage(t[s].attachment_url + "!730x0.jpg")})); else e.selection.setContent(e.dom.createHTML("img", {src: n.fullfillImage(t.attachment_url + "!730x0.jpg")}));
                                    i.model.set("content", e.getContent())
                                }
                            })
                        }
                    })
                }
            }) : (e = this._editor = new o.ui.Editor({
                toolbars: [["bold", "italic", "underline", "strikethrough", "forecolor", "backcolor", "justifyleft", "justifycenter", "justifyright", "|", "insertunorderedlist", "insertorderedlist", "blockquote"], ["emotion", "uploadimage", "insertvideo", "link", "removeformat", "|", "rowspacingtop", "rowspacingbottom", "lineheight", "paragraph", "fontsize"], ["inserttable", "deletetable", "insertparagraphbeforetable", "insertrow", "deleterow", "insertcol", "deletecol", "mergecells", "mergeright", "mergedown", "splittocells", "splittorows", "splittocols"]],
                autoClearinitialContent: !1,
                autoFloatEnabled: !0,
                wordCount: !0,
                elementPathEnabled: !1,
                maximumWords: 1e4,
                initialFrameWidth: 458,
                initialFrameHeight: 600,
                focus: !1
            }), e.addListener("blur", function () {
                t.model.set("content", t._editor.getContent())
            }), e.addListener("contentChange", function () {
                t.model.set("content", t._editor.getContent())
            }), e.render(this.$(".js-editor")[0]), e.ready(function () {
                e.setContent(t.model.get("content"))
            }))
        },
        save: function () {
            this._editor && this.model.set("content", this._editor.getContent())
        }
    })
}),define("text!components/showcase/2.0.0/goods/templates/edit.html", [], function () {
    return '<form class="form-horizontal" novalidate>\n    <div class="control-group">\n        <label class="control-label">选择商品：</label>\n        <div class="controls">\n            <ul class="module-goods-list clearfix" name="goods">\n                <% _.each(goods, function(item, index) { %>\n                    <li class="sort">\n                        <a href="<%= item.url %>" target="_blank"><img src="<%= fullfillImage(item.image_url) %>" alt="商品图" width="50" height="50"></a>\n                        <a class="close-modal js-delete-goods small hide" data-id="<% item.id %>" title="删除">×</a>\n                    </li>\n                <% }); %>\n                <li>\n                    <a href="javascript:void(0);" class="js-add-goods add-goods"><i class="icon-add"></i></a>\n                </li>\n            </ul>\n        </div>\n    </div>\n</form>\n<div class="js-goods-style-region" style="margin-top: 10px;"></div>\n'
}),define("text!components/modal/1.0.0/templates/modal.html", [], function () {
    return '<% if (type === \'goods\' || type === \'fenxiao_goods\') { %>\n<div class="modal fade hide js-goods-modal">\n    <div class="modal-header">\n        <a class="close js-news-modal-dismiss" data-dismiss="modal">×</a>\n        <!-- 顶部tab -->\n        <ul class="module-nav modal-tab">\n\n        </ul>\n    </div>\n    <div class="modal-body">\n        <div class="tab-content">\n\n        </div>\n    </div>\n    <div class="modal-footer clearfix">\n        <div style="display:none;" class="js-confirm-choose pull-left">\n            <input type="button" class="btn btn-primary" value="确定使用">\n        </div>\n        <div class="pagenavi">\n\n        </div>\n    </div>\n</div>\n<% } else { %>\n<div class="modal fade hide js-modal">\n    <div class="modal-header">\n        <a class="close js-news-modal-dismiss" data-dismiss="modal">×</a>\n        <!-- 顶部tab -->\n        <ul class="module-nav modal-tab">\n\n        </ul>\n    </div>\n    <div class="modal-body">\n        <div class="tab-content">\n\n        </div>\n    </div>\n    <div class="modal-footer">\n        <div style="display:none;" class="js-confirm-choose pull-left">\n            <input type="button" class="btn btn-primary" value="确定使用">\n        </div>\n        <div class="pagenavi">\n\n        </div>\n    </div>\n</div>\n<% } %>\n'
}),define("text!components/modal/1.0.0/templates/modal_link.html", [], function () {
    return '    <a href="<%= link %>" target="_blank" class="new_window"><%= text %></a>\n    <% if (!isLast) { %>-<% } %>'
}),define("text!components/modal/1.0.0/templates/modal_pane.html", [], function () {
    return '<% if (type !== \'image\') { %>\n<table class="table">\n    <% if(type === \'activity\' || type === "survey") { %>\n    <colgroup>\n        <col class="modal-col-title">\n        <col class="modal-col-time">\n        <col class="modal-col-action">\n    </colgroup>\n    <% } else { %>\n    <colgroup>\n        <col class="modal-col-title">\n        <col class="modal-col-time" span="2">\n        <col class="modal-col-action">\n    </colgroup>\n    <% } %>\n    <!-- 表格头部 -->\n    <thead>\n\n    </thead>\n    <!-- 表格数据区 -->\n    <tbody>\n\n    </tbody>\n</table>\n<% } else { %>\n<div class="module-header"></div>\n<ul class="module-body clearfix"></ul>\n<% } %>\n'
}),define("text!components/modal/1.0.0/templates/modal_row.html", [], function () {
    return '<% if (type === \'image\') { %>\n    <div class="js-choose" title="<%= attachment_title %>">\n        <p class="image-size"><%= attachment_title.slice(0, 5) %><br><%= (size / 1000).toFixed(1) %> KB</p>\n        <img src="<%= window._global.url.imgqn %>/<%= thumb_url %>" width="60" height="60" />\n    </div>\n    <label class="multi-select-container hide">\n        <input type="checkbox" class="multi-select js-multi-select">\n    </label>\n<% } else if (type === \'guang_activity\' || type === \'activity\' || type === \'survey\' || type === \'grab\' || type === \'guaguale\') { %>\n    <td class="title">\n        <div class="td-cont">\n            <a target="_blank" class="new_window" href="<%= link %>"><%= title %></a>\n        </div>\n    </td>\n    <td class="time">\n        <div class="td-cont">\n            <span><%= start_time %></span>\n        </div>\n    </td>\n    <td class="time">\n        <div class="td-cont">\n            <span><%= end_time %></span>\n        </div>\n    </td>\n    <td class="opts">\n        <div class="td-cont">\n            <button class="btn js-choose" href="#" data-id="<%= data_id %>" data-url="<%= data_url %>" data-page-type="<%= type %>" data-cover-attachment-id="<%= data_cover_attachment_id %>" data-cover-attachment-url="<%= data_cover_attachment_url %>" data-title="<%= data_title %>" data-alias="<%= data_alias %>">选取</button>\n        </div>\n    </td>\n<% } else if (type === \'mpNews\' || type === \'news\' || type === \'multiNews\' || type === \'articles\' || type === \'fenxiao_imagetext\') { %>\n    <td class="title">\n        <div class="td-cont">\n        <% if (news && news.length > 1) { %>\n            <div class="ng ng-multiple">\n            <% for (var index in news) { %>\n                <% if (news[index] && news.hasOwnProperty(index)) { %>\n                    <% if (news[index].title.indexOf(\'　　点此查看更多\') !== -1) { %>\n                        <div class="ng-item">\n                            <div class="ng-title">\n                                <a href="javascript:;" target="_blank" class="new_window" title=""><%=news[index] %></a>\n                            </div>\n                        </div>\n                    <% } else { %>\n                    <div class="ng-item">\n                        <span class="label label-success">图文<%=Number(index) + 1%></span>\n                        <div class="ng-title">\n                            <a href="<%= news[index] && news[index].url %>" class="new_window" title="<%=news[index].title %>">\n                                <%=news[index].title %>\n                            </a>\n                        </div>\n                    </div>\n                    <% } %>\n                    <% } %>\n            <% } %>\n            </div>\n        <% } else { %>\n            <div class="ng ng-single">\n                <div class="ng-item">\n                    <div class="ng-title">\n                        <a href="<%= news[0] && news[0].url %>" target="_blank" class="new-window" title="<%= news[0] &&news[0].title %>"><%= news[0] && news[0].title %></a>\n                    </div>\n                </div>\n                <div class="ng-item view-more">\n                    <a href="<%= news[0] && news[0].url %>" class="clearfix new-window">\n                        <span class="pull-left">阅读全文</span>\n                        <span class="pull-right">&gt;</span>\n                    </a>\n                </div>\n            </div>\n        <% } %>\n        </div>\n    </td>\n\n    <td class="time">\n        <div class="td-cont">\n            <span><%= time %></span>\n        </div>\n    </td>\n    <td class="opts">\n        <div class="td-cont">\n            <button class="btn js-choose" href="#" data-id="<%= data_id %>" data-url="<%= data_url %>" data-page-type="<%= type %>" data-cover-attachment-id="<%= data_cover_attachment_id %>" data-cover-attachment-url="<%= data_cover_attachment_url %>" data-title="<%= data_title %>" data-alias="<%= data_alias %>">选取</button>\n        </div>\n    </td>\n<% } else if (type === \'goods\' || type === \'fenxiao_goods\') { %>\n    <td class="title">\n        <div class="td-cont">\n            <a target="_blank" class="new_window" href="<%= link %>" data-cover-attachment-url="<%= data_cover_attachment_url %>"><%= title %></a>\n        </div>\n    </td>\n\n    <td class="time">\n        <div class="td-cont">\n            <span><%= time %></span>\n        </div>\n    </td>\n    <td class="opts">\n        <div class="td-cont">\n            <button class="btn js-choose" href="javascript:void(0);">选取</button>\n        </div>\n    </td>\n<% } else if (type === \'tradeincard\') { %>\n    <td class="">\n        <div class="td-cont">\n            <span><%= name %></span>\n        </div>\n    </td>\n\n    <td class="">\n        <div class="td-cont">\n            <span><%= value %></span>\n        </div>\n    </td>\n    <td class="">\n        <div class="td-cont">\n            <span>\n                <% if(at_least) { %>\n                    满<%= at_least %>元可用\n                <% } else { %>\n                    无限制\n                <% } %>\n                \n            </span>\n        </div>\n    </td>\n    <td class="opts">\n        <div class="td-cont">\n            <button class="btn js-choose" href="javascript:void(0);">选取</button>\n        </div>\n    </td>\n<% } else if (type === \'storelist\') { %>\n    <td class="title">\n        <div class="td-cont">\n            <span><%= name %></span>\n        </div>\n    </td>\n    <td>\n        <div class="td-cont">\n            <span><%- area %><%- address %></span>\n        </div>\n    </td>\n    <td class="opts">\n        <div class="td-cont">\n            <button class="btn js-choose" href="javascript:void(0);" data-id="<%= id %>" data-name="<%= name %>" data-address="<%- address %>">选取</button>\n        </div>\n    </td>\n<% } else { %>\n    <td class="title">\n        <div class="td-cont">\n            <a target="_blank" class="new_window" href="<%= link %>"><%= title %></a>\n        </div>\n    </td>\n\n    <td class="time">\n        <div class="td-cont">\n            <span><%= time %></span>\n        </div>\n    </td>\n    <td class="opts">\n        <div class="td-cont">\n            <button class="btn js-choose" href="#" data-id="<%= data_id %>" data-url="<%= data_url %>" data-page-type="<%= type %>" data-cover-attachment-id="<%= data_cover_attachment_id %>" data-cover-attachment-url="<%= data_cover_attachment_url %>" data-title="<%= data_title %>" data-alias="<%= data_alias %>">选取</button>\n        </div>\n    </td>\n<% } %>\n'
}),define("text!components/modal/1.0.0/templates/modal_tab.html", [], function () {
    return '<a href="#js-module-<%= type %>" data-type="<%= type %>" class="js-modal-tab"><%= tab %></a><% if (!isLast) { %> | <% } %>\n'
}),define("text!components/modal/1.0.0/templates/modal_thead.html", [], function () {
    return '    <% if (type === \'image\') { %>\n    <p class="help-inline">点击图片即可选中 <a class="js-update" href="javascript:void(0);">刷新</a></p>\n    <form class="form-search search-box">\n        <div class="input-append">\n            <input class="input-small js-modal-search-input" type="text"/>\n			<a href="javascript:void(0);" class="btn js-fetch-page js-modal-search" data-action-type="search">搜</a>\n        </div>\n    </form>\n    <% } else if (type === \'guang_activity\' || type === \'activity\' || type === \'survey\' || type === \'grab\' || type === \'guaguale\') { %>\n    <tr>\n        <th class="title">\n            <div class="td-cont">\n                <span><%= title %></span> <a class="js-update" href="javascript:void(0);">刷新</a>\n            </div>\n        </th>\n        <th class="time">\n            <span></span>\n        </th>\n        <th class="time">\n            <div class="td-cont">\n                <span>有效时间</span>\n            </div>\n        </th>\n        <th class="opts">\n            <div class="td-cont">\n                <form class="form-search">\n                    <div class="input-append">\n                        <input class="input-small js-modal-search-input" type="text"/><a href="javascript:void(0);" class="btn js-fetch-page js-modal-search" data-action-type="search">搜</a>\n                    </div>\n                </form>\n            </div>\n        </th>\n    </tr>\n    <% } else if(type === \'tradeincard\') { %>\n    <tr>\n        <th class="">\n            <div class="td-cont">\n                <span>名称</span> <a class="js-update" href="javascript:void(0);">刷新</a>\n            </div>\n        </th>\n        <th>\n            <div class="td-cont">面值</div>\n        </th>\n        <th style="width: 30%;">\n            <div class="td-cont">使用条件</div>\n        </th>\n        <th class="opts">\n            <div class="td-cont">\n                <form class="form-search">\n                    <div class="input-append">\n                        <input class="input-small js-modal-search-input" type="text"/><a href="javascript:void(0);" class="btn js-fetch-page js-modal-search" data-action-type="search">搜</a>\n                    </div>\n                </form>\n            </div>\n        </th>\n    </tr>\n    <% } else if(type === \'storelist\') { %>\n        <tr>\n            <th width="30%">\n                <div class="td-cont">\n                    <span>门店名称</span> <a class="js-update" href="javascript:void(0);">刷新</a>\n                </div>\n            </th>\n            <th width="50%">\n                <div class="td-cont">地址</div>\n            </th>\n            <th width="20%">\n                <div class="td-cont">\n                    <form class="form-search">\n                        <div class="input-append">\n                            <input class="input-small js-modal-search-input" type="text"/><a href="javascript:void(0);" class="btn js-fetch-page js-modal-search" data-action-type="search">搜</a>\n                        </div>\n                    </form>\n                </div>\n            </th>\n        </tr>\n    <% } else {%>\n    <tr>\n        <th class="title">\n            <div class="td-cont">\n                <span><%= title %></span> <a class="js-update" href="javascript:void(0);">刷新</a>\n            </div>\n        </th>\n        <th class="time">\n            <div class="td-cont">\n                <span><%= time %></span>\n            </div>\n        </th>\n        <th class="opts">\n            <div class="td-cont">\n                <form class="form-search">\n                    <div class="input-append">\n                        <input class="input-small js-modal-search-input" type="text"/><a href="javascript:void(0);" class="btn js-fetch-page js-modal-search" data-action-type="search">搜</a>\n                    </div>\n                </form>\n            </div>\n        </th>\n    </tr>\n    <% } %>\n'
}),define("text!components/modal/1.0.0/templates/modal_dropdown.html", [], function () {
    return '    <a href="javascript:void(0);" data-toggle="dropdown" data-hover="dropdown" data-delay="200">+新建营销活动<b class="caret"></b></a>\n    <ul class="dropdown-menu">\n        <li><a href="/v2/apps/cards#create" target="_blank">刮刮乐</a></li>\n        <li><a href="/v2/apps/wheel#create" target="_blank">幸运大抽奖</a></li>\n        <li><a href="/v2/apps/zodiac#create" target="_blank">生肖翻翻看</a></li>\n        <li><a href="/v2/apps/crazyguess#create" target="_blank">疯狂猜猜猜</a></li>\n        <li><a href="/activity/add?activity_type=6" target="_blank">随便逛一逛</a></li>\n    </ul>\n';
}),define("text!components/modal/1.0.0/templates/modal_static.html", [], function () {
    return '<div class="get-web-img">\n    <form class="form-horizontal" action="<%= window._global.url.img %>/download" method="post">\n        <div class="control-group">\n            <label class="control-label">网络图片：</label>\n            <div class="controls">\n                <input type="text" name="attachment_url" class="get-web-img-input js-web-img-input" placeholder="请贴入网络图片地址">\n                <a href="javascript:;" class="btn js-preview-img">提取</a>\n            </div>\n            <div class="controls preview-container js-download-img">\n            </div>\n        </div>\n    </form>\n</div>\n<div class="upload-local-img">\n    <div class="form-horizontal">\n        <div class="control-group">\n            <label class="control-label">本地图片：</label>\n            <div class="controls preview-container js-upload-img">\n            </div>\n            <div class="controls">\n                <div class="fileinput-button">\n                    <a href="javascript:;" data-toggle-text="重新选择..." class="control-action">添加图片...</a>\n                    <input class="js-fileupload fileupload" type="file" name="upload_file[]" data-url="<%= window._global.url.img + \'/uploadmultiple?format=json\' %>" multiple>\n                </div>\n                <p class="help-desc">最大支持 1 MB 的图片( jpg / gif / png )</p>\n            </div>\n        </div>\n    </div>\n</div>\n'
}),define("text!components/modal/1.0.0/templates/modal_static_footer.html", [], function () {
    return '<div class="form-action">\n    <button type="button" class="btn btn-primary js-confirm-upload-image" data-loading-text="正在上传...">确定使用</button>\n    <a href="javascript:void(0);" data-dismiss="modal" class="btn btn-cancel">取消</a>\n</div>\n'
}),function (e) {
    "function" == typeof define && define.amd ? define("fileupload", ["jquery", "jqueryui"], e) : e(window.jQuery)
}(function (e) {
    e.support.fileInput = !(new RegExp("(Android (1\\.[0156]|2\\.[01]))|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)|(w(eb)?OSBrowser)|(webOS)|(Kindle/(1\\.0|2\\.[05]|3\\.0))").test(window.navigator.userAgent) || e('<input type="file">').prop("disabled")), e.support.xhrFileUpload = !(!window.XMLHttpRequestUpload || !window.FileReader), e.support.xhrFormDataFileUpload = !!window.FormData, e.support.blobSlice = window.Blob && (Blob.prototype.slice || Blob.prototype.webkitSlice || Blob.prototype.mozSlice), e.widget("blueimp.fileupload", {
        options: {
            dropZone: e(document),
            pasteZone: e(document),
            fileInput: void 0,
            replaceFileInput: !0,
            paramName: void 0,
            singleFileUploads: !0,
            limitMultiFileUploads: void 0,
            sequentialUploads: !1,
            limitConcurrentUploads: void 0,
            forceIframeTransport: !1,
            redirect: void 0,
            redirectParamName: void 0,
            postMessage: void 0,
            multipart: !0,
            maxChunkSize: void 0,
            uploadedBytes: void 0,
            recalculateProgress: !0,
            progressInterval: 100,
            bitrateInterval: 500,
            autoUpload: !0,
            messages: {uploadedBytes: "Uploaded bytes exceed file size"},
            i18n: function (t, n) {
                return t = this.messages[t] || t.toString(), n && e.each(n, function (e, n) {
                    t = t.replace("{" + e + "}", n)
                }), t
            },
            formData: function (e) {
                return e.serializeArray()
            },
            add: function (t, n) {
                (n.autoUpload || n.autoUpload !== !1 && e(this).fileupload("option", "autoUpload")) && n.process().done(function () {
                    n.submit()
                })
            },
            processData: !1,
            contentType: !1,
            cache: !1
        },
        _specialOptions: ["fileInput", "dropZone", "pasteZone", "multipart", "forceIframeTransport"],
        _blobSlice: e.support.blobSlice && function () {
            var e = this.slice || this.webkitSlice || this.mozSlice;
            return e.apply(this, arguments)
        },
        _BitrateTimer: function () {
            this.timestamp = Date.now ? Date.now() : (new Date).getTime(), this.loaded = 0, this.bitrate = 0, this.getBitrate = function (e, t, n) {
                var i = e - this.timestamp;
                return (!this.bitrate || !n || i > n) && (this.bitrate = (t - this.loaded) * (1e3 / i) * 8, this.loaded = t, this.timestamp = e), this.bitrate
            }
        },
        _isXHRUpload: function (t) {
            return !t.forceIframeTransport && (!t.multipart && e.support.xhrFileUpload || e.support.xhrFormDataFileUpload)
        },
        _getFormData: function (t) {
            var n;
            return "function" == typeof t.formData ? t.formData(t.form) : e.isArray(t.formData) ? t.formData : "object" === e.type(t.formData) ? (n = [], e.each(t.formData, function (e, t) {
                n.push({name: e, value: t})
            }), n) : []
        },
        _getTotal: function (t) {
            var n = 0;
            return e.each(t, function (e, t) {
                n += t.size || 1
            }), n
        },
        _initProgressObject: function (t) {
            var n = {loaded: 0, total: 0, bitrate: 0};
            t._progress ? e.extend(t._progress, n) : t._progress = n
        },
        _initResponseObject: function (e) {
            var t;
            if (e._response)for (t in e._response)e._response.hasOwnProperty(t) && delete e._response[t]; else e._response = {}
        },
        _onProgress: function (e, t) {
            if (e.lengthComputable) {
                var n, i = Date.now ? Date.now() : (new Date).getTime();
                if (t._time && t.progressInterval && i - t._time < t.progressInterval && e.loaded !== e.total)return;
                t._time = i, n = Math.floor(e.loaded / e.total * (t.chunkSize || t._progress.total)) + (t.uploadedBytes || 0), this._progress.loaded += n - t._progress.loaded, this._progress.bitrate = this._bitrateTimer.getBitrate(i, this._progress.loaded, t.bitrateInterval), t._progress.loaded = t.loaded = n, t._progress.bitrate = t.bitrate = t._bitrateTimer.getBitrate(i, n, t.bitrateInterval), this._trigger("progress", e, t), this._trigger("progressall", e, this._progress)
            }
        },
        _initProgressListener: function (t) {
            var n = this, i = t.xhr ? t.xhr() : e.ajaxSettings.xhr();
            i.upload && (e(i.upload).bind("progress", function (e) {
                var i = e.originalEvent;
                e.lengthComputable = i.lengthComputable, e.loaded = i.loaded, e.total = i.total, n._onProgress(e, t)
            }), t.xhr = function () {
                return i
            })
        },
        _isInstanceOf: function (e, t) {
            return Object.prototype.toString.call(t) === "[object " + e + "]"
        },
        _initXHRData: function (t) {
            var n, i = this, s = t.files[0], o = t.multipart || !e.support.xhrFileUpload, a = t.paramName[0];
            t.headers = t.headers || {}, t.contentRange && (t.headers["Content-Range"] = t.contentRange), o && !t.blob && this._isInstanceOf("File", s) || (t.headers["Content-Disposition"] = 'attachment; filename="' + encodeURI(s.name) + '"'), o ? e.support.xhrFormDataFileUpload && (t.postMessage ? (n = this._getFormData(t), t.blob ? n.push({
                name: a,
                value: t.blob
            }) : e.each(t.files, function (e, i) {
                n.push({name: t.paramName[e] || a, value: i})
            })) : (i._isInstanceOf("FormData", t.formData) ? n = t.formData : (n = new FormData, e.each(this._getFormData(t), function (e, t) {
                n.append(t.name, t.value)
            })), t.blob ? n.append(a, t.blob, s.name) : e.each(t.files, function (e, s) {
                (i._isInstanceOf("File", s) || i._isInstanceOf("Blob", s)) && n.append(t.paramName[e] || a, s, s.name)
            })), t.data = n) : (t.contentType = s.type, t.data = t.blob || s), t.blob = null
        },
        _initIframeSettings: function (t) {
            var n = e("<a></a>").prop("href", t.url).prop("host");
            t.dataType = "iframe " + (t.dataType || ""), t.formData = this._getFormData(t), t.redirect && n && n !== location.host && t.formData.push({
                name: t.redirectParamName || "redirect",
                value: t.redirect
            })
        },
        _initDataSettings: function (e) {
            this._isXHRUpload(e) ? (this._chunkedUpload(e, !0) || (e.data || this._initXHRData(e), this._initProgressListener(e)), e.postMessage && (e.dataType = "postmessage " + (e.dataType || ""))) : this._initIframeSettings(e)
        },
        _getParamName: function (t) {
            var n = e(t.fileInput), i = t.paramName;
            return i ? e.isArray(i) || (i = [i]) : (i = [], n.each(function () {
                for (var t = e(this), n = t.prop("name") || "files[]", s = (t.prop("files") || [1]).length; s;)i.push(n), s -= 1
            }), i.length || (i = [n.prop("name") || "files[]"])), i
        },
        _initFormSettings: function (t) {
            t.form && t.form.length || (t.form = e(t.fileInput.prop("form")), t.form.length || (t.form = e(this.options.fileInput.prop("form")))), t.paramName = this._getParamName(t), t.url || (t.url = t.form.prop("action") || location.href), t.type = (t.type || t.form.prop("method") || "").toUpperCase(), "POST" !== t.type && "PUT" !== t.type && "PATCH" !== t.type && (t.type = "POST"), t.formAcceptCharset || (t.formAcceptCharset = t.form.attr("accept-charset"))
        },
        _getAJAXSettings: function (t) {
            var n = e.extend({}, this.options, t);
            return this._initFormSettings(n), this._initDataSettings(n), n
        },
        _getDeferredState: function (e) {
            return e.state ? e.state() : e.isResolved() ? "resolved" : e.isRejected() ? "rejected" : "pending"
        },
        _enhancePromise: function (e) {
            return e.success = e.done, e.error = e.fail, e.complete = e.always, e
        },
        _getXHRPromise: function (t, n, i) {
            var s = e.Deferred(), o = s.promise();
            return n = n || this.options.context || o, t === !0 ? s.resolveWith(n, i) : t === !1 && s.rejectWith(n, i), o.abort = s.promise, this._enhancePromise(o)
        },
        _addConvenienceMethods: function (t, n) {
            var i = this, s = function (t) {
                return e.Deferred().resolveWith(i, [t]).promise()
            };
            n.process = function (e, t) {
                return (e || t) && (n._processQueue = this._processQueue = (this._processQueue || s(this)).pipe(e, t)), this._processQueue || s(this)
            }, n.submit = function () {
                return "pending" !== this.state() && (n.jqXHR = this.jqXHR = i._trigger("submit", t, this) !== !1 && i._onSend(t, this)), this.jqXHR || i._getXHRPromise()
            }, n.abort = function () {
                return this.jqXHR ? this.jqXHR.abort() : i._getXHRPromise()
            }, n.state = function () {
                return this.jqXHR ? i._getDeferredState(this.jqXHR) : this._processQueue ? i._getDeferredState(this._processQueue) : void 0
            }, n.progress = function () {
                return this._progress
            }, n.response = function () {
                return this._response
            }
        },
        _getUploadedBytes: function (e) {
            var t = e.getResponseHeader("Range"), n = t && t.split("-"), i = n && n.length > 1 && parseInt(n[1], 10);
            return i && i + 1
        },
        _chunkedUpload: function (t, n) {
            t.uploadedBytes = t.uploadedBytes || 0;
            var i, s, o = this, a = t.files[0], l = a.size, c = t.uploadedBytes, r = t.maxChunkSize || l, d = this._blobSlice, p = e.Deferred(), u = p.promise();
            return this._isXHRUpload(t) && d && (c || l > r) && !t.data ? n ? !0 : c >= l ? (a.error = t.i18n("uploadedBytes"), this._getXHRPromise(!1, t.context, [null, "error", a.error])) : (s = function () {
                var n = e.extend({}, t), u = n._progress.loaded;
                n.blob = d.call(a, c, c + r, a.type), n.chunkSize = n.blob.size, n.contentRange = "bytes " + c + "-" + (c + n.chunkSize - 1) + "/" + l, o._initXHRData(n), o._initProgressListener(n), i = (o._trigger("chunksend", null, n) !== !1 && e.ajax(n) || o._getXHRPromise(!1, n.context)).done(function (i, a, r) {
                    c = o._getUploadedBytes(r) || c + n.chunkSize, u + n.chunkSize - n._progress.loaded && o._onProgress(e.Event("progress", {
                        lengthComputable: !0,
                        loaded: c - n.uploadedBytes,
                        total: c - n.uploadedBytes
                    }), n), t.uploadedBytes = n.uploadedBytes = c, n.result = i, n.textStatus = a, n.jqXHR = r, o._trigger("chunkdone", null, n), o._trigger("chunkalways", null, n), l > c ? s() : p.resolveWith(n.context, [i, a, r])
                }).fail(function (e, t, i) {
                    n.jqXHR = e, n.textStatus = t, n.errorThrown = i, o._trigger("chunkfail", null, n), o._trigger("chunkalways", null, n), p.rejectWith(n.context, [e, t, i])
                })
            }, this._enhancePromise(u), u.abort = function () {
                return i.abort()
            }, s(), u) : !1
        },
        _beforeSend: function (e, t) {
            0 === this._active && (this._trigger("start"), this._bitrateTimer = new this._BitrateTimer, this._progress.loaded = this._progress.total = 0, this._progress.bitrate = 0), this._initResponseObject(t), this._initProgressObject(t), t._progress.loaded = t.loaded = t.uploadedBytes || 0, t._progress.total = t.total = this._getTotal(t.files) || 1, t._progress.bitrate = t.bitrate = 0, this._active += 1, this._progress.loaded += t.loaded, this._progress.total += t.total
        },
        _onDone: function (t, n, i, s) {
            var o = s._progress.total, a = s._response;
            s._progress.loaded < o && this._onProgress(e.Event("progress", {
                lengthComputable: !0,
                loaded: o,
                total: o
            }), s), a.result = s.result = t, a.textStatus = s.textStatus = n, a.jqXHR = s.jqXHR = i, this._trigger("done", null, s)
        },
        _onFail: function (e, t, n, i) {
            var s = i._response;
            i.recalculateProgress && (this._progress.loaded -= i._progress.loaded, this._progress.total -= i._progress.total), s.jqXHR = i.jqXHR = e, s.textStatus = i.textStatus = t, s.errorThrown = i.errorThrown = n, this._trigger("fail", null, i)
        },
        _onAlways: function (e, t, n, i) {
            this._trigger("always", null, i)
        },
        _onSend: function (t, n) {
            n.submit || this._addConvenienceMethods(t, n);
            var i, s, o, a, l = this, c = l._getAJAXSettings(n), r = function () {
                return l._sending += 1, c._bitrateTimer = new l._BitrateTimer, i = i || ((s || l._trigger("send", t, c) === !1) && l._getXHRPromise(!1, c.context, s) || l._chunkedUpload(c) || e.ajax(c)).done(function (e, t, n) {
                        l._onDone(e, t, n, c)
                    }).fail(function (e, t, n) {
                        l._onFail(e, t, n, c)
                    }).always(function (e, t, n) {
                        if (l._onAlways(e, t, n, c), l._sending -= 1, l._active -= 1, c.limitConcurrentUploads && c.limitConcurrentUploads > l._sending)for (var i = l._slots.shift(); i;) {
                            if ("pending" === l._getDeferredState(i)) {
                                i.resolve();
                                break
                            }
                            i = l._slots.shift()
                        }
                        0 === l._active && l._trigger("stop")
                    })
            };
            return this._beforeSend(t, c), this.options.sequentialUploads || this.options.limitConcurrentUploads && this.options.limitConcurrentUploads <= this._sending ? (this.options.limitConcurrentUploads > 1 ? (o = e.Deferred(), this._slots.push(o), a = o.pipe(r)) : (this._sequence = this._sequence.pipe(r, r), a = this._sequence), a.abort = function () {
                return s = [void 0, "abort", "abort"], i ? i.abort() : (o && o.rejectWith(c.context, s), r())
            }, this._enhancePromise(a)) : r()
        },
        _onAdd: function (t, n) {
            var i, s, o, a, l = this, c = !0, r = e.extend({}, this.options, n), d = r.limitMultiFileUploads, p = this._getParamName(r);
            if ((r.singleFileUploads || d) && this._isXHRUpload(r))if (!r.singleFileUploads && d)for (o = [], i = [], a = 0; a < n.files.length; a += d)o.push(n.files.slice(a, a + d)), s = p.slice(a, a + d), s.length || (s = p), i.push(s); else i = p; else o = [n.files], i = [p];
            return n.originalFiles = n.files, e.each(o || n.files, function (s, a) {
                var r = e.extend({}, n);
                return r.files = o ? a : [a], r.paramName = i[s], l._initResponseObject(r), l._initProgressObject(r), l._addConvenienceMethods(t, r), c = l._trigger("add", t, r)
            }), c
        },
        _replaceFileInput: function (t) {
            var n = t.clone(!0);
            e("<form></form>").append(n)[0].reset(), t.after(n).detach(), e.cleanData(t.unbind("remove")), this.options.fileInput = this.options.fileInput.map(function (e, i) {
                return i === t[0] ? n[0] : i
            }), t[0] === this.element[0] && (this.element = n)
        },
        _handleFileTreeEntry: function (t, n) {
            var i, s = this, o = e.Deferred(), a = function (e) {
                e && !e.entry && (e.entry = t), o.resolve([e])
            };
            return n = n || "", t.isFile ? t._file ? (t._file.relativePath = n, o.resolve(t._file)) : t.file(function (e) {
                e.relativePath = n, o.resolve(e)
            }, a) : t.isDirectory ? (i = t.createReader(), i.readEntries(function (e) {
                s._handleFileTreeEntries(e, n + t.name + "/").done(function (e) {
                    o.resolve(e)
                }).fail(a)
            }, a)) : o.resolve([]), o.promise()
        },
        _handleFileTreeEntries: function (t, n) {
            var i = this;
            return e.when.apply(e, e.map(t, function (e) {
                return i._handleFileTreeEntry(e, n)
            })).pipe(function () {
                return Array.prototype.concat.apply([], arguments)
            })
        },
        _getDroppedFiles: function (t) {
            t = t || {};
            var n = t.items;
            return n && n.length && (n[0].webkitGetAsEntry || n[0].getAsEntry) ? this._handleFileTreeEntries(e.map(n, function (e) {
                var t;
                return e.webkitGetAsEntry ? (t = e.webkitGetAsEntry(), t && (t._file = e.getAsFile()), t) : e.getAsEntry()
            })) : e.Deferred().resolve(e.makeArray(t.files)).promise()
        },
        _getSingleFileInputFiles: function (t) {
            t = e(t);
            var n, i, s = t.prop("webkitEntries") || t.prop("entries");
            if (s && s.length)return this._handleFileTreeEntries(s);
            if (n = e.makeArray(t.prop("files")), n.length)void 0 === n[0].name && n[0].fileName && e.each(n, function (e, t) {
                t.name = t.fileName, t.size = t.fileSize
            }); else {
                if (i = t.prop("value"), !i)return e.Deferred().resolve([]).promise();
                n = [{name: i.replace(/^.*\\/, "")}]
            }
            return e.Deferred().resolve(n).promise()
        },
        _getFileInputFiles: function (t) {
            return t instanceof e && 1 !== t.length ? e.when.apply(e, e.map(t, this._getSingleFileInputFiles)).pipe(function () {
                return Array.prototype.concat.apply([], arguments)
            }) : this._getSingleFileInputFiles(t)
        },
        _onChange: function (t) {
            var n = this, i = {fileInput: e(t.target), form: e(t.target.form)};
            this._getFileInputFiles(i.fileInput).always(function (e) {
                i.files = e, n.options.replaceFileInput && n._replaceFileInput(i.fileInput), n._trigger("change", t, i) !== !1 && n._onAdd(t, i)
            })
        },
        _onPaste: function (t) {
            var n = t.originalEvent && t.originalEvent.clipboardData && t.originalEvent.clipboardData.items, i = {files: []};
            return n && n.length && (e.each(n, function (e, t) {
                var n = t.getAsFile && t.getAsFile();
                n && i.files.push(n)
            }), this._trigger("paste", t, i) === !1 || this._onAdd(t, i) === !1) ? !1 : void 0
        },
        _onDrop: function (e) {
            e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
            var t = this, n = e.dataTransfer, i = {};
            n && n.files && n.files.length && (e.preventDefault(), this._getDroppedFiles(n).always(function (n) {
                i.files = n, t._trigger("drop", e, i) !== !1 && t._onAdd(e, i)
            }))
        },
        _onDragOver: function (t) {
            t.dataTransfer = t.originalEvent && t.originalEvent.dataTransfer;
            var n = t.dataTransfer;
            if (n) {
                if (this._trigger("dragover", t) === !1)return !1;
                -1 !== e.inArray("Files", n.types) && (n.dropEffect = "copy", t.preventDefault())
            }
        },
        _initEventHandlers: function () {
            this._isXHRUpload(this.options) && (this._on(this.options.dropZone, {
                dragover: this._onDragOver,
                drop: this._onDrop
            }), this._on(this.options.pasteZone, {paste: this._onPaste})), e.support.fileInput && this._on(this.options.fileInput, {change: this._onChange})
        },
        _destroyEventHandlers: function () {
            this._off(this.options.dropZone, "dragover drop"), this._off(this.options.pasteZone, "paste"), this._off(this.options.fileInput, "change")
        },
        _setOption: function (t, n) {
            var i = -1 !== e.inArray(t, this._specialOptions);
            i && this._destroyEventHandlers(), this._super(t, n), i && (this._initSpecialOptions(), this._initEventHandlers())
        },
        _initSpecialOptions: function () {
            var t = this.options;
            void 0 === t.fileInput ? t.fileInput = this.element.is('input[type="file"]') ? this.element : this.element.find('input[type="file"]') : t.fileInput instanceof e || (t.fileInput = e(t.fileInput)), t.dropZone instanceof e || (t.dropZone = e(t.dropZone)), t.pasteZone instanceof e || (t.pasteZone = e(t.pasteZone))
        },
        _getRegExp: function (e) {
            var t = e.split("/"), n = t.pop();
            return t.shift(), new RegExp(t.join("/"), n)
        },
        _isRegExpOption: function (t, n) {
            return "url" !== t && "string" === e.type(n) && /^\/.*\/[igm]{0,3}$/.test(n)
        },
        _initDataAttributes: function () {
            var t = this, n = this.options;
            e.each(e(this.element[0].cloneNode(!1)).data(), function (e, i) {
                t._isRegExpOption(e, i) && (i = t._getRegExp(i)), n[e] = i
            })
        },
        _create: function () {
            this._initDataAttributes(), this._initSpecialOptions(), this._slots = [], this._sequence = this._getXHRPromise(!0), this._sending = this._active = 0, this._initProgressObject(this), this._initEventHandlers()
        },
        active: function () {
            return this._active
        },
        progress: function () {
            return this._progress
        },
        add: function (t) {
            var n = this;
            t && !this.options.disabled && (t.fileInput && !t.files ? this._getFileInputFiles(t.fileInput).always(function (e) {
                t.files = e, n._onAdd(null, t)
            }) : (t.files = e.makeArray(t.files), this._onAdd(null, t)))
        },
        send: function (t) {
            if (t && !this.options.disabled) {
                if (t.fileInput && !t.files) {
                    var n, i, s = this, o = e.Deferred(), a = o.promise();
                    return a.abort = function () {
                        return i = !0, n ? n.abort() : (o.reject(null, "abort", "abort"), a)
                    }, this._getFileInputFiles(t.fileInput).always(function (e) {
                        if (!i) {
                            if (!e.length)return void o.reject();
                            t.files = e, n = s._onSend(null, t).then(function (e, t, n) {
                                o.resolve(e, t, n)
                            }, function (e, t, n) {
                                o.reject(e, t, n)
                            })
                        }
                    }), this._enhancePromise(a)
                }
                if (t.files = e.makeArray(t.files), t.files.length)return this._onSend(null, t)
            }
            return this._getXHRPromise(!1, t && t.context)
        }
    })
}),function (e) {
    "function" == typeof define && define.amd ? define("fileupload_process", ["jquery", "fileupload"], e) : e(window.jQuery)
}(function (e) {
    var t = e.blueimp.fileupload.prototype.options.add;
    e.widget("blueimp.fileupload", e.blueimp.fileupload, {
        options: {
            processQueue: [], add: function (n, i) {
                var s = e(this);
                i.process(function () {
                    return s.fileupload("process", i)
                }), t.call(this, n, i)
            }
        }, processActions: {}, _processFile: function (t) {
            var n = this, i = e.Deferred().resolveWith(n, [t]), s = i.promise();
            return this._trigger("process", null, t), e.each(t.processQueue, function (e, t) {
                var i = function (e) {
                    return n.processActions[t.action].call(n, e, t)
                };
                s = s.pipe(i, t.always && i)
            }), s.done(function () {
                n._trigger("processdone", null, t), n._trigger("processalways", null, t)
            }).fail(function () {
                n._trigger("processfail", null, t), n._trigger("processalways", null, t)
            }), s
        }, _transformProcessQueue: function (t) {
            var n = [];
            e.each(t.processQueue, function () {
                var i = {}, s = this.action, o = this.prefix === !0 ? s : this.prefix;
                e.each(this, function (n, s) {
                    "string" === e.type(s) && "@" === s.charAt(0) ? i[n] = t[s.slice(1) || (o ? o + n.charAt(0).toUpperCase() + n.slice(1) : n)] : i[n] = s
                }), n.push(i)
            }), t.processQueue = n
        }, processing: function () {
            return this._processing
        }, process: function (t) {
            var n = this, i = e.extend({}, this.options, t);
            return i.processQueue && i.processQueue.length && (this._transformProcessQueue(i), 0 === this._processing && this._trigger("processstart"), e.each(t.files, function (t) {
                var s = t ? e.extend({}, i) : i, o = function () {
                    return n._processFile(s)
                };
                s.index = t, n._processing += 1, n._processingQueue = n._processingQueue.pipe(o, o).always(function () {
                    n._processing -= 1, 0 === n._processing && n._trigger("processstop")
                })
            })), this._processingQueue
        }, _create: function () {
            this._super(), this._processing = 0, this._processingQueue = e.Deferred().resolveWith(this).promise()
        }
    })
}),function (e) {
    "function" == typeof define && define.amd ? define("fileupload_validate", ["jquery", "fileupload_process"], e) : e(window.jQuery)
}(function (e) {
    e.blueimp.fileupload.prototype.options.processQueue.push({
        action: "validate",
        always: !0,
        acceptFileTypes: "@",
        maxFileSize: "@",
        minFileSize: "@",
        maxNumberOfFiles: "@",
        disabled: "@disableValidation"
    }), e.widget("blueimp.fileupload", e.blueimp.fileupload, {
        options: {
            getNumberOfFiles: e.noop,
            messages: {
                maxNumberOfFiles: "Maximum number of files exceeded",
                acceptFileTypes: "File type not allowed",
                maxFileSize: "File is too large",
                minFileSize: "File is too small"
            }
        }, processActions: {
            validate: function (t, n) {
                if (n.disabled)return t;
                var i = e.Deferred(), s = this.options, o = t.files[t.index];
                return "number" === e.type(n.maxNumberOfFiles) && (s.getNumberOfFiles() || 0) + t.files.length > n.maxNumberOfFiles ? o.error = s.i18n("maxNumberOfFiles") : !n.acceptFileTypes || n.acceptFileTypes.test(o.type) || n.acceptFileTypes.test(o.name) ? n.maxFileSize && o.size > n.maxFileSize ? o.error = s.i18n("maxFileSize") : "number" === e.type(o.size) && o.size < n.minFileSize ? o.error = s.i18n("minFileSize") : delete o.error : o.error = s.i18n("acceptFileTypes"), o.error || t.files.error ? (t.files.error = !0, i.rejectWith(this, [t])) : i.resolveWith(this, [t]), i.promise()
            }
        }
    })
}),define("components/modal/1.0.0/modal", ["backbone", "jqueryui", "text!components/modal/1.0.0/templates/modal.html", "text!components/modal/1.0.0/templates/modal_link.html", "text!components/modal/1.0.0/templates/modal_pane.html", "text!components/modal/1.0.0/templates/modal_row.html", "text!components/modal/1.0.0/templates/modal_tab.html", "text!components/modal/1.0.0/templates/modal_thead.html", "text!components/modal/1.0.0/templates/modal_dropdown.html", "text!components/modal/1.0.0/templates/modal_static.html", "text!components/modal/1.0.0/templates/modal_static_footer.html", "core/utils", "fileupload_validate"], function (e, t, n, i, s, o, a, l, c, r, d, p) {
    $.ajaxSetup({cache: !1});
    var u = e.Model.extend({
        defaults: {
            tab: "",
            isLink: !1,
            type: "",
            text: "",
            link: "",
            groupID: null,
            isDropdown: !1
        }
    }), m = e.Collection.extend({model: u}), h = e.View.extend({
        tagName: "li", className: function () {
            return this.model.get("isLink") ? "link-group link-group-" + this.model.get("groupID") : this.model.get("isDropdown") ? "link-group dropdown link-group-" + this.model.get("groupID") : void 0
        }, template: _.template(a), linkTemplate: _.template(i), dropdownTemplate: _.template(c), render: function () {
            var e = this.model.toJSON(), t = this.model.get("groupID");
            return _.isNumber(this.model.get("groupID")) && _.isEqual(_.last(this.model.collection.where({groupID: t})), this.model) ? _.extend(e, {isLast: !0}) : _.extend(e, {isLast: !1}), this.model.collection.where({
                isLink: !1,
                isDropdown: !1
            }).length === this.model.collection.length && this.model.collection.indexOf(this.model) === this.model.collection.length - 1 && _.extend(e, {isLast: !0}), this.$el.html(this.model.get("isLink") ? this.linkTemplate(e) : this.model.get("isDropdown") ? this.dropdownTemplate(e) : this.template(e)), this.options.hide && this.$el.hide(), this
        }
    }), g = e.Model.extend({defaults: {title: "", time: "", type: ""}}), v = e.View.extend({
        tagName: "tr",
        template: _.template(l),
        render: function () {
            return this.$el.html(this.template(this.model.toJSON())), this
        }
    }), f = e.Model.extend({}), w = e.View.extend({
        tagName: function () {
            return "image" === this.model.get("type") ? "li" : "tr"
        }, template: _.template(o), events: {
            "click .js-choose": function (e) {
                if (this.parent.multiChoose)this.toggle(); else {
                    var t = this.model.attributes;
                    "guaguale" == t.type && (t.type = "activity", t._real_type = "guaguale"), "wheel" == t.type && (t.type = "activity", t._real_type = "wheel"), "zodiac" == t.type && (t.type = "activity", t._real_type = "zodiac"), "crazyguess" == t.type && (t.type = "activity", t._real_type = "crazyguess"), "mpNews" == t.type && (t.type = "news"), q.chooseItemCallback(t)
                }
                e.stopPropagation()
            }, "click .js-multi-select": "toggleImage"
        }, initialize: function (e) {
            this.parent = e.parent;
            var t = this.model.get("time"), n = t.split(" ");
            this.model.set("time", n.join("<br>"))
        }, toggleImage: function (e) {
            this.toggle(!0)
        }, toggle: function (e) {
            var t = this.$(".js-choose");
            t.toggleClass("btn-primary"), t.hasClass("btn-primary") ? (t.data("view", this), e || t.html("取消")) : e || t.html("选取"), this.toggleConfirm()
        }, toggleConfirm: function () {
            this.parent.$(".js-choose.btn-primary").length > 0 ? this.parent.$(".js-confirm-choose").show() : this.parent.$(".js-confirm-choose").hide()
        }, render: function () {
            return this.$el.html(this.template(this.model.toJSON())), "image" === this.model.get("type") && this.parent.multiChoose ? this.$(".multi-select-container").show() : this.$(".multi-select-container").hide(), this
        }
    }), b = e.Model.extend({
        defaults: {type: "", data: [], pageNavi: ""}, getType: function (e) {
            var t = e.slice(1).split("-"), n = this.get("type");
            return n === t[t.length - 1]
        }, fetch: function (e, t, n) {
            var i = this, s = this.get("type"), o = q.url[s];
            _.isUndefined(o) || ("cards" != s && (o += o.indexOf("?") >= 0 ? "&v=2" : "?v=2"), _.isUndefined(e) || (o += "&keyword=" + e), _.isUndefined(t) || (o += "&p=" + t), window._global.imageSize && "image" === s && (o += "&size=" + window._global.imageSize), $.getJSON(o, function (e) {
                var t = e.data;
                if (0 === +e.errcode || 0 === +e.code) {
                    var o = t.data_list, a = t.page_view, l = t.data_type;
                    i.set({type: s, data: o, pageNavi: a, dataType: l})
                } else p.errorNotify(e.errmsg);
                _.isFunction(n) && n()
            }))
        }
    }), y = e.Collection.extend({
        model: b, fetch: function (e, t) {
            var n = this, i = q.url[e];
            if (_.isUndefined(i))return void n.add({type: e}, {callback: t});
            "cards" != e && (i += i.indexOf("?") >= 0 ? "&v=2" : "?v=2"), window._global.imageSize && "image" === e && (i += "&size=" + window._global.imageSize);
            var s;
            _.isFunction(t) ? s = t : n.reset(), $.getJSON(i, function (t) {
                var i = t.data;
                if (0 === +t.errcode || 0 === +t.code) {
                    var o = i.data_list, a = i.page_view, l = i.data_type;
                    n.add({type: e, data: o, pageNavi: a, dataType: l}, {callback: s})
                } else p.errorNotify(t.errmsg)
            })
        }
    }), k = e.View.extend({
        tagName: "div", id: function () {
            return "js-module-" + this.model.get("type")
        }, className: function () {
            return "tab-pane module-" + this.model.get("type")
        }, template: _.template(s), events: {
            "click .js-modal-search": function (e) {
                var t = this, n = t.search.val() || void 0;
                t.model.get("type"), $(e.target);
                t.model.getType(t.parent.tab.find("li.active a").attr("href")) && ("image" === t.model.get("type") ? t.$(".module-header").addClass("loading") : t.parent.loading(), t.model.fetch(n, void 0, function () {
                    "image" === t.model.get("type") ? t.$(".module-header").removeClass("loading") : t.parent.done()
                }))
            }, "keydown .js-modal-search-input": function (e) {
                13 === e.keyCode && (this.$(".js-modal-search").trigger("click"), e.preventDefault())
            }, "click .js-update": "update"
        }, initialize: function (e) {
            e = e || {}, this.parent = e.parent;
            var t = this;
            this.parent.$(".pagenavi").on("click", function (e) {
                var n = $(e.target), i = n.data("page-num");
                e.preventDefault(), n.hasClass("js-confirm-upload-image") || n.hasClass("btn-cancel") || e.stopPropagation(), n.hasClass("fetch_page") && !n.hasClass("active") && t.model.getType(t.parent.tab.find("li.active a").attr("href")) && t.searchKeyword(i)
            }), this.parent.$(".pagenavi").on("keydown", ".goto-input", function (e) {
                e.keyCode === p.keyCode.ENTER && t.model.getType(t.parent.tab.find("li.active a").attr("href")) && (t.searchKeyword(Number(e.target.innerText)), e.preventDefault())
            }), this.parent.$(".pagenavi").on("click", ".goto-btn", function (e) {
                if (t.model.getType(t.parent.tab.find("li.active a").attr("href"))) {
                    var n = t.parent.$(".pagenavi .goto-input");
                    t.searchKeyword(+n.text())
                }
            }), this.parent.tabLink.on("active:tab", function (e) {
                var n = e.target, i = n.getAttribute("href");
                i && t.model.getType(i) && t.renderPageNavi()
            }), "image" === this.model.get("type") && this.parent.$el.on("show", function () {
                t.renderRow()
            }), this.listenTo(this.model, "change:data", this.renderRow), this.listenTo(this.model, "change:pageNavi", this.renderPageNavi)
        }, update: function () {
            var e = this;
            "image" === e.model.get("type") ? e.$(".module-header").addClass("loading") : e.parent.loading(), this.model.fetch(void 0, void 0, function () {
                "image" === e.model.get("type") ? e.$(".module-header").removeClass("loading") : e.parent.done()
            })
        }, searchKeyword: function (e) {
            var t = this;
            isNaN(e) && (e = 1);
            var n = t.search.val() || void 0;
            "image" === t.model.get("type") ? t.$(".module-header").addClass("loading") : t.parent.loading(), t.model.fetch(n, e, function () {
                "image" === t.model.get("type") ? t.$(".module-header").removeClass("loading") : t.parent.done()
            })
        }, render: function () {
            var e = this;
            this.modelData = this.model.toJSON(), this.$el.html(this.template(this.modelData)), this.thead = new g({
                title: "标题",
                time: "创建时间",
                type: e.model.get("type")
            }), this.renderThead(), this.renderRow(), this.search = this.$(".js-modal-search-input");
            var t = this.parent.tab.find("li.active a");
            return t.length > 0 && this.model.getType(t.attr("href")) && this.renderPageNavi(this.modelData.pageNavi), this
        }, renderThead: function () {
            var e, t = this;
            e = this.$("image" === this.model.get("type") ? ".module-header" : "thead"), e.empty();
            var n = new v({el: e, model: t.thead});
            n.render()
        }, renderRow: function () {
            var e, t = this, n = this.model.get("data"), i = this.model.get("type"), s = this.model.get("dataType");
            e = t.$("image" === i ? ".module-body" : "tbody"), e.empty(), _.each(n, function (o) {
                var a;
                "news" === i || "mpNews" === i ? (n = [], _.each(o.news_list, function (e) {
                    n.push(e.title)
                }), a = n.join("\\n")) : a = o.title;
                var l = new w({
                    model: new f({
                        title: o.title || "",
                        name: o.name || "",
                        time: o.created_time || "",
                        link: o.url || "",
                        data_url: o.url || "",
                        data_cover_attachment_id: o.cover_attachment_id || "",
                        data_cover_attachment_url: o.cover_attachment_url || "",
                        data_title: a || "",
                        data_alias: o.alias || "",
                        data_price: o.price || "",
                        data_buy_url: o.buy_url || "",
                        data_type: s || "",
                        width: o.width || "",
                        height: o.height || "",
                        type: i || "",
                        data_id: o.id || o._id || "",
                        start_time: o.valid_start_time || o.start_time || "",
                        end_time: o.valid_end_time || o.end_time || "",
                        news: o.news_list || "",
                        attachment_url: o.attachment_url || "",
                        attachment_title: o.attachment_title || "",
                        attachment_id: o.attachment_id || "",
                        thumb_url: o.thumb_url || "",
                        multiChoose: t.parent.multiChoose || !1,
                        id: o.id || o._id || "",
                        image_url: o.image_url || "",
                        size: o.attachment_size || "",
                        at_least: o.at_least || "",
                        is_at_least: o.is_at_least || "",
                        value: o.value,
                        feature_num: o.num || "",
                        feature_hot_per: o.hot_per || "",
                        feature_img_url: o.img_url || "",
                        feature_intro: o.intor || "",
                        area: o.area || "",
                        address: o.address || ""
                    }), parent: t.parent
                });
                e.append(l.render().el)
            }), "image" === this.model.get("type") ? this.$(".module-header").removeClass("loading") : this.parent.done()
        }, renderPageNavi: function () {
            var e = this.model.get("pageNavi");
            this.parent.$(".pagenavi").html(e), this.parent.done()
        }
    }), x = e.View.extend({
        tagName: "div",
        id: function () {
            return "js-module-" + this.model.get("type")
        },
        className: function () {
            return "tab-pane module-" + this.model.get("type")
        },
        events: {"click .js-preview-img": "previewImage"},
        template: _.template(r),
        footerTemplate: _.template(d),
        initialize: function (e) {
            var t = this;
            e = e || {}, this.parent = e.parent, this.parent.tabLink.on("active:tab", function (e) {
                var n = e.target, i = n.getAttribute("href");
                i && t.model.getType(i) && t.renderFooter()
            }), this.parent.$el.on("click", function (e) {
                if (e.target === $(".js-confirm-upload-image")[0]) {
                    $(e.target).button("loading");
                    var n = t.downloadImage();
                    if (n)return;
                    var i = $(".js-fileupload");
                    t.uploadFiles ? i.fileupload("send", {files: t.uploadFiles}).success(function (e, n, i) {
                        var s = [], o = [];
                        if (_.each(e, function (e, t) {
                                "success" === e.status ? o.push(e.success_msg) : s.push({
                                    index: t + 1,
                                    msg: e.failed_msg
                                })
                            }), o.length > 1 ? q.chooseItemCallback(t.parent.multiChoose ? o : o[0]) : 1 === o.length && q.chooseItemCallback(o[0]), s.length > 0) {
                            var a = _.reduce(s, function (e, t) {
                                return "size" === t.msg.upload_file ? e + "第" + t.index + " 张图片大于 1MB 上传失败；" : e + "第" + t.index + " 张图片上传失败（请联系客服）；"
                            }, "");
                            p.errorNotify(a)
                        }
                        t.clearDownload()
                    }) : (p.errorNotify("至少选择一张图片。"), t.clearDownload())
                }
            })
        },
        render: function () {
            return this.$el.html(this.template(this.model.attributes)), this
        },
        renderFooter: function () {
            this.parent.$(".pagenavi").html(this.footerTemplate(this.model.attributes)), this.uploadImage()
        },
        uploadImage: function () {
            var e = this;
            if (!e.initUploadImage) {
                e.initUploadImage = !0;
                var t = $(".js-fileupload");
                t.fileupload({
                    dataType: "json", add: function () {
                    }, xhrFields: {withCredentials: !0}
                }).fileupload("option", {
                    formData: {media_type: "image", v: "2", mp_id: window._global.kdt_id},
                    maxFileSize: 1e6,
                    acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
                }).on("change", function (t) {
                    var n = t.target.files.length;
                    if (0 !== n) {
                        if (n > 10)return void p.errorNotify("一次只能选择 10 张图片。");
                        var i = $(".js-upload-img");
                        i.empty(), _.each(t.target.files, function (e) {
                            var t = new FileReader;
                            t.onload = function (e) {
                                i.append($("<img>").attr("src", e.target.result))
                            }, t.readAsDataURL(e);
                        }), e.uploadFiles = t.target.files
                    }
                })
            }
        },
        previewImage: function () {
            var e = $(".js-web-img-input").val();
            if ("" === $.trim(e))return void $(".js-web-img-input").focus();
            this.model.set("src", e);
            var t = this.$(".js-download-img"), n = $("<img>").on("load", function () {
                t.removeClass("loading")
            }).attr("src", e);
            t.html(n).addClass("loading")
        },
        downloadImage: function () {
            var e = this;
            if ("" !== $.trim(this.model.get("src"))) {
                var t = {
                    attachment_url: this.model.get("src"),
                    media_type: "image",
                    v: 2,
                    mp_id: window._global.kdt_id
                };
                return $.post(window._global.url.img + "/download?format=json", t, function (e) {
                    e.success && q.chooseItemCallback(e.success)
                }, "json").always(function () {
                    e.clearDownload()
                }).fail(function () {
                    p.errorNotify("网络出现错误啦。")
                }), !0
            }
        },
        clearDownload: function () {
            this.$(".js-download-img").html(""), this.$(".js-upload-img").html(""), this.$(".js-web-img-input").val(""), this.uploadFiles = null, this.model.set("src", "");
            var e = $(".js-confirm-upload-image");
            e.button("reset")
        }
    }), j = e.View.extend({
        initialize: function (e) {
            e = e || {}, this.type = e.type, this.multiChoose = e.multiChoose || !1, this.tab = this.$(".modal-tab"), this.tabContent = this.$(".tab-content"), this.modalBody = this.$(".modal-body"), this.listenTo(C[e.type], "add", this.addTabs), this.listenTo(S[e.type], "add", this.addPanes), this.listenTo(S[e.type], "reset", this.reset), C[e.type].add(e.list), this.tabList = e.tab;
            var t = this, n = this.tabLink = this.tab.find(".js-modal-tab"), i = function (e) {
                var i = $(e.target), s = n.index(i);
                t.tab.find(".link-group").css({display: "none"}), t.tab.find(".link-group-" + s).css({display: "inline-block"}), t.tabContent.find("#" + i.attr("href").substring(1)).length > 0 && i.tab("show").trigger("active:tab"), e.preventDefault(), e.stopPropagation()
            };
            n.on("click", i), n.one("click", function (e) {
                var n = $(e.target), i = n.data("type");
                t.loading(), S[t.options.type] && S[t.options.type].fetch(i, function () {
                    n.tab("show").trigger("active:tab")
                })
            }), this.$el.on("click", ".js-confirm-choose .btn", function () {
                var e = [];
                t.$(".js-choose.btn-primary").each(function (t, n) {
                    e.push($(n).data("view").model.attributes)
                }), q.chooseItemCallback(e)
            }), this.on("hide", function () {
                "image" === t.type && this.$(".js-multi-select:checked").prop("checked", !1), t.$(".js-choose.btn-primary").each(function (e, n) {
                    "image" === t.type ? $(n).data("view").toggle(!0) : $(n).data("view").toggle()
                })
            }), this.on("show", function () {
                for (var e = !0, t = 0; t < n.length; t++) {
                    var i = $(n[t]);
                    if (i.parent("li").hasClass("active")) {
                        i.trigger("click"), e = !1;
                        break
                    }
                }
                e && n.first().trigger("click")
            })
        }, addTabs: function (e) {
            var t = {model: e};
            !_.isUndefined(this.options.hide) && "" !== e.type && _.indexOf(this.options.hide, e.get("type")) >= 0 && _.extend(t, {hide: !0});
            var n = new h(t);
            this.tab.append(n.render().$el)
        }, addPanes: function (e, t, n) {
            var i, s = this, o = _.isUndefined(q.url[e.get("type")]);
            i = o ? new x({model: e, parent: s}) : new k({
                model: e,
                parent: s
            }), this.tabContent.append(i.render().$el), _.isFunction(n.callback) && n.callback(), this.done()
        }, reset: function () {
            this.tabContent.empty()
        }, update: function () {
            var e = this;
            this.loading(), _.each(this.tabList, function (t) {
                S[e.type] && S[e.type].fetch(t, !0)
            })
        }, loading: function () {
            this.modalBody.addClass("loading")
        }, done: function () {
            this.modalBody.removeClass("loading"), this.$(".js-confirm-choose").hide()
        }, fetchAll: function () {
            var e = this;
            _.each(this.options.tab, function (t) {
                S[e.options.type] && S[e.options.type].fetch(t)
            })
        }
    }), S = {}, C = {}, I = e.Model.extend({defaults: {type: "other"}}), T = e.View.extend({
        template: _.template(n),
        render: function () {
            return $(this.template(this.model.attributes)).appendTo("body")
        }
    }), q = {}, z = {};
    return {
        initialize: function (e) {
            if (z[e.type])return _.isArray(e.hide) && e.hide.length > 0 ? z[e.type].find(".modal-tab li:not(.link-group)>a").each(function (t, n) {
                var i = $.trim($(n).attr("href").replace("#js-module-", ""));
                e.hide.indexOf(i) >= 0 && $(n).parent("li").hide()
            }) : z[e.type].find(".modal-tab li:not(.link-group)").removeAttr("style"), e.multiChoose ? z[e.type].app.multiChoose = !0 : z[e.type].app.multiChoose = !1, z[e.type];
            _.isUndefined(q.url) && (q.url = e.url || {
                    goods: window._global.url.www + "/showcase/goods/shortList.json",
                    topic: window._global.url.v1 + "/topic/list/get",
                    category: window._global.url.www + "/showcase/category/shortList.json",
                    component: window._global.url.www + "/showcase/component/shortList.json",
                    feature_category: window._global.url.www + "/showcase/category/shortList.json",
                    survey: window._global.url.www + "/apps/vote/selectList.json",
                    image: window._global.url.www + "/showcase/attachment/alert.json?media_type=1",
                    article: window._global.url.v1 + "/article/list/get",
                    tag: window._global.url.www + "/showcase/tag/shortList.json",
                    goods_tag: window._global.url.www + "/showcase/tag/shortList.json",
                    f_category: window._global.url.www + "/showcase/category/shortList.json",
                    tag_feature: window._global.url.www + "/showcase/tag/shortList.json",
                    tag_feature_2: window._global.url.www + "/showcase/feature/shortList.json",
                    news: window._global.url.v1 + "/news/list/get",
                    mpNews: window._global.url.www + "/weixin/imagetext/minilist.json",
                    activity: window._global.url.v1 + "/activity/list/modal",
                    guaguale: window._global.url.www + "/apps/cards/shortlist.json",
                    wheel: window._global.url.www + "/apps/wheel/shortlist.json",
                    zodiac: window._global.url.www + "/apps/zodiac/shortlist.json",
                    crazyguess: window._global.url.www + "/apps/crazyguess/shortlist.json",
                    grab: window._global.url.www + "/apps/grab/shortList.json",
                    guang_activity: window._global.url.v1 + "/activity/list/modal?is_guangyiguang=1",
                    feature: window._global.url.www + "/showcase/feature/shortList.json",
                    articles: window._global.url.www + "/sinaweibo/articles/atricleselectionlist.json",
                    tradeincard: window._global.url.www + "/ump/tradeincard/listForSelection.json",
                    storelist: window._global.url.www + "/setting/teamphysical/storelist.json",
                    fenxiao_goods: window._global.url.fenxiao + "/supplier/goods/shortlist.json",
                    fenxiao_imagetext: window._global.url.fenxiao + "/supplier/imagetext/shortlist.json"
                }, _.each(q.url, function (e, t) {
                S[t] = new y, C[t] = new m
            })), q.chooseItemCallback = function () {
                    e.chooseItemCallback.apply(n, arguments), n.modal("hide"), s.trigger("hide")
                } || function () {
                };
            var t = new T({model: new I({type: e.type})}), n = t.render();
            n.view = t, n.on("show", function (e) {
                var t = $(e.target);
                t.hasClass("modal") && s.trigger("show")
            }), n.setChooseItemCallback = function (e) {
                return q.chooseItemCallback = null, q.chooseItemCallback = function () {
                    e.apply(n, arguments), n.modal("hide"), s.trigger("hide")
                }, this
            };
            var i;
            switch (e.type) {
                case"mass_news":
                    i = {
                        list: [{tab: "微信图文", type: "mpNews"}, {
                            link: window._global.url.www + "/weixin/imagetext#list",
                            text: "微信图文素材管理",
                            isLink: !0,
                            groupID: 0
                        }], tab: ["mpNews"], type: "news"
                    };
                    break;
                case"news":
                    i = {
                        list: [{tab: "高级图文", type: "news"}, {
                            tab: "微信图文",
                            type: "mpNews"
                        }, {
                            link: window._global.url.www + "/weixin/advancednews#list",
                            text: "高级图文素材管理",
                            isLink: !0,
                            groupID: 0
                        }, {
                            link: window._global.url.www + "/weixin/imagetext#list",
                            text: "微信图文素材管理",
                            isLink: !0,
                            groupID: 1
                        }],
                        tab: ["news", "mpNews"],
                        type: "news"
                    };
                    break;
                case"fenxiao_imagetext":
                    i = {
                        list: [{tab: "图文素材", type: "fenxiao_imagetext"}, {
                            link: "/supplier/imagetext",
                            text: "图文素材管理",
                            isLink: !0,
                            groupID: 0
                        }], tab: ["fenxiao_imagetext"], type: "fenxiao_imagetext"
                    };
                    break;
                case"articles":
                    i = {
                        list: [{tab: "新浪微博图文素材", type: "articles"}, {
                            link: window._global.url.www + "/sinaweibo/articles",
                            text: "新浪微博图文素材管理",
                            isLink: !0,
                            groupID: 0
                        }], tab: ["articles"], type: "articles"
                    };
                    break;
                case"tag":
                    i = {
                        list: [{tab: "商品分组", type: "goods_tag"}, {
                            link: "/v2/showcase/tag",
                            text: "分组管理",
                            isLink: !0,
                            groupID: 0
                        }], tab: ["goods_tag"], type: "goods_tag"
                    };
                    break;
                case"tag_feature":
                    i = {
                        list: [{tab: "商品分组", type: "tag_feature"}, {
                            tab: "微页面",
                            type: "tag_feature_2"
                        }, {
                            link: "/v2/showcase/tag",
                            text: "分组管理",
                            isLink: !0,
                            groupID: 0
                        }, {
                            link: "/v2/showcase/feature#create",
                            text: "新建微页面",
                            isLink: !0,
                            groupID: 1
                        }, {link: "/v2/showcase/feature#list&is_display=0", text: "草稿管理", isLink: !0, groupID: 1}],
                        tab: ["tag_feature", "tag_feature_2"],
                        type: "tag_feature"
                    };
                    break;
                case"feature":
                    i = {
                        list: [{tab: "微页面", type: "feature"}, {
                            tab: "微页面分类",
                            type: "category"
                        }, {
                            link: "/v2/showcase/feature#create",
                            text: "新建微页面",
                            isLink: !0,
                            groupID: 0
                        }, {
                            link: "/v2/showcase/feature#list&is_display=0",
                            text: "草稿管理",
                            isLink: !0,
                            groupID: 0
                        }, {link: "/v2/showcase/category", text: "分类管理", isLink: !0, groupID: 1}],
                        tab: ["feature", "category"],
                        type: "feature"
                    };
                    break;
                case"feature_only":
                    i = {
                        list: [{tab: "微页面", type: "feature"}, {
                            link: "/v2/showcase/feature#create",
                            text: "新建微页面",
                            isLink: !0,
                            groupID: 0
                        }, {link: "/v2/showcase/feature#list&is_display=0", text: "草稿管理", isLink: !0, groupID: 0}],
                        tab: ["feature"],
                        type: "feature"
                    };
                    break;
                case"category":
                    i = {
                        list: [{tab: "微页面分类", type: "f_category"}, {
                            link: "/v2/showcase/category",
                            text: "分类管理",
                            isLink: !0,
                            groupID: 0
                        }], tab: ["f_category"], type: "f_category"
                    };
                    break;
                case"feature_category":
                    i = {
                        list: [{tab: "微页面分类", type: "feature_category"}, {
                            link: "/v2/showcase/category",
                            text: "分类管理",
                            isLink: !0,
                            groupID: 0
                        }], tab: ["feature_category"], type: "feature_category"
                    };
                    break;
                case"activity":
                    i = {
                        list: [{tab: "在有效期内的活动", type: "activity"}, {tab: "刮刮乐", type: "guaguale"}, {
                            tab: "幸运大抽奖",
                            type: "wheel"
                        }, {tab: "翻翻看", type: "zodiac"}, {
                            tab: "疯狂猜",
                            type: "crazyguess"
                        }, {
                            link: "/activity/list?activity_type=1",
                            text: "新建营销活动",
                            groupID: 0,
                            isDropdown: !0
                        }, {
                            link: "/v2/apps/cards#create",
                            text: "新建刮刮乐",
                            groupID: 1,
                            isLink: !0
                        }, {
                            link: "/v2/apps/wheel#create",
                            text: "新建幸运大抽奖",
                            groupID: 2,
                            isLink: !0
                        }, {
                            link: "/v2/apps/zodiac#create",
                            text: "新建翻翻看",
                            groupID: 3,
                            isLink: !0
                        }, {link: "/v2/apps/crazyguess#create", text: "新建疯狂猜", groupID: 4, isLink: !0}],
                        tab: ["activity"],
                        type: "activity"
                    };
                    break;
                case"grab":
                    i = {
                        list: [{tab: "抢楼活动", type: "grab"}, {
                            link: _global.url.www + "/apps/grab/create",
                            text: "新建抢楼活动",
                            groupID: 0,
                            isLink: !0
                        }], tab: ["grab"], type: "grab"
                    };
                    break;
                case"guang_activity":
                    i = {
                        list: [{tab: "在有效期内的活动", type: "guang_activity"}, {tab: "刮刮乐", type: "guaguale"}, {
                            tab: "幸运大抽奖",
                            type: "wheel"
                        }, {tab: "翻翻看", type: "zodiac"}, {
                            tab: "疯狂猜",
                            type: "crazyguess"
                        }, {
                            link: "/activity/list?activity_type=1",
                            text: "新建营销活动",
                            groupID: 0,
                            isDropdown: !0
                        }, {
                            link: "/v2/apps/cards#create",
                            text: "新建刮刮乐",
                            groupID: 1,
                            isDropdown: !0
                        }, {
                            link: "/v2/apps/wheel#create",
                            text: "新建幸运大抽奖",
                            groupID: 2,
                            isDropdown: !0
                        }, {
                            link: "/v2/apps/zodiac#create",
                            text: "新建翻翻看",
                            groupID: 3,
                            isDropdown: !0
                        }, {link: "/v2/apps/crazyguess#create", text: "新建疯狂猜", groupID: 4, isDropdown: !0}],
                        tab: ["guang_activity"],
                        type: "guang_activity"
                    };
                    break;
                case"goods":
                    i = {
                        list: [{tab: "已上架商品", type: "goods"}, {tab: "商品分组", type: "tag"}, {
                            link: "/v2/showcase/goods/edit",
                            text: "新建商品",
                            isLink: !0,
                            groupID: 0
                        }, {
                            link: "/v2/showcase/goods#list&is_display=0",
                            text: "草稿管理",
                            isLink: !0,
                            groupID: 0
                        }, {link: "/v2/showcase/tag", text: "分组管理", isLink: !0, groupID: 1}],
                        tab: ["goods", "tag"],
                        type: "goods"
                    }, $.widget.bridge("uitooltip", $.ui.tooltip), $(document).uitooltip({
                        items: ".js-goods-modal #js-module-goods tbody .title a",
                        position: {my: "top+20", at: "center", collision: "none"},
                        content: function () {
                            var e = $(this), t = e.data("cover-attachment-url");
                            return '<div class="arrow"></div><div class="loading" style="width: 200px;height: 200px;background-color: #fff;"><img class="picture-tooltip" style="height: 200px;" width="200" height="200" src="' + t + '"/></div>'
                        }
                    });
                    break;
                case"fenxiao_goods":
                    i = {
                        list: [{
                            tab: "已上架商品",
                            type: "fenxiao_goods"
                        }, {
                            link: _global.url.fenxiao + "/supplier/goods/create",
                            text: "新建商品",
                            isLink: !0,
                            groupID: 0
                        }],
                        tab: ["fenxiao_goods"],
                        type: "fenxiao_goods"
                    };
                    break;
                case"survey":
                    i = {
                        list: [{tab: "投票调查", type: "survey"}, {
                            link: "/v2/apps/vote#create",
                            text: "新建投票调查",
                            groupID: 0,
                            isLink: !0
                        }], tab: ["survey"], type: "survey"
                    };
                    break;
                case"storelist":
                    i = {
                        list: [{tab: "线下门店", type: "storelist"}, {
                            link: "/v2/setting/store#physical_store",
                            text: "新建线下门店",
                            groupID: 0,
                            isLink: !0
                        }], tab: ["storelist"], type: "storelist"
                    };
                    break;
                case"component":
                    i = {
                        list: [{tab: "自定义页面模块", type: "component"}, {
                            link: "/v2/showcase/component#create",
                            text: "新建自定义页面模块",
                            groupID: 0,
                            isLink: !0
                        }], tab: ["component"], type: "component"
                    };
                    break;
                case"image":
                    i = {
                        list: [{tab: "用过的图片", type: "image"}, {tab: "新图片", type: "uploadImage"}],
                        tab: ["image", "uploadImage"],
                        type: "image"
                    };
                    break;
                case"tradeincard":
                    i = {
                        list: [{tab: "优惠券", type: "tradeincard"}, {
                            link: "/v2/ump/tradeincard#add",
                            text: "新建优惠券",
                            groupID: 0,
                            isLink: !0
                        }], tab: ["tradeincard"], type: "tradeincard"
                    };
                    break;
                default:
                    i = e.config
            }
            _.extend(i, {
                modal: n,
                hide: e.hide || [],
                multiChoose: e.multiChoose || !1
            }), e.size && (window._global.imageSize = e.size || !1);
            var s = new j(_.extend({}, {el: n}, i));
            return n.app = s, z[e.type] = n, n
        }
    }
}),define("tpl!components/showcase/2.0.0/goods_list/templates/edit_goods_style", [], function () {
    return function (obj) {
        var __t, __p = "";
        Array.prototype.join;
        with (obj || {})__p += '<form class="form-horizontal" novalidate>\n    <div class="control-group">\n        <label class="control-label">列表样式：</label>\n        <div class="controls">\n            <label class="radio inline">\n                <input type="radio" name="size" value="0" ', "0" == size && (__p += " checked "), __p += '>大图\n            </label>\n            <label class="radio inline">\n                <input type="radio" name="size" value="1" ', "1" == size && (__p += " checked "), __p += '>小图\n            </label>\n            <label class="radio inline">\n                <input type="radio" name="size" value="2" ', "2" == size && (__p += " checked "), __p += '>一大两小\n            </label>\n            <label class="radio inline">\n                <input type="radio" name="size" value="3" ', "3" == size && (__p += " checked "), __p += ">详细列表\n            </label>\n        </div>\n    </div>\n    ", isFenxiao() || (__p += '\n    <div class="control-group">\n        <div class="controls">\n            <div class="controls-card">\n                <div class="controls-card-tab">\n                    <label class="radio inline">\n                        <input type="radio" name="size_type" value="0" ', "0" == size_type && (__p += " checked "), __p += ">\n                        卡片样式\n                    </label>\n                    ", "1" == size && (__p += '\n                    <label class="radio inline">\n                        <input type="radio" name="size_type" value="1" ', "1" == size_type && (__p += " checked "), __p += ">\n                        瀑布流\n                    </label>\n                    "), __p += '\n                    <label class="radio inline">\n                        <input type="radio" name="size_type" value="2" ', "2" == size_type && (__p += " checked "), __p += ">\n                        极简样式\n                    </label>\n                    ", "1" == size && (__p += '\n                    <label class="radio inline">\n                        <input type="radio" name="size_type" value="3" ', "3" == size_type && (__p += " checked "), __p += ">\n                        促销\n                    </label>\n                    "), __p += "\n                </div>\n                ", "3" == size_type || "2" == size_type && "3" != size || (__p += '\n                <div class="controls-card-item">\n                    <div>\n                        <label class="checkbox inline">\n                            ', __p += "0" == buy_btn ? '\n                                <input type="checkbox" name="buy_btn" value="0">显示购买按钮\n                            ' : '\n                                <input type="checkbox" name="buy_btn" value="1" checked>显示购买按钮\n                            ', __p += "\n                        </label>\n                    </div>\n                    ", "1" == buy_btn && (__p += '\n                    <div style="margin: 10px 0 0 20px;">\n                        <label class="radio inline">\n                            <input type="radio" name="buy_btn_type" value="1" ', "1" == buy_btn_type && (__p += " checked "), __p += '>\n                            样式1\n                        </label>\n                        <label class="radio inline">\n                            <input type="radio" name="buy_btn_type" value="2" ', "2" == buy_btn_type && (__p += " checked "), __p += ">\n                            样式2\n                        </label>\n                        ", ("3" != size || "2" != size_type) && (__p += '\n                        <label class="radio inline">\n                            <input type="radio" name="buy_btn_type" value="3" ', "3" == buy_btn_type && (__p += " checked "), __p += ">\n                            样式3\n                        </label>\n                        "), __p += '\n                        <label class="radio inline">\n                            <input type="radio" name="buy_btn_type" value="4" ', "4" == buy_btn_type && (__p += " checked "), __p += ">\n                            样式4\n                        </label>\n                    </div>\n                    "), __p += "\n                </div>\n                "), __p += "\n                ", window._global.isWishOpen && (__p += '\n                <div class="controls-card-item">\n                    <div>\n                        <label class="checkbox inline">\n                            ', __p += "0" == show_wish_btn ? '\n                                <input type="checkbox" name="show_wish_btn" value="0">显示加入心愿单按钮\n                            ' : '\n                                <input type="checkbox" name="show_wish_btn" value="1" checked>显示加入心愿单按钮\n                            ', __p += "\n                        </label>\n                    </div>\n                </div>\n                "), __p += "\n                ", "3" != size_type && "3" != size && (__p += "\n                    ", ("1" != size || "2" != size_type) && (__p += '\n                    <div class="controls-card-item">\n                        <label class="checkbox inline">\n                            ', __p += "0" == title ? '\n                                <input type="checkbox" name="title" value="0">显示商品名 ' + (null == (__t = "2" == size ? "(小图不显示名称)" : "") ? "" : __t) + "\n                            " : '\n                                <input type="checkbox" name="title" value="1" checked>显示商品名 ' + (null == (__t = "2" == size ? "(小图不显示名称)" : "") ? "" : __t) + "\n                            ", __p += "\n                        </label>\n                    </div>\n                    "), __p += "\n                    ", "0" == size && (__p += '\n                    <div class="controls-card-item">\n                        <label class="checkbox inline">\n                            ', __p += "0" == show_sub_title ? '\n                                <input type="checkbox" name="show_sub_title" value="0">显示商品简介\n                            ' : '\n                                <input type="checkbox" name="show_sub_title" value="1" checked>显示商品简介\n                            ', __p += "\n                        </label>\n                    </div>\n                    "), __p += '\n                    <div class="controls-card-item">\n                        <label class="checkbox inline">\n                            ', __p += "0" == price ? '\n                                <input type="checkbox" name="price" value="0">显示价格\n                            ' : '\n                                <input type="checkbox" name="price" value="1" checked>显示价格\n                            ', __p += "\n                        </label>\n                    </div>\n                "), __p += "\n            </div>\n        </div>\n    </div>\n    "), __p += "\n</form>\n";
        return __p
    }
}),define("components/showcase/2.0.0/goods_list/views/edit_goods_style", ["require", "underscore", "core/utils", "components/showcase/2.0.0/base/views/edit_base", "components/modal/1.0.0/modal", "tpl!../templates/edit_goods_style"], function (e) {
    var t = (e("underscore"), e("core/utils")), n = e("components/showcase/2.0.0/base/views/edit_base");
    e("components/modal/1.0.0/modal");
    return n.extend({
        template: e("tpl!../templates/edit_goods_style"),
        events: {'change input[type="radio"]': "updateModel", 'click input[type="checkbox"]': "updateModel"},
        modelEvents: {change: "render"},
        bindValidation: function () {
        },
        templateHelpers: {isFenxiao: t.isFenxiao}
    })
}),define("components/showcase/2.0.0/goods/views/edit", ["require", "underscore", "jquery", "components/showcase/2.0.0/base/views/edit_base", "text!components/showcase/2.0.0/goods/templates/edit.html", "components/modal/1.0.0/modal", "core/utils", "components/showcase/2.0.0/goods_list/views/edit_goods_style"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("components/showcase/2.0.0/base/views/edit_base"), s = e("text!components/showcase/2.0.0/goods/templates/edit.html"), o = e("components/modal/1.0.0/modal"), a = e("core/utils"), l = e("components/showcase/2.0.0/goods_list/views/edit_goods_style");
    return i.extend({
        template: t.template(s),
        templateHelpers: {fullfillImage: a.fullfillImage},
        events: {"click .js-delete-goods": "handleDeleteGoods", "click .js-add-goods": "handleAddGoods"},
        modelEvents: {"change:goods": "render"},
        regions: {goodsStyleRegion: ".js-goods-style-region"},
        onRender: function () {
            var e = this;
            this.$(".module-goods-list").sortable({
                items: "> .sort", cursor: "move", start: function (e, t) {
                    t.item.data("startPos", t.item.index())
                }, stop: function (t, n) {
                    var i = n.item.data("startPos"), s = n.item.index();
                    i !== s && (e.sort(i, s, e.model.get("goods")), e.model.trigger("change"), e.model.trigger("change:goods"))
                }
            }), this.goodsStyleRegion.show(new l({model: this.model}))
        },
        handleDeleteGoods: function (e) {
            var t = n(e.target), i = this.$(".module-goods-list .js-delete-goods").index(t);
            this.model.deleteGoods(i)
        },
        handleAddGoods: function () {
            var e = this;
            this.goodsModal = o.initialize({
                type: "goods",
                hide: ["tag"],
                multiChoose: !0
            }).setChooseItemCallback(function (n) {
                t.each(n, function (t) {
                    e.model.get("goods").push({
                        id: t.data_id,
                        url: t.data_url,
                        image_url: t.image_url,
                        image_id: t.data_id || t.id || "",
                        price: "0" != t.data_price ? (t.data_price / 100).toFixed(2) : 0,
                        title: t.title
                    })
                }), e.model.trigger("change"), e.model.trigger("change:goods")
            }), this.goodsModal.modal("show")
        }
    })
}),define("text!components/showcase/2.0.0/goods_list/templates/edit.html", [], function () {
    return '<form class="form-horizontal" novalidate>\n    <div class="control-group">\n        <label class="control-label">商品来源：</label>\n        <div class="controls">\n            <% if (goods) { %>\n                <div class="control-action clearfix">\n                    <div class="pull-left link-to">\n                        <a href="<%= goods.url %>" class="link-to-title" target="_blank">\n                            <span class="label label-success">\n                                <% if (goods.type === \'feature\') { %>微页面<%} else { %>商品标签<% } %>\n                                <em class="link-to-title-text"><%- goods.title %></em>\n                            </span>\n                        </a>\n                    </div>\n                    <a href="javascript:void(0);" class="pull-right js-add-goods add-goods">修改</a>\n                </div>\n            <% } else { %>\n                <a href="javascript:void(0);" class="js-add-goods add-goods control-action">从商品分组中选择</a>\n            <% } %>\n            <p class="help-desc">选择商品来源后，左侧实时预览暂不支持显示其包含的商品数据</p>\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label">显示个数：</label>\n        <div class="controls">\n            <label class="radio inline">\n                <input type="radio" name="goods_number_type" value="0" <% if (goods_number_type == 0) { %> checked <% } %>>6\n            </label>\n            <label class="radio inline">\n                <input type="radio" name="goods_number_type" value="1" <% if (goods_number_type == 1) { %> checked <% } %>>12\n            </label>\n            <label class="radio inline">\n                <input type="radio" name="goods_number_type" value="2" <% if (goods_number_type == 2) { %> checked <% } %>>18\n            </label>\n        </div>\n    </div>\n</form>\n<div class="js-goods-style-region" style="margin-top: 10px;"></div>\n'
}),define("components/showcase/2.0.0/goods_list/views/edit", ["require", "underscore", "components/showcase/2.0.0/base/views/edit_base", "text!components/showcase/2.0.0/goods_list/templates/edit.html", "components/modal/1.0.0/modal", "./edit_goods_style"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/edit_base"), i = e("text!components/showcase/2.0.0/goods_list/templates/edit.html"), s = e("components/modal/1.0.0/modal"), o = e("./edit_goods_style");
    return n.extend({
        template: t.template(i),
        events: {'change input[type="radio"]': "updateModel", "click .js-add-goods": "handleAddGoods"},
        modelEvents: {"change:goods": "render"},
        regions: {goodsStyleRegion: ".js-goods-style-region"},
        onRender: function () {
            this.goodsStyleRegion.show(new o({model: this.model}))
        },
        handleAddGoods: function () {
            var e = this;
            this.goodsModal = s.initialize({type: "tag"}).setChooseItemCallback(function (t) {
                e.model.set("goods", {
                    id: t.data_id,
                    url: t.data_url,
                    image_url: t.data_cover_attachment_url,
                    price: "0" != t.data_price ? (t.data_price / 100).toFixed(2) : 0,
                    title: t.title,
                    type: t.data_type
                })
            }), this.goodsModal.modal("show")
        }
    })
}),define("tpl!components/showcase/2.0.0/goods_template_split/templates/edit", [], function () {
    return function (obj) {
        var __p = "";
        Array.prototype.join;
        with (obj || {})__p += '<div class="app-component-desc">\n   <p>\n        请在商品页中进行编辑\n        <a href="/v2/showcase/goods#list" target="_blank" class="new-window">点此查看</a>\n    </p>\n</div>\n';
        return __p
    }
}),define("components/showcase/2.0.0/goods_template_split/views/edit", ["require", "components/showcase/2.0.0/base/views/edit_base", "tpl!../templates/edit"], function (e) {
    var t = e("components/showcase/2.0.0/base/views/edit_base");
    return t.extend({template: e("tpl!../templates/edit")})
}),define("components/showcase/2.0.0/base/views/edit_collection_base", ["require", "jquery", "marionette"], function (e) {
    var t = (e("jquery"), e("marionette"));
    return t.CollectionView.extend({
        tagName: "ul", className: "choices", events: {
            "click .choice": function (e) {
                var t = e.target.nodeName.toLowerCase();
                -1 === ["input", "textarea", "select"].indexOf(t) && this.$(":focus").blur()
            }
        }, itemViewOptions: function () {
            return {layout: this.options.layout}
        }, sortable: function () {
            var e = this;
            this.$el.sortable({
                axis: "y", cursor: "move", start: function (e, t) {
                    t.item.data("start", t.item.index())
                }, stop: function (t, n) {
                    var i = n.item.data("start"), s = n.item.index();
                    i !== s && (e.sort(i, s, e.collection.models), e.collection.trigger("reset"))
                }
            })
        }, sort: function (e, t, n) {
            var i = n.splice(e, 1)[0];
            return n.splice(t, 0, i), n
        }
    })
}),define("text!components/showcase/2.0.0/image_ad/templates/edit_item.html", [], function () {
    return '<div class="choice-image">\n    <% if (image_id === \'\') { %>\n        <a class="add-image js-trigger-image" href="javascript: void(0);"><i class="icon-add"></i>  添加图片</a>\n    <% } else { %>\n        <img src="<%= image_url %>" data-full-size="<%= image_url %>" width="118" height="118" class="thumb-image">\n        <a class="modify-image js-trigger-image" href="javascript: void(0);">重新上传</a>\n    <% } %>\n\n    <!-- for error msg -->\n    <div class="control-group">\n        <div class="controls">\n            <input type="hidden" name="image_url">\n        </div>\n    </div>\n</div>\n<div class="choice-content">\n    <div class="control-group">\n        <label class="control-label">标题：</label>\n        <div class="controls">\n            <input class="" type="text" name="title[<%= cid %>]" value="<%- title %>">\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label">链接：</label>\n        <div class="controls">\n            <% if (link_type != \'\') { %>\n                <div class="control-action clearfix">\n                    <div class="pull-left js-link-to link-to">\n                        <% if (link_title !== \'\') { %>\n                        <a href="<%= link_url %>" target="_blank" class="new-window link-to-title">\n                        <% } %>\n\n                        <span class="label label-success">\n                            <% if (link_type === \'feature\') { %>\n                                微页面\n                            <% } else if (link_type === \'category\') { %>\n                                微页面分类\n                            <% } else if (link_type === \'topic\') { %>\n                                专题\n                            <% } else if (link_type === \'article\') { %>\n                                资讯\n                            <% } else if (link_type === \'goods\') { %>\n                                商品\n                            <% } else if (link_type === \'tag\') { %>\n                                商品标签\n                            <% } else if (link_type === \'activity\') { %>\n                                营销活动\n                            <% } else if (link_type === \'survey\') { %>\n                                调查\n                            <% } else if (link_type === \'homepage\') { %>\n                                店铺主页\n                            <% } else if (link_type === \'usercenter\') { %>\n                                会员主页\n                            <% } else if (link_type === \'link\') { %>\n                                外链\n                            <% } else if (link_type === \'history\') { %>\n                                历史信息\n                            <% } %>\n                        <% if (link_title !== \'\') { %>\n                                <em class="link-to-title-text"><%- link_title %></em>\n                            </span>\n                        </a>\n                        <% } else { %>\n                            </span>\n                        <% } %>\n                        <a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除">×</a>\n                    </div>\n                    <div class="dropdown hover pull-right">\n                        <a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>\n                        <%= dropdown_menu() %>\n                    </div>\n                </div>\n\n            <% } else { %>\n                <div class="dropdown hover">\n                    <a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:void(0);">设置链接到的页面地址 <i class="caret"></i></a>\n                    <%= dropdown_menu() %>\n                </div>\n            <% } %>\n        </div>\n    </div>\n</div>\n\n<div class="actions">\n    <span class="action add close-modal" title="添加">+</span><span class="action delete close-modal" title="删除">×</span>\n</div>\n'
}),define("text!components/public_template/dropdown_menu.html", [], function () {
    return '<ul class="dropdown-menu">\n    <li>\n        <a class="js-modal-magazine" data-type="feature" href="javascript:void(0);">微页面及分类</a>\n    </li>\n    <li>\n        <a class="js-modal-goods" data-type="goods" href="javascript:void(0);">商品及分类</a>\n    </li>\n    <% if (+_global.team_status.weixin_oldsub === 1 || +_global.team_status.weixin_server === 1 || +_global.team_status.weixin_certsub === 1) { %>\n    <li>\n        <a class="js-modal-activity" data-type="activity" href="javascript:void(0);">营销活动</a>\n    </li>\n    <% } %>\n    <li>\n        <a class="js-modal-survey" data-type="survey" href="javascript:void(0);">投票调查</a>\n    </li>\n    <% if (+_global.team_status.weixin_oldsub === 1 || +_global.team_status.weixin_server === 1 || +_global.team_status.weixin_certsub === 1) { %>\n    <li>\n        <a class="js-modal-history" data-type="history" href="javascript:void(0);">历史消息</a>\n    </li>\n    <% } %>\n    <li>\n        <a class="js-modal-homepage" data-type="homepage" href="javascript:void(0);">店铺主页</a>\n    </li>\n    <li>\n        <a class="js-modal-usercenter" data-type="usercenter" href="javascript:void(0);">会员主页</a>\n    </li>\n    <li>\n        <a class="js-modal-links" data-type="links" href="javascript:void(0);">自定义外链</a>\n    </li>\n</ul>\n'
}),define("components/showcase/2.0.0/image_ad/views/edit_item", ["require", "underscore", "jquery", "backbone", "components/showcase/2.0.0/base/views/edit_base", "text!components/showcase/2.0.0/image_ad/templates/edit_item.html", "text!components/public_template/dropdown_menu.html", "components/pop/atom/link", "components/modal/1.0.0/modal", "components/image/2.0.0/app", "core/utils"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = (e("backbone"), e("components/showcase/2.0.0/base/views/edit_base")), s = e("text!components/showcase/2.0.0/image_ad/templates/edit_item.html"), o = e("text!components/public_template/dropdown_menu.html"), a = e("components/pop/atom/link"), l = e("components/modal/1.0.0/modal"), c = e("components/image/2.0.0/app"), r = e("core/utils");
    return i.extend({
        tagName: "li", className: "choice", template: t.template(s), dropdownTpl: t.template(o), events: {
            'blur input[type="text"]': "updateModel",
            "click .actions .delete": "delete",
            "click .actions .add": "add",
            "click .js-trigger-image": "chooseImage",
            "click .js-modal-magazine, .js-modal-goods, .js-modal-activity, .js-modal-survey": "chooseLink",
            "click .js-modal-history, .js-modal-homepage, .js-modal-usercenter": "chooseStaticLink",
            "click .js-modal-links": "chooseOtherLink",
            "click .js-delete-link": "deleteLink"
        }, onInit: function (e) {
            this.parent = e.parent || {}, this.listenTo(this.model, "change", this.render)
        }, serializeData: function () {
            var e = this.model.cid, n = t.clone(this.model.attributes);
            t.extend(n, {cid: e, dropdown_menu: this.dropdownTpl});
            var i = this.model.get("image_url");
            return i = i && r.fullfillImage(i, "!100x100+2x.jpg"), n.image_url = i, n.image_thumb_url = i, n
        }, chooseImage: function () {
            var e = this;
            c.initialize({
                multiChoose: !1, callback: function (t) {
                    t = t[0], e.model.set({
                        image_id: t.attachment_id,
                        image_url: t.attachment_url,
                        image_thumb_url: t.thumb_url,
                        image_width: Number(t.width),
                        image_height: Number(t.height)
                    }), e.options.layout.model.calculateImage()
                }
            })
        }, chooseLink: function (e) {
            var t = this, i = n(e.target).data("type");
            l.initialize({type: i}).setChooseItemCallback(function (e) {
                t.model.set({link_id: e.data_id, link_type: e.type, link_title: e.data_title, link_url: e.data_url})
            }).modal("show")
        }, chooseStaticLink: function (e) {
            var t = n(e.target).data("type"), i = this;
            r.getStaticUrl(t, function (e) {
                i.model.set({link_id: "", link_type: t, link_title: "", link_url: e})
            })
        }, chooseOtherLink: function (e) {
            var t, i = this;
            t = this.$(this.$(".js-link-to").length > 0 ? ".js-link-to" : ".js-dropdown-toggle");
            var s = e.target;
            a.initialize({
                target: t, trigger: n(s), callback: function (e) {
                    i.model.set({link_id: "", link_type: "link", link_title: e, link_url: e})
                }
            })
        }, deleteLink: function () {
            this.model.set({link_id: "", link_type: "", link_title: "", link_url: ""})
        }, "delete": function () {
            this.model.destroy()
        }, add: function () {
            if (this.model.collection.length >= 20)return void r.errorNotify("选项最多20个。");
            var e = t.clone(this.model.constructor.prototype.defaults), n = this.model.collection.indexOf(this.model);
            this.model.collection.add(e, {at: n + 1, element: this.$el}), this.model.collection.trigger("reset")
        }
    })
}),define("components/showcase/2.0.0/image_ad/views/edit_collection", ["require", "components/showcase/2.0.0/base/views/edit_collection_base", "components/showcase/2.0.0/image_ad/views/edit_item"], function (e) {
    var t = e("components/showcase/2.0.0/base/views/edit_collection_base"), n = e("components/showcase/2.0.0/image_ad/views/edit_item");
    return t.extend({
        itemView: n, onShow: function () {
            this.sortable()
        }
    })
}),define("text!components/showcase/2.0.0/image_ad/templates/edit.html", [], function () {
    return '<form class="form-horizontal" novalidate>\n    <div class="control-group">\n        <label class="control-label">显示方式：</label>\n        <div class="controls">\n            <% if (show_method == \'0\') { %>\n                <label class="radio inline">\n                        <input type="radio" name="show_method" value="0" checked>折叠轮播\n                </label>\n                <label class="radio inline">\n                        <input type="radio" name="show_method" value="1">分开显示\n                </label>\n            <% } else { %>\n                <label class="radio inline">\n                    <input type="radio" name="show_method" value="0">折叠轮播\n                </label>\n                <label class="radio inline">\n                        <input type="radio" name="show_method" value="1" checked>分开显示\n                </label>\n            <% } %>\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label">显示大小：</label>\n        <div class="controls">\n            <label class="radio inline">\n                <input type="radio" name="size" value="0" <% if (size == \'0\') { %> checked <% } %>>大图\n            </label>\n            <% if (show_method == \'1\') { %>\n            <label class="radio inline">\n                <input type="radio" name="size" value="1" <% if (size == \'1\') { %> checked <% } %>>小图\n            </label>\n            <% } %>\n        </div>\n    </div>\n\n    <div class="control-group js-choices-region">\n    </div>\n\n    <div class="control-group options">\n        <a href="javascript:void(0);" class="add-option js-add-option"><i class="icon-add"></i> 添加一个广告</a>\n    </div>\n</form>\n'
}),define("components/showcase/2.0.0/image_ad/views/edit", ["require", "underscore", "components/showcase/2.0.0/base/views/edit_base", "components/showcase/2.0.0/image_ad/views/edit_collection", "text!components/showcase/2.0.0/image_ad/templates/edit.html", "components/image/2.0.0/app", "core/utils"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/edit_base"), i = e("components/showcase/2.0.0/image_ad/views/edit_collection"), s = e("text!components/showcase/2.0.0/image_ad/templates/edit.html"), o = e("components/image/2.0.0/app"), a = e("core/utils");
    return n.extend({
        template: t.template(s),
        events: {
            'blur input[type="text"]': "updateModel",
            'change input[type="radio"]': "updateModel",
            'click input[type="checkbox"]': "updateModel",
            "click .js-add-option": "addOption"
        },
        regions: {choicesRegion: ".js-choices-region"},
        onInit: function (e) {
            this.parent = e.parent;
            var t = this;
            this.listenTo(this.model, "change:show_method", this.render), this.listenTo(this.model.get("sub_entry"), "remove", function (e, n) {
                n.models.length < 10 && t.$(".options").show(), t.model.calculateImage()
            })
        },
        onRender: function () {
            this.model.get("sub_entry").length >= 10 && this.$(".options").hide(), this.choicesRegion.show(new i({
                collection: this.model.get("sub_entry"),
                layout: this
            }))
        },
        addOption: function () {
            var e = this, n = e.model.get("sub_entry");
            o.initialize({
                callback: function (e) {
                    var i = !1;
                    if (t.each(e, function (e) {
                            n.length < 10 ? n.add({
                                type: "image_ad_selection",
                                image_id: e.attachment_id,
                                image_url: e.attachment_url,
                                image_thumb_url: e.thumb_url,
                                image_width: Number(e.width),
                                image_height: Number(e.height)
                            }) : i = !0
                        }), n.trigger("update"), i) {
                        var s = setTimeout(a.clearNotify, 3e3);
                        a.errorNotify("图片广告不能多于10个，已经自动删除多余的图片。", function () {
                            clearTimeout(s)
                        })
                    }
                }
            })
        }
    })
}),define("text!components/showcase/2.0.0/nav/templates/edit_item.html", [], function () {
    return '<div class="choice-image">\n    <% if (image_id === \'\') { %>\n        <a class="add-image js-trigger-image" href="javascript: void(0);"><i class="icon-add"></i>  添加图片</a>\n    <% } else { %>\n        <img src="<%= image_url %>" data-full-size="<%= image_url %>" width="118" height="118" class="thumb-image">\n        <a class="modify-image js-trigger-image" href="javascript: void(0);">重新上传</a>\n    <% } %>\n\n    <!-- for error msg -->\n    <div class="control-group">\n        <div class="controls">\n            <input type="hidden" name="image_url">\n        </div>\n    </div>\n</div>\n<div class="choice-content">\n    <div class="control-group">\n        <label class="control-label">文字：</label>\n        <div class="controls">\n            <input class="" type="text" name="title" value="<%- title %>" maxLength="5">\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label">链接：</label>\n        <div class="controls">\n            <input type="hidden" name="link_url">\n            <% if (link_type != \'\') { %>\n                <div class="control-action clearfix">\n                    <div class="pull-left js-link-to link-to">\n                        <% if (link_title !== \'\') { %>\n                        <a href="<%= link_url %>" target="_blank" class="new-window link-to-title">\n                        <% } %>\n\n                        <span class="label label-success">\n                            <% if (link_type === \'feature\') { %>\n                                微页面\n                            <% } else if (link_type === \'category\') { %>\n                                微页面分类\n                            <% } else if (link_type === \'topic\') { %>\n                                专题\n                            <% } else if (link_type === \'article\') { %>\n                                资讯\n                            <% } else if (link_type === \'goods\') { %>\n                                商品\n                            <% } else if (link_type === \'tag\') { %>\n                                商品标签\n                            <% } else if (link_type === \'activity\') { %>\n                                营销活动\n                            <% } else if (link_type === \'survey\') { %>\n                                调查\n                            <% } else if (link_type === \'homepage\') { %>\n                                店铺主页\n                            <% } else if (link_type === \'usercenter\') { %>\n                                会员主页\n                            <% } else if (link_type === \'link\') { %>\n                                外链\n                            <% } else if (link_type === \'history\') { %>\n                                历史信息\n                            <% } %>\n                        <% if (link_title !== \'\') { %>\n                                <em class="link-to-title-text"><%- link_title %></em>\n                            </span>\n                        </a>\n                        <% } else { %>\n                            </span>\n                        <% } %>\n                        <a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除">×</a>\n                    </div>\n                    <div class="dropdown hover pull-right">\n                        <a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>\n                        <%= dropdown_menu() %>\n                    </div>\n                </div>\n\n            <% } else { %>\n                <div class="dropdown hover">\n                    <a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:void(0);">设置链接到的页面地址 <i class="caret"></i></a>\n                    <%= dropdown_menu() %>\n                </div>\n            <% } %>\n        </div>\n    </div>\n</div>\n'
}),define("components/showcase/2.0.0/nav/views/edit_item", ["require", "underscore", "jquery", "components/showcase/2.0.0/base/views/edit_base", "text!components/showcase/2.0.0/nav/templates/edit_item.html", "text!components/public_template/dropdown_menu.html", "components/pop/atom/link", "components/modal/1.0.0/modal", "components/image/2.0.0/app", "core/utils"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("components/showcase/2.0.0/base/views/edit_base"), s = e("text!components/showcase/2.0.0/nav/templates/edit_item.html"), o = e("text!components/public_template/dropdown_menu.html"), a = e("components/pop/atom/link"), l = e("components/modal/1.0.0/modal"), c = e("components/image/2.0.0/app"), r = e("core/utils");
    return i.extend({
        tagName: "li",
        className: "choice",
        template: t.template(s),
        dropdownTpl: t.template(o),
        events: {
            'blur input[type="text"]': "updateModel",
            "click .actions .delete": "delete",
            "click .actions .add": "add",
            "click .js-trigger-image": "chooseImage",
            "click .js-modal-magazine, .js-modal-goods, .js-modal-activity, .js-modal-survey": "chooseLink",
            "click .js-modal-history, .js-modal-homepage, .js-modal-usercenter": "chooseStaticLink",
            "click .js-modal-links": "chooseOtherLink",
            "click .js-delete-link": "deleteLink"
        },
        onInit: function () {
            this.listenTo(this.model, "change:image_url", this.render), this.listenTo(this.model, "change:link_url", this.render)
        },
        serializeData: function () {
            var e = t.clone(this.model.attributes);
            t.extend(e, {dropdown_menu: this.dropdownTpl});
            var n = this.model.get("image_url");
            return n = n && r.fullfillImage(n, "!100x100+2x.jpg"), e.image_url = n, e.image_thumb_url = n, e
        },
        chooseImage: function () {
            var e = this;
            c.initialize({
                multiChoose: !1, callback: function (t) {
                    t = t[0], e.model.set({
                        image_id: t.attachment_id,
                        image_url: t.attachment_url,
                        image_thumb_url: t.thumb_url,
                        image_width: Number(t.width),
                        image_height: Number(t.height)
                    })
                }
            })
        },
        chooseLink: function (e) {
            var t = this, i = n(e.target).data("type");
            l.initialize({type: i}).setChooseItemCallback(function (e) {
                t.model.set({link_id: e.data_id, link_type: e.type, link_title: e.data_title, link_url: e.data_url})
            }).modal("show")
        },
        chooseStaticLink: function (e) {
            var t = n(e.target).data("type"), i = this;
            r.getStaticUrl(t, function (e) {
                i.model.set({link_id: "", link_type: t, link_title: "", link_url: e})
            })
        },
        chooseOtherLink: function (e) {
            var t, i = this;
            t = this.$(this.$(".js-link-to").length > 0 ? ".js-link-to" : ".js-dropdown-toggle");
            var s = e.target;
            a.initialize({
                target: t, trigger: n(s), callback: function (e) {
                    i.model.set({link_id: "", link_type: "link", link_title: e, link_url: e})
                }
            })
        },
        deleteLink: function () {
            this.model.set({link_id: "", link_type: "", link_title: "", link_url: ""})
        }
    })
}),define("components/showcase/2.0.0/nav/views/edit_collection", ["require", "components/showcase/2.0.0/base/views/edit_collection_base", "components/showcase/2.0.0/nav/views/edit_item"], function (e) {
    var t = e("components/showcase/2.0.0/base/views/edit_collection_base"), n = e("components/showcase/2.0.0/nav/views/edit_item");
    return t.extend({
        itemView: n, onShow: function () {
            this.sortable()
        }
    })
}),define("text!components/showcase/2.0.0/nav/templates/edit.html", [], function () {
    return '<form class="form-horizontal" novalidate>\n    <div class="js-collection-region">\n\n    </div>\n</form>\n'
}),define("components/showcase/2.0.0/nav/views/edit", ["require", "underscore", "components/showcase/2.0.0/base/views/edit_base", "components/showcase/2.0.0/nav/views/edit_collection", "text!components/showcase/2.0.0/nav/templates/edit.html"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/edit_base"), i = e("components/showcase/2.0.0/nav/views/edit_collection"), s = e("text!components/showcase/2.0.0/nav/templates/edit.html");
    return n.extend({
        template: t.template(s),
        events: {
            'blur input[type="text"]': "updateModel",
            'change input[type="radio"]': "updateModel",
            'click input[type="checkbox"]': "updateModel"
        },
        regions: {collectionRegion: ".js-collection-region"},
        onInit: function () {
            this.listenTo(this.model.get("sub_entry"), "reset remove add", this.toggleOptions)
        },
        onRender: function () {
            this.collectionRegion.show(new i({
                collection: this.model.get("sub_entry"),
                layout: this
            })), this.toggleOptions()
        },
        toggleOptions: function () {
            this.model.get("sub_entry").length >= 4 ? this.$(".options").hide() : this.$(".options").show()
        }
    })
}),define("text!components/showcase/2.0.0/showcase/templates/edit_item.html", [], function () {
    return '<div class="choice-image">\n    <% if (image_id === \'\') { %>\n        <a class="add-image js-trigger-image" href="javascript: void(0);"><i class="icon-add"></i>  添加图片</a>\n    <% } else { %>\n        <img src="<%= fullfillImage(image_url, \'!100x100+2x.jpg\') %>" width="118" height="118" class="thumb-image">\n        <a class="modify-image js-trigger-image" href="javascript: void(0);">重新上传</a>\n    <% } %>\n\n    <!-- for error msg -->\n    <div class="control-group">\n        <div class="controls">\n            <input type="hidden" name="image_url">\n        </div>\n    </div>\n</div>\n<div class="choice-content">\n\n    <div class="control-group hide">\n        <label class="control-label">文字：</label>\n        <div class="controls">\n            <input class="input-xxlarge" type="text" name="title" value="<%- title %>" maxLength="5">\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label">链接：</label>\n        <div class="controls">\n            <input type="hidden" name="link_url">\n            <% if (link_type != \'\') { %>\n                <div class="control-action clearfix">\n                    <div class="pull-left js-link-to link-to">\n                        <% if (link_title !== \'\') { %>\n                        <a href="<%= link_url %>" target="_blank" class="new-window link-to-title">\n                        <% } %>\n\n                        <span class="label label-success">\n                            <% if (link_type === \'feature\') { %>\n                                微页面\n                            <% } else if (link_type === \'category\') { %>\n                                微页面分类\n                            <% } else if (link_type === \'topic\') { %>\n                                专题\n                            <% } else if (link_type === \'article\') { %>\n                                资讯\n                            <% } else if (link_type === \'goods\') { %>\n                                商品\n                            <% } else if (link_type === \'tag\') { %>\n                                商品标签\n                            <% } else if (link_type === \'activity\') { %>\n                                营销活动\n                            <% } else if (link_type === \'survey\') { %>\n                                调查\n                            <% } else if (link_type === \'homepage\') { %>\n                                店铺主页\n                            <% } else if (link_type === \'usercenter\') { %>\n                                会员主页\n                            <% } else if (link_type === \'link\') { %>\n                                外链\n                            <% } else if (link_type === \'history\') { %>\n                                历史信息\n                            <% } %>\n                        <% if (link_title !== \'\') { %>\n                                <em class="link-to-title-text"><%- link_title %></em>\n                            </span>\n                        </a>\n                        <% } else { %>\n                            </span>\n                        <% } %>\n                        <a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除">×</a>\n                    </div>\n                    <div class="dropdown hover pull-right">\n                        <a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>\n                        <%= dropdown_menu() %>\n                    </div>\n                </div>\n\n            <% } else { %>\n                <div class="dropdown hover">\n                    <a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:void(0);">设置链接到的页面地址 <i class="caret"></i></a>\n                    <%= dropdown_menu() %>\n                </div>\n            <% } %>\n        </div>\n    </div>\n</div>\n\n'
}),define("components/showcase/2.0.0/showcase/views/edit_item", ["require", "underscore", "jquery", "components/showcase/2.0.0/base/views/edit_base", "text!components/showcase/2.0.0/showcase/templates/edit_item.html", "text!components/public_template/dropdown_menu.html", "components/pop/atom/link", "components/modal/1.0.0/modal", "components/image/2.0.0/app", "core/utils"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("components/showcase/2.0.0/base/views/edit_base"), s = e("text!components/showcase/2.0.0/showcase/templates/edit_item.html"), o = e("text!components/public_template/dropdown_menu.html"), a = e("components/pop/atom/link"), l = e("components/modal/1.0.0/modal"), c = e("components/image/2.0.0/app"), r = e("core/utils");
    return i.extend({
        tagName: "li",
        className: "choice",
        template: t.template(s),
        dropdownTpl: t.template(o),
        templateHelpers: function () {
            return {dropdown_menu: this.dropdownTpl, fullfillImage: r.fullfillImage}
        },
        events: {
            'blur input[type="text"]': "updateModel",
            "click .actions .delete": "delete",
            "click .actions .add": "add",
            "click .js-trigger-image": "chooseImage",
            "click .js-modal-magazine, .js-modal-goods, .js-modal-activity, .js-modal-survey": "chooseLink",
            "click .js-modal-history, .js-modal-homepage, .js-modal-usercenter": "chooseStaticLink",
            "click .js-modal-links": "chooseOtherLink",
            "click .js-delete-link": "deleteLink"
        },
        onInit: function () {
            this.listenTo(this.model, "change:image_url", this.render), this.listenTo(this.model, "change:link_url", this.render)
        },
        chooseImage: function () {
            var e = this;
            c.initialize({
                multiChoose: !1, callback: function (t) {
                    t = t[0], e.model.set({
                        image_id: t.attachment_id,
                        image_url: t.attachment_url,
                        image_thumb_url: t.thumb_url,
                        image_width: Number(t.width),
                        image_height: Number(t.height)
                    })
                }
            })
        },
        chooseLink: function (e) {
            var t = this, i = n(e.target).data("type");
            l.initialize({type: i}).setChooseItemCallback(function (e) {
                t.model.set({link_id: e.data_id, link_type: e.type, link_title: e.data_title, link_url: e.data_url})
            }).modal("show")
        },
        chooseStaticLink: function (e) {
            var t = n(e.target).data("type"), i = this;
            r.getStaticUrl(t, function (e) {
                i.model.set({link_id: "", link_type: t, link_title: "", link_url: e})
            })
        },
        chooseOtherLink: function (e) {
            var t, i = this;
            t = this.$(this.$(".js-link-to").length > 0 ? ".js-link-to" : ".js-dropdown-toggle");
            var s = e.target;
            a.initialize({
                target: t, trigger: n(s), callback: function (e) {
                    i.model.set({link_id: "", link_type: "link", link_title: e, link_url: e})
                }
            })
        },
        deleteLink: function () {
            this.model.set({link_id: "", link_type: "", link_title: "", link_url: ""})
        },
        "delete": function () {
            this.model.destroy()
        },
        add: function () {
            if (this.model.collection.length >= 20)return void r.errorNotify("选项最多20个。");
            var e = t.clone(this.model.constructor.prototype.defaults), n = this.model.index();
            this.model.collection.add(e, {at: n + 1})
        }
    })
}),define("components/showcase/2.0.0/showcase/views/edit_collection", ["require", "components/showcase/2.0.0/base/views/edit_collection_base", "components/showcase/2.0.0/showcase/views/edit_item"], function (e) {
    var t = e("components/showcase/2.0.0/base/views/edit_collection_base"), n = e("components/showcase/2.0.0/showcase/views/edit_item");
    return t.extend({
        itemView: n, onShow: function () {
            this.sortable()
        }
    })
}),define("text!components/showcase/2.0.0/showcase/templates/edit.html", [], function () {
    return '<form class="form-horizontal" novalidate>\n    <div class="control-group">\n        <label class="control-label">橱窗标题名：</label>\n        <div class="controls">\n            <input type="text" name="title" value="<%= title %>" maxLength="15">\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label">显示方式：</label>\n        <div class="controls">\n            <label class="radio inline">\n                <input type="radio" name="mode" value="0" <% if (mode == \'0\') { %> checked <% } %>>默认\n            </label>\n            <label class="radio inline">\n                <input type="radio" name="mode" value="1" <% if (mode == \'1\') { %> checked <% } %>>3 列\n            </label>\n            <p class="help-desc">PC版一直显示 3 列</p>\n        </div>\n    </div>\n\n    <div class="control-group">\n        <label class="control-label">内容区标题：</label>\n        <div class="controls">\n            <input type="text" name="body_title" value="<%= body_title %>" maxLength="15">\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label">内容区说明：</label>\n        <div class="controls">\n            <textarea name="body_desc" cols="15" rows="3" maxLength="50"><%= body_desc %></textarea>\n        </div>\n    </div>\n\n    <div class="control-group js-collection-region">\n\n    </div>\n\n</form>\n'
}),define("components/showcase/2.0.0/showcase/views/edit", ["require", "underscore", "components/showcase/2.0.0/base/views/edit_base", "components/showcase/2.0.0/showcase/views/edit_collection", "text!components/showcase/2.0.0/showcase/templates/edit.html"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/edit_base"), i = e("components/showcase/2.0.0/showcase/views/edit_collection"), s = e("text!components/showcase/2.0.0/showcase/templates/edit.html");
    return n.extend({
        template: t.template(s),
        events: {
            'blur input[type="text"]': "updateModel",
            "blur textarea": "updateModel",
            'change input[type="radio"]': "updateModel",
            'click input[type="checkbox"]': "updateModel"
        },
        regions: {collectionRegion: ".js-collection-region"},
        onRender: function () {
            this.collectionRegion.show(new i({collection: this.model.get("sub_entry"), layout: this}))
        }
    })
}),define("text!components/showcase/2.0.0/level/templates/edit.html", [], function () {
    return '<form class="form-horizontal" novalidate>\n    <div class="control-group">\n        <label class="control-label">背景图：</label>\n        <div class="controls">\n            <% if (image.url === \'\') { %>\n                <a class="js-choose-bg control-action" href="javascript: void(0);">选择背景图</a>\n            <% } else { %>\n                <img src="<%= fullfillImage(image.url) %>" width="100" height="100">\n                <a class="js-choose-bg control-action" href="javascript: void(0);">修改背景图</a>\n            <% } %>\n            <p class="help-desc">背景图推荐宽度 640 像素、高度 320 像素</p>\n        </div>\n    </div>\n    <div class="separate-line-wrap">\n        <hr>\n        <div class="separate-line">\n            <p class="text-center">显示等级的设置</p>\n            <p class="text-center">v</p>\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label">等级：</label>\n        <div class="controls">\n            <label class="checkbox inline">\n                <% if (show_level == \'0\') { %>\n                    <input type="checkbox" name="show_level" value="0">显示等级\n                <% } else { %>\n                    <input type="checkbox" name="show_level" value="1" checked>显示等级\n                <% } %>\n            </label>\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label">等级提示：</label>\n        <div class="controls">\n            <input type="text" name="level_msg" value="<%- level_msg %>">\n        </div>\n    </div>\n    <div class="separate-line-wrap">\n        <hr>\n        <div class="separate-line">\n            <p class="text-center">显示积分的设置</p>\n            <p class="text-center">v</p>\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label">积分：</label>\n        <div class="controls">\n            <label class="checkbox inline">\n                <% if (show_point == \'0\') { %>\n                    <input type="checkbox" name="show_point" value="0">显示积分\n                <% } else { %>\n                    <input type="checkbox" name="show_point" value="1" checked>显示积分\n                <% } %>\n            </label>\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label">积分提示：</label>\n        <div class="controls">\n            <input type="text" name="point_msg" value="<%- point_msg %>">\n        </div>\n    </div>\n</form>\n'
}),define("components/showcase/2.0.0/level/views/edit", ["components/showcase/2.0.0/base/views/edit_base", "text!components/showcase/2.0.0/level/templates/edit.html", "components/modal/1.0.0/modal", "components/image/2.0.0/app", "core/utils"], function (e, t, n, i, s) {
    return e.extend({
        template: _.template(t),
        events: {
            'blur input[type="text"]': "updateModel",
            'change input[type="radio"]': "updateModel",
            'click input[type="checkbox"]': "updateModel",
            "click .js-choose-bg": function () {
                var e = this;
                i.initialize({
                    multiChoose: !1, callback: function (t) {
                        t = t[0], e.model.set("image", {
                            id: t.attachment_id,
                            url: t.attachment_url
                        }), e.model.set("is_default", !1)
                    }
                })
            }
        },
        onInit: function (e) {
            this.parent = e.parent, this.listenTo(this.model, "change:image", this.render)
        },
        render: function (e) {
            return this.$el.html(this.template(_.extend({}, this.model.attributes, {fullfillImage: s.fullfillImage}))), this
        }
    })
}),define("text!components/showcase/2.0.0/link/templates/edit_item.html", [], function () {
    return '<div class="control-group">\n    <label class="control-label"><em class="required">*</em>内容来源：</label>\n    <div class="controls">\n        <% if (source_type != \'\') { %>\n            <div class="control-action clearfix">\n                <div class="pull-left js-link-to link-to">\n                    <% if (source_title !== \'\' && source_type !== \'link\') { %>\n                        <input type="hidden" name="source_url" value="<%= source_url %>">\n                        <a href="<%= source_url %>" target="_blank" class="new-window link-to-title">\n                    <% } %>\n                    <span class="label label-success">\n                    <% if (source_type === \'feature\') { %>\n                        微页面\n                    <% } else if (source_type === \'category\') { %>\n                        微页面分类\n                    <% } else if (source_type === \'topic\') { %>\n                        专题\n                    <% } else if (source_type === \'article\') { %>\n                        资讯\n                    <% } else if (source_type === \'goods\') { %>\n                        商品\n                    <% } else if (source_type === \'tag\') { %>\n                        商品标签\n                    <% } else if (source_type === \'activity\') { %>\n                        营销活动\n                    <% } else if (source_type === \'survey\') { %>\n                        调查\n                    <% } else if (source_type === \'homepage\') { %>\n                        店铺主页\n                    <% } else if (source_type === \'usercenter\') { %>\n                        会员主页\n                    <% } else if (source_type === \'link\') { %>\n                        自定义外链\n                    <% } else if (source_type === \'history\') { %>\n                        历史信息\n                    <% } %>\n                <% if (source_title !== \'\' && source_type !== \'link\') { %>\n                        <em class="link-to-title-text"><%- source_title %></em>\n                    </span></a>\n                <% } else { %>\n                    </span>\n                <% } %>\n                </div>\n                <% if (source_type !== \'link\') { %>\n                <div class="dropdown hover pull-right">\n                    <a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>\n                    <ul class="dropdown-menu">\n                        <li>\n                            <a class="js-modal-category" data-type="category" href="javascript:void(0);">微页面分类</a>\n                        </li>\n                        <li>\n                            <a class="js-modal-tag" data-type="tag" href="javascript:void(0);">商品标签</a>\n                        </li>\n                    </ul>\n                </div>\n                <% } %>\n            </div>\n\n        <% } else { %>\n            <div class="dropdown hover">\n                <a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:void(0);">设置链接到的页面地址 <i class="caret"></i></a>\n                <ul class="dropdown-menu">\n                    <li>\n                        <a class="js-modal-category" data-type="category" href="javascript:void(0);">微页面分类</a>\n                    </li>\n                    <li>\n                        <a class="js-modal-tag" data-type="tag" href="javascript:void(0);">商品标签</a>\n                    </li>\n                    <li>\n                        <a class="js-modal-links" data-type="links" href="javascript:void(0);">自定义外链</a>\n                    </li>\n                </ul>\n            </div>\n        <% } %>\n        <input type="hidden" name="source_url">\n    </div>\n</div>\n\n<% if (source_type === \'link\') { %>\n<div class="control-group">\n    <label class="control-label"><em class="required">*</em>链接名称：</label>\n    <div class="controls">\n        <input type="text" name="source_title" value="<%- source_title %>">\n    </div>\n</div>\n<div class="control-group">\n    <label class="control-label"><em class="required">*</em>链接地址：</label>\n    <div class="controls">\n        <input type="text" name="source_url" value="<%- source_url %>" class="js-fullfill-url">\n    </div>\n</div>\n<% } else if (source_type !== \'\') { %>\n<div class="control-group">\n    <label class="control-label">显示条数：</label>\n    <div class="controls">\n        <select name="number">\n            <option value="1" <% if (number == 1) {%>selected<% } %>>1条</option>\n            <option value="2" <% if (number == 2) {%>selected<% } %>>2条</option>\n            <option value="3" <% if (number == 3) {%>selected<% } %>>3条</option>\n            <option value="4" <% if (number == 4) {%>selected<% } %>>4条</option>\n            <option value="5" <% if (number == 5) {%>selected<% } %>>5条</option>\n        </select>\n    </div>\n</div>\n<% } %>\n\n<div class="actions">\n    <span class="action add close-modal" title="添加">+</span><span class="action delete close-modal" title="删除">×</span>\n</div>\n'
}),define("components/showcase/2.0.0/link/views/edit_item", ["require", "underscore", "jquery", "components/showcase/2.0.0/base/views/edit_base", "text!components/showcase/2.0.0/link/templates/edit_item.html", "components/pop/atom/link", "components/modal/1.0.0/modal", "core/utils"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("components/showcase/2.0.0/base/views/edit_base"), s = e("text!components/showcase/2.0.0/link/templates/edit_item.html"), o = e("components/pop/atom/link"), a = e("components/modal/1.0.0/modal"), l = e("core/utils");
    return i.extend({
        tagName: "li",
        className: "choice",
        template: t.template(s),
        events: {
            'blur input[type="text"]:not(.js-fullfill-url)': "updateModel",
            "blur .js-fullfill-url": "urlCheck",
            "change select": "updateModel",
            "click .actions .delete": "delete",
            "click .actions .add": "add",
            "click .js-modal-category, .js-modal-tag": "chooseLink",
            "click .js-modal-links": "chooseOtherLink"
        },
        onInit: function () {
            this.listenTo(this.model, "change", this.render)
        },
        urlCheck: function (e) {
            this.fullfillUrl(e, "source_url")
        },
        chooseLink: function (e) {
            var t = this, i = n(e.target).data("type");
            a.initialize({type: i}).setChooseItemCallback(function (e) {
                t.model.set({
                    source_id: e.data_id || e.id,
                    source_type: i,
                    source_url: e.data_url,
                    source_image: e.cover_attachment_url,
                    source_title: e.data_title
                })
            }).modal("show")
        },
        chooseOtherLink: function (e) {
            var t, i = this;
            t = this.$(this.$(".js-link-to").length > 0 ? ".js-link-to" : ".js-dropdown-toggle");
            var s = e.target;
            o.initialize({
                target: t, trigger: n(s), callback: function (e) {
                    i.model.set({source_id: "", source_type: "link", source_url: e, source_image: "", source_title: e})
                }
            })
        },
        "delete": function () {
            this.model.destroy()
        },
        add: function () {
            if (this.model.collection.length >= 20)return void l.errorNotify("选项最多20个。");
            var e = t.clone(this.model.constructor.prototype.defaults), n = this.model.index();
            this.model.collection.add(e, {at: n + 1}), this.model.collection.trigger("reset")
        }
    })
}),define("components/showcase/2.0.0/link/views/edit_collection", ["require", "components/showcase/2.0.0/base/views/edit_collection_base", "components/showcase/2.0.0/link/views/edit_item"], function (e) {
    var t = e("components/showcase/2.0.0/base/views/edit_collection_base"), n = e("components/showcase/2.0.0/link/views/edit_item");
    return t.extend({
        itemView: n, onShow: function () {
            this.sortable()
        }
    })
}),define("text!components/showcase/2.0.0/link/templates/edit.html", [], function () {
    return '<form class="form-horizontal" novalidate>\n    <% if (show_method == \'1\') { %>\n    <div class="control-group">\n        <label class="control-label">显示方式：</label>\n        <div class="controls">\n            <label class="radio inline">\n                <input type="radio" name="show_method" value="0">通栏\n            </label>\n        </div>\n    </div>\n    <% } %>\n    <div class="control-group js-collection-region">\n\n    </div>\n    <div class="control-group options">\n        <a class="js-add-option add-option" href="javascript:void(0);"><i class="icon-add"></i> 添加一个关联链接</a>\n    </div>\n</form>\n'
}),define("components/showcase/2.0.0/link/views/edit", ["require", "underscore", "components/showcase/2.0.0/base/views/edit_base", "components/showcase/2.0.0/link/views/edit_collection", "text!components/showcase/2.0.0/link/templates/edit.html"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/edit_base"), i = e("components/showcase/2.0.0/link/views/edit_collection"), s = e("text!components/showcase/2.0.0/link/templates/edit.html");
    return n.extend({
        template: t.template(s),
        events: {'change input[type="radio"]': "updateModel", "click .js-add-option": "addOption"},
        regions: {collectionRegion: ".js-collection-region"},
        onInit: function () {
            this.listenTo(this.model.get("sub_entry"), "reset remove add", this.toggleOptions)
        },
        onRender: function () {
            this.collectionRegion.show(new i({
                collection: this.model.get("sub_entry"),
                layout: this
            })), this.toggleOptions()
        },
        addOption: function () {
            var e = {type: "source_selection", number: "3"};
            this.model.get("sub_entry").add(e)
        },
        toggleOptions: function () {
            this.model.get("sub_entry").length >= 20 ? this.$(".options").hide() : this.$(".options").show()
        }
    })
}),define("text!components/showcase/2.0.0/text_nav/templates/edit.html", [], function () {
    return '<form class="form-horizontal" novalidate>\n    <% if (show_method == \'1\') { %>\n    <div class="control-group">\n        <label class="control-label">显示方式：</label>\n        <div class="controls">\n            <label class="radio inline">\n                <input type="radio" name="show_method" value="0">通栏\n            </label>\n        </div>\n    </div>\n    <% } %>\n    <div class="control-group js-collection-region">\n\n    </div>\n    <div class="control-group options">\n        <a class="add-option js-add-option" href="javascript:void(0);"><i class="icon-add"></i> 添加一个文本导航</a>\n    </div>\n</form>\n'
}),define("text!components/showcase/2.0.0/text_nav/templates/edit_item.html", [], function () {
    return '<div class="control-group">\n    <label class="control-label"><em class="required">*</em>导航名称：</label>\n    <div class="controls">\n        <input type="text" name="title" value="<%= title %>">\n    </div>\n</div>\n<div class="control-group">\n    <label class="control-label"><em class="required">*</em>链接到：</label>\n    <div class="controls">\n        <% if (link_type != \'\') { %>\n\n                <input type="hidden" name="link_url">\n                <div class="control-action clearfix">\n                    <div class="pull-left js-link-to link-to">\n                        <% if (link_title !== \'\') { %>\n                            <a href="<%= link_url %>" target="_blank" class="new-window link-to-title">\n                        <% } %>\n\n                        <span class="label label-success">\n                            <% if (link_type === \'feature\') { %>\n                                微页面\n                            <% } else if (link_type === \'category\') { %>\n                                微页面分类\n                            <% } else if (link_type === \'topic\') { %>\n                                专题\n                            <% } else if (link_type === \'article\') { %>\n                                资讯\n                            <% } else if (link_type === \'goods\') { %>\n                                商品\n                            <% } else if (link_type === \'tag\') { %>\n                                商品标签\n                            <% } else if (link_type === \'activity\') { %>\n                                营销活动\n                            <% } else if (link_type === \'survey\') { %>\n                                调查\n                            <% } else if (link_type === \'homepage\') { %>\n                                店铺主页\n                            <% } else if (link_type === \'usercenter\') { %>\n                                会员主页\n                            <% } else if (link_type === \'link\') { %>\n                                外链\n                            <% } else if (link_type === \'history\') { %>\n                                历史信息\n                            <% } %>\n                        <% if (link_title !== \'\') { %>\n                                <em class="link-to-title-text"><%= link_title %></em>\n                            </span>\n                        </a>\n                        <% } else { %>\n                            </span>\n                        <% } %>\n                        <a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除">×</a>\n                    </div>\n\n                    <div class="dropdown hover pull-right">\n                        <a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>\n                        <%= dropdown_menu() %>\n                    </div>\n                </div>\n\n\n        <% } else { %>\n            <div class="dropdown hover">\n                <a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:void(0);">设置链接到的页面地址 <i class="caret"></i></a>\n                <%= dropdown_menu() %>\n            </div>\n        <% } %>\n        <input type="hidden" name="link_url">\n    </div>\n</div>\n<div class="actions">\n    <span class="action add close-modal" title="添加">+</span><span class="action delete close-modal" title="删除">×</span>\n</div>\n'
}),define("components/showcase/2.0.0/text_nav/views/edit_item", ["require", "underscore", "jquery", "components/showcase/2.0.0/base/views/edit_base", "text!components/showcase/2.0.0/text_nav/templates/edit_item.html", "text!components/public_template/dropdown_menu.html", "components/pop/atom/link", "components/modal/1.0.0/modal", "core/utils"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("components/showcase/2.0.0/base/views/edit_base"), s = e("text!components/showcase/2.0.0/text_nav/templates/edit_item.html"), o = e("text!components/public_template/dropdown_menu.html"), a = e("components/pop/atom/link"), l = e("components/modal/1.0.0/modal"), c = e("core/utils");
    return i.extend({
        tagName: "li",
        className: "choice",
        template: t.template(s),
        dropdownTpl: t.template(o),
        templateHelpers: function () {
            return {dropdown_menu: this.dropdownTpl}
        },
        events: {
            'blur input[type="text"]:not(.js-fullfill-url)': "updateModel",
            "blur .js-fullfill-url": "urlCheck",
            "click .actions .delete": "delete",
            "click .actions .add": "add",
            "click .js-modal-magazine, .js-modal-goods, .js-modal-activity, .js-modal-survey": "chooseLink",
            "click .js-modal-history, .js-modal-homepage, .js-modal-usercenter": "chooseStaticLink",
            "click .js-modal-links": "chooseOtherLink",
            "click .js-delete-link": "deleteLink"
        },
        onInit: function () {
            this.listenTo(this.model, "change", this.render)
        },
        urlCheck: function (e) {
            this.fullfillUrl(e, "link_url")
        },
        chooseLink: function (e) {
            var t = this, i = n(e.target).data("type");
            l.initialize({type: i}).setChooseItemCallback(function (e) {
                t.model.set({
                    link_id: e.data_id,
                    link_type: e.type,
                    link_title: e.data_title,
                    link_url: e.data_url,
                    title: t.getOldTitle() || e.data_title
                })
            }).modal("show")
        },
        chooseStaticLink: function (e) {
            var t = n(e.target).data("type"), i = this;
            c.getStaticUrl(t, function (e, n) {
                i.model.set({link_id: "", link_type: t, link_title: n, link_url: e, title: i.getOldTitle() || n})
            })
        },
        chooseOtherLink: function (e) {
            var t, i = this;
            t = this.$(this.$(".js-link-to").length > 0 ? ".js-link-to" : ".js-dropdown-toggle");
            var s = e.target;
            a.initialize({
                target: t, trigger: n(s), callback: function (e) {
                    i.model.set({link_id: "", link_type: "link", link_title: e, link_url: e})
                }
            })
        },
        deleteLink: function () {
            this.model.set({link_id: "", link_type: "", link_title: "", link_url: ""}), this.parent.render()
        },
        "delete": function () {
            this.model.destroy()
        },
        getOldTitle: function () {
            var e = this.model.toJSON();
            return e.title && e.title !== e.link_title ? e.title : ""
        },
        add: function () {
            if (this.model.collection.length >= 20)return void c.errorNotify("选项最多20个。");
            var e = t.clone(this.model.constructor.prototype.defaults), n = this.model.index();
            this.model.collection.add(e, {at: n + 1}), this.model.collection.trigger("reset")
        }
    })
}),define("components/showcase/2.0.0/text_nav/views/edit_collection", ["require", "components/showcase/2.0.0/base/views/edit_collection_base", "components/showcase/2.0.0/text_nav/views/edit_item"], function (e) {
    var t = e("components/showcase/2.0.0/base/views/edit_collection_base"), n = e("components/showcase/2.0.0/text_nav/views/edit_item");
    return t.extend({
        itemView: n, onShow: function () {
            this.sortable()
        }
    })
}),define("components/showcase/2.0.0/text_nav/views/edit", ["require", "underscore", "components/showcase/2.0.0/base/views/edit_base", "text!components/showcase/2.0.0/text_nav/templates/edit.html", "text!components/public_template/dropdown_menu.html", "components/showcase/2.0.0/text_nav/views/edit_collection"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/edit_base"), i = e("text!components/showcase/2.0.0/text_nav/templates/edit.html"), s = e("text!components/public_template/dropdown_menu.html"), o = e("components/showcase/2.0.0/text_nav/views/edit_collection");
    return n.extend({
        template: t.template(i),
        dropdownTpl: t.template(s),
        events: {'change input[type="radio"]': "updateModel", "click .js-add-option": "addOption"},
        regions: {collectionRegion: ".js-collection-region"},
        onInit: function () {
            this.listenTo(this.model.get("sub_entry"), "reset add remove", this.toggleOptions)
        },
        serializeData: function () {
            return t.extend({}, this.model.attributes, {dropdown_menu: this.dropdownTpl})
        },
        onRender: function () {
            this.collectionRegion.show(new o({
                collection: this.model.get("sub_entry"),
                layout: this
            })), this.toggleOptions()
        },
        addOption: function () {
            var e = {type: "text_nav_selection", title: ""};
            this.model.get("sub_entry").add(e)
        },
        toggleOptions: function () {
            this.model.get("sub_entry").length >= 20 ? this.$(".options").hide() : this.$(".options").show()
        }
    })
}),define("text!components/showcase/2.0.0/tag_list/templates/edit.html", [], function () {
    return '<form class="form-horizontal" novalidate>\n\n    <div class="control-group js-collection-region">\n\n    </div>\n    <div class="control-group options js-add-subentry">\n        <a class="add-option js-add-option" href="javascript:void(0);"><i class="icon-add"></i> 添加商品分组</a>\n    </div>\n\n    <div class="control-group">\n        <p class="app-component-desc help-desc">选择商品来源后，左侧实时预览暂不支持显示其包含的商品数据</p>\n    </div>\n\n</form>\n'
}),define("text!components/showcase/2.0.0/tag_list/templates/edit_item.html", [], function () {
    return '<div class="edit-tag-list">\n    <div class="tag-source">\n        <div class="control-group">\n            <label class="control-label pull-left">商品来源：</label>\n            <div class="controls pull-left">\n                <% if(title) { %>\n                        <a href="<%- url %>" target="_blank" class="tag-title new-window"><%- title %></a>\n                        <a href="javascript:;" class="tag-modify js-select-tag">修改</a>\n                <% } else { %>\n                    <a href="javascript:;" class="js-select-tag pull-left">选择商品分组</a>\n                <% } %>\n                <input type="hidden" name="title">\n            </div>\n        </div>\n    </div>\n    <div class="split-line"></div>\n    <div class="goods-number">\n        <span>显示商品数量</span>\n\n        <div class="dropdown hover pull-right">\n            <a class="dropdown-toggle" data-toggle="dropdown" href="javascript:void(0);"><%- goods_number %> <i class="caret"></i></a>\n            <ul class="dropdown-menu" role="menu">\n                <li>\n                    <a class="js-goods-number" data-value="5" href="javascript:void(0);">5</a>\n                </li>\n                <li>\n                    <a class="js-goods-number" data-value="10" href="javascript:void(0);">10</a>\n                </li>\n                <li>\n                    <a class="js-goods-number" data-value="15" href="javascript:void(0);">15</a>\n                </li>\n            </ul>\n        </div>\n    </div>\n</div>\n<div class="actions">\n    <span class="action delete close-modal" title="删除">×</span>\n</div>\n'
}),define("components/showcase/2.0.0/tag_list/views/edit_item", ["require", "underscore", "jquery", "components/showcase/2.0.0/base/views/edit_base", "text!components/showcase/2.0.0/tag_list/templates/edit_item.html", "components/modal/1.0.0/modal", "core/utils"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("components/showcase/2.0.0/base/views/edit_base"), s = e("text!components/showcase/2.0.0/tag_list/templates/edit_item.html"), o = e("components/modal/1.0.0/modal");
    e("core/utils");
    return i.extend({
        tagName: "li",
        className: "choice",
        template: t.template(s),
        events: {
            "click .actions .delete": "delete",
            "click .js-select-tag": "handleSelectTag",
            "click .js-goods-number": "handleGoodsNumber"
        },
        onInit: function () {
            this.listenTo(this.model, "change", this.render)
        },
        urlCheck: function (e) {
            this.fullfillUrl(e, "link_url")
        },
        "delete": function () {
            var e = this.model.collection;
            this.model.destroy(), e.trigger("reset")
        },
        handleSelectTag: function () {
            var e = this;
            this.tagModel = o.initialize({type: "tag"}).setChooseItemCallback(function (t) {
                e.model.set({type: t.data_type, id: t.data_id, title: t.title, url: t.data_url})
            }), this.tagModel.modal("show")
        },
        handleGoodsNumber: function (e) {
            var t = n(e.target).data("value");
            this.model.set("goods_number", t, {silent: !0}), this.render()
        }
    })
}),define("components/showcase/2.0.0/tag_list/views/edit_collection", ["require", "components/showcase/2.0.0/base/views/edit_collection_base", "components/showcase/2.0.0/tag_list/views/edit_item"], function (e) {
    var t = e("components/showcase/2.0.0/base/views/edit_collection_base"), n = e("components/showcase/2.0.0/tag_list/views/edit_item");
    return t.extend({
        itemView: n, onShow: function () {
            this.sortable()
        }
    })
}),define("components/showcase/2.0.0/tag_list/views/edit", ["require", "underscore", "components/showcase/2.0.0/base/views/edit_base", "text!components/showcase/2.0.0/tag_list/templates/edit.html", "components/showcase/2.0.0/tag_list/views/edit_collection", "components/modal/1.0.0/modal", "core/utils"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/edit_base"), i = e("text!components/showcase/2.0.0/tag_list/templates/edit.html"), s = e("components/showcase/2.0.0/tag_list/views/edit_collection"), o = e("components/modal/1.0.0/modal"), a = e("core/utils");
    return n.extend({
        template: t.template(i),
        events: {'change input[type="radio"]': "updateModel", "click .js-add-option": "addOption"},
        regions: {collectionRegion: ".js-collection-region"},
        onInit: function () {
            this.listenTo(this.model.get("sub_entry"), "reset add remove", this.toggleOptions)
        },
        onRender: function () {
            this.collectionRegion.show(new s({
                collection: this.model.get("sub_entry"),
                layout: this
            })), this.toggleOptions()
        },
        addOption: function () {
            var e = this, n = e.model.get("sub_entry");
            o.initialize({multiChoose: !0, type: "tag"}).setChooseItemCallback(function (e) {
                var i = !1;
                if (t.each(e, function (e) {
                        n.length < 8 ? n.add({
                            type: e.data_type,
                            id: e.data_id,
                            title: e.title,
                            url: e.data_url
                        }) : i = !0
                    }), i) {
                    var s = setTimeout(a.clearNotify, 3e3);
                    a.errorNotify("商品分组不能多于8个，已经自动删除多余的分组。", function () {
                        clearTimeout(s)
                    })
                }
            }).modal("show")
        },
        toggleOptions: function () {
            this.model.get("sub_entry").length >= 8 ? this.$(".options").hide() : this.$(".options").show()
        }
    })
}),define("text!components/showcase/2.0.0/title/templates/edit.html", [], function () {
    return '<form class="form-horizontal" novalidate>\n    <div class="control-group">\n        <label class="control-label"><em class="required">*</em>标题名：</label>\n        <div class="controls">\n            <input type="text" name="title" value="<%- title %>" maxlength="100">\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label">标题模板：</label>\n        <div class="controls">\n            <label class="radio inline">\n                <input type="radio" name="title_template" value="0" <%= title_template == 0 ? "checked": "" %> >传统样式\n            </label>\n            <label class="radio inline">\n                <input type="radio" name="title_template" value="1" <%= title_template == 1 ? "checked": "" %>>模仿微信图文页样式\n            </label>\n        </div>\n    </div>\n    <% if(title_template == \'0\'){%>\n\n    <div class="control-group">\n        <label class="control-label">副标题：</label>\n        <div class="controls">\n            <input type="hidden" class="js-time-holder">\n            <input type="text" name="sub_title" value="<%- sub_title %>" maxlength="100">\n            <a href="javascript: void(0);" class="js-time">日期</a>\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label">显示：</label>\n        <div class="controls">\n            <% if (show_method == \'0\') { %>\n                <label class="radio inline">\n                    <input type="radio" name="show_method" value="0" checked>居左显示\n                </label>\n                <label class="radio inline">\n                    <input type="radio" name="show_method" value="1">居中显示\n                </label>\n                <label class="radio inline">\n                    <input type="radio" name="show_method" value="2">居右显示\n                </label>\n            <% } else if (show_method == \'1\') { %>\n                <label class="radio inline">\n                    <input type="radio" name="show_method" value="0">居左显示\n                </label>\n                <label class="radio inline">\n                    <input type="radio" name="show_method" value="1" checked>居中显示\n                </label>\n                <label class="radio inline">\n                    <input type="radio" name="show_method" value="2">居右显示\n                </label>\n            <% } else if (show_method == \'2\') { %>\n                <label class="radio inline">\n                    <input type="radio" name="show_method" value="0">居左显示\n                </label>\n                <label class="radio inline">\n                    <input type="radio" name="show_method" value="1">居中显示\n                </label>\n                <label class="radio inline">\n                    <input type="radio" name="show_method" value="2" checked>居右显示\n                </label>\n            <% } %>\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label">背景颜色：</label>\n        <div class="controls">\n            <input type="color" value="<%= color %>" name="color">\n            <button class="btn js-reset-bg" type="button">重置</button>\n        </div>\n    </div>\n    <div class="control-group js-collection-region">\n        <ul class="choices">\n\n        </ul>\n    </div>\n    <div class="control-group options">\n        <a href="javascript:void(0);" class="add-option js-add-option"><i class="icon-add"></i> 添加一个文本导航</a>\n    </div>\n\n    <% } else { %>\n        <div class="control-group">\n            <label class="control-label">日期：</label>\n            <div class="controls">\n                <input type="text" name="wx_title_date" value="<%- wx_title_date %>" maxlength="100" class="js-wx-time-holder span2">\n            </div>\n        </div>\n        <div class="control-group">\n            <label class="control-label">作者：</label>\n            <div class="controls">\n                <input type="text" name="wx_title_author" value="<%- wx_title_author %>" maxlength="100" class="span2">\n            </div>\n        </div>\n        <div class="control-group">\n            <label class="control-label">链接标题：</label>\n            <div class="controls">\n                <input type="text" name="wx_title_link" value="<%- wx_title_link %>" maxlength="100" class="span2">\n            </div>\n        </div>\n        <div class="control-group">\n            <label class="control-label">链接地址：</label>\n            <div class="controls">\n                <label class="radio">\n                    <input type="radio" name="wx_title_link_type" value="0" <%= wx_title_link_type == 0 ? "checked": "" %> >引导关注\n                    <a href="/v2/setting/weixin" target="_blank" style="margin-left:20px">设置快速关注链接</a>\n                </label>\n            </div>\n        </div>\n        <div class="control-group">\n            <div class="controls">\n                <label class="radio wx-template-radio">\n                    <input type="radio" name="wx_title_link_type" value="1" <%= wx_title_link_type == 1 ? "checked": "" %>>其它链接\n                    <input type="hidden" name="wx_link_url">\n                        <% if (wx_link.link_type != undefined) { %>\n                            <div class="control-action clearfix">\n                                <div class="pull-left js-link-to link-to">\n                                    <% if (wx_link.link_title !== \'\') { %>\n                                    <a href="<%= wx_link.link_url %>" target="_blank" class="new-window link-to-title">\n                                    <% } %>\n\n                                    <span class="label label-success">\n                                        <% if (wx_link.link_type === \'feature\') { %>\n                                            微页面\n                                        <% } else if (wx_link.link_type === \'category\') { %>\n                                            微页面分类\n                                        <% } else if (wx_link.link_type === \'topic\') { %>\n                                            专题\n                                        <% } else if (wx_link.link_type === \'article\') { %>\n                                            资讯\n                                        <% } else if (wx_link.link_type === \'goods\') { %>\n                                            商品\n                                        <% } else if (wx_link.link_type === \'tag\') { %>\n                                            商品标签\n                                        <% } else if (wx_link.link_type === \'activity\') { %>\n                                            营销活动\n                                        <% } else if (wx_link.link_type === \'survey\') { %>\n                                            调查\n                                        <% } else if (wx_link.link_type === \'homepage\') { %>\n                                            店铺主页\n                                        <% } else if (wx_link.link_type === \'usercenter\') { %>\n                                            会员主页\n                                        <% } else if (wx_link.link_type === \'link\') { %>\n                                            外链\n                                        <% } else if (wx_link.link_type === \'history\') { %>\n                                            历史信息\n                                        <% } %>\n                                    <% if (wx_link.link_title !== \'\') { %>\n                                            <em class="link-to-title-text"><%- wx_link.link_title %></em>\n                                        </span>\n                                    </a>\n                                    <% } else { %>\n                                        </span>\n                                    <% } %>\n                                    <a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除">×</a>\n                                </div>\n                                <div class="dropdown hover pull-left">\n                                    <a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>\n                                    <%= dropdown_menu() %>\n                                </div>\n                            </div>\n\n                        <% } else { %>\n                            <div class="dropdown hover">\n                                <a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:void(0);">设置链接到的页面地址 <i class="caret"></i></a>\n                                <%= dropdown_menu() %>\n                            </div>\n                        <% } %>\n                </label>\n            </div>\n        </div>\n\n    <% } %>\n</form>\n'
}),define("text!components/showcase/2.0.0/title/templates/edit_item.html", [], function () {
    return '<div class="control-group">\n    <label class="control-label"><em class="required">*</em>名称：</label>\n    <div class="controls">\n        <input type="text" name="title[<%= cid %>]" value="<%- title %>">\n    </div>\n</div>\n<div class="control-group">\n    <label class="control-label"><em class="required">*</em>链接：</label>\n    <div class="controls" name="link_url">\n        <% if (link_type != \'\') { %>\n            <div class="control-action clearfix">\n                <div class="pull-left js-link-to link-to">\n                    <% if (link_title !== \'\') { %>\n                        <a href="<%= link_url %>" target="_blank" class="new-window link-to-title">\n                    <% } %>\n                    <span class="label label-success">\n                        <% if (link_type === \'feature\') { %>\n                            微页面\n                        <% } else if (link_type === \'category\') { %>\n                            微页面分类\n                        <% } else if (link_type === \'topic\') { %>\n                            专题\n                        <% } else if (link_type === \'article\') { %>\n                            资讯\n                        <% } else if (link_type === \'goods\') { %>\n                            商品\n                        <% } else if (link_type === \'tag\') { %>\n                            商品标签\n                        <% } else if (link_type === \'activity\') { %>\n                            营销活动\n                        <% } else if (link_type === \'survey\') { %>\n                            调查\n                        <% } else if (link_type === \'homepage\') { %>\n                            店铺主页\n                        <% } else if (link_type === \'usercenter\') { %>\n                            会员主页\n                        <% } else if (link_type === \'link\') { %>\n                            外链\n                        <% } else if (link_type === \'history\') { %>\n                            历史信息\n                        <% } %>\n                    <% if (link_title !== \'\') { %>\n                            <em class="link-to-title-text"><%- link_title %></em>\n                        </span>\n                    </a>\n                    <% } else { %>\n                        </span>\n                    <% } %>\n                </div>\n                <div class="dropdown hover pull-right">\n                    <a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>\n                    <%= dropdown_menu() %>\n                </div>\n            </div>\n\n        <% } else { %>\n            <div class="dropdown hover">\n                <a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:void(0);">设置链接到的页面地址 <i class="caret"></i></a>\n                <%= dropdown_menu() %>\n            </div>\n        <% } %>\n    </div>\n</div>\n<div class="actions">\n    <span class="action delete close-modal" title="删除">×</span>\n</div>\n'
}),define("components/showcase/2.0.0/title/views/edit_item", ["require", "underscore", "jquery", "components/showcase/2.0.0/base/views/edit_base", "text!components/showcase/2.0.0/title/templates/edit_item.html", "text!components/public_template/dropdown_menu.html", "components/pop/atom/link", "components/modal/1.0.0/modal", "core/utils"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("components/showcase/2.0.0/base/views/edit_base"), s = e("text!components/showcase/2.0.0/title/templates/edit_item.html"), o = e("text!components/public_template/dropdown_menu.html"), a = e("components/pop/atom/link"), l = e("components/modal/1.0.0/modal"), c = e("core/utils");
    return i.extend({
        tagName: "li",
        className: "choice",
        template: t.template(s),
        dropdownTpl: t.template(o),
        events: {
            'blur input[type="text"]': "updateModel",
            "click .actions .delete": "delete",
            "click .js-modal-magazine, .js-modal-goods, .js-modal-activity, .js-modal-survey": "chooseLink",
            "click .js-modal-history, .js-modal-homepage, .js-modal-usercenter": "chooseStaticLink",
            "click .js-modal-links": "chooseOtherLink"
        },
        onInit: function () {
            this.listenTo(this.model, "change", this.render)
        },
        serializeData: function () {
            var e = this.model.cid, n = t.clone(this.model.attributes);
            return t.extend(n, {cid: e, dropdown_menu: this.dropdownTpl}), n
        },
        chooseLink: function (e) {
            var t = this, i = n(e.target).data("type");
            l.initialize({type: i}).setChooseItemCallback(function (e) {
                t.model.set({link_id: e.data_id, link_type: e.type, link_title: e.data_title, link_url: e.data_url})
            }).modal("show")
        },
        chooseStaticLink: function (e) {
            var t = n(e.target).data("type"), i = this;
            c.getStaticUrl(t, function (e) {
                i.model.set({link_id: "", link_type: t, link_title: "", link_url: e})
            })
        },
        chooseOtherLink: function (e) {
            var t, i = this;
            t = this.$(this.$(".js-link-to").length > 0 ? ".js-link-to" : ".js-dropdown-toggle");
            var s = e.target;
            a.initialize({
                target: t, trigger: n(s), callback: function (e) {
                    i.model.set({link_id: "", link_type: "link", link_title: e, link_url: e})
                }
            })
        },
        "delete": function () {
            this.model.destroy()
        }
    })
}),define("components/showcase/2.0.0/title/views/edit_collection", ["require", "components/showcase/2.0.0/base/views/edit_collection_base", "components/showcase/2.0.0/title/views/edit_item"], function (e) {
    var t = e("components/showcase/2.0.0/base/views/edit_collection_base"), n = e("components/showcase/2.0.0/title/views/edit_item");
    return t.extend({itemView: n})
}),define("components/showcase/2.0.0/title/views/edit", ["require", "core/utils", "underscore", "components/showcase/2.0.0/base/views/edit_base", "components/pop/atom/link", "components/modal/1.0.0/modal", "text!components/public_template/dropdown_menu.html", "text!components/showcase/2.0.0/title/templates/edit.html", "components/showcase/2.0.0/title/views/edit_collection", "datetimepicker"], function (e) {
    var t = e("core/utils"), n = e("underscore"), i = e("components/showcase/2.0.0/base/views/edit_base"), s = e("components/pop/atom/link"), o = e("components/modal/1.0.0/modal"), a = e("text!components/public_template/dropdown_menu.html"), l = e("text!components/showcase/2.0.0/title/templates/edit.html"), c = e("components/showcase/2.0.0/title/views/edit_collection");
    return e("datetimepicker"), i.extend({
        template: n.template(l),
        templateHelpers: function () {
            return {dropdown_menu: n.template(a)}
        },
        events: {
            'blur input[type="text"]': "updateModel",
            'click input[type="radio"]': "updateModel",
            'change input[type="color"]': "updateModel",
            "click .js-add-option": "addOption",
            "click .js-time": function () {
                this.timepicker.datepicker("show")
            },
            "click .js-reset-bg": "resetBg",
            "click .js-modal-magazine, .js-modal-goods, .js-modal-activity, .js-modal-survey": "chooseLink",
            "click .js-modal-history, .js-modal-homepage, .js-modal-usercenter": "chooseStaticLink",
            "click .js-modal-links": "chooseOtherLink",
            "click .js-delete-link": "deleteLink"
        },
        regions: {collectionRegion: ".js-collection-region"},
        onInit: function () {
            this.listenTo(this.model.get("sub_entry"), "reset remove add", this.toggleOptions), this.listenTo(this.model, "change:title_template", this.render), this.listenTo(this.model, "change:wx_link", this.render)
        },
        onRender: function () {
            var e = new Date, t = this;
            this.timepicker = this.$(".js-time-holder"), this.timepicker.datetimepicker({
                dateFormat: "yy-mm-dd",
                minDate: e,
                changeMonth: !0,
                changeYear: !0,
                yearRange: "1900:+20",
                onClose: function (e) {
                    "" !== e && (t.model.set("sub_title", e), t.$('input[name="sub_title"]').val(e))
                }
            }), this.wxTimepicker = this.$(".js-wx-time-holder"), this.wxTimepicker.datepicker({
                dateFormat: "yy-mm-dd",
                changeMonth: !0,
                changeYear: !0,
                yearRange: "1900:+20",
                dateonly: !0,
                onClose: function (e) {
                    "" !== e && t.model.set("wx_title_date", e)
                }
            }), this.collectionRegion.show(new c({
                collection: this.model.get("sub_entry"),
                layout: this
            })), this.toggleOptions()
        },
        resetBg: function () {
            this.model.set("color", "#F9F9F9"), this.$('input[type="color"]').val("#F9F9F9")
        },
        addOption: function () {
            this.model.get("sub_entry").add({
                type: "title_nav_selection",
                title: "",
                link_id: "",
                link_type: "",
                link_title: "",
                link_url: ""
            })
        },
        toggleOptions: function () {
            this.model.get("sub_entry").length > 0 ? this.$(".options").hide() : this.$(".options").show()
        },
        chooseLink: function (e) {
            if (!($(e.target).parents(".js-collection-region").length > 0)) {
                var t = this, n = $(e.target).data("type");
                o.initialize({type: n}).setChooseItemCallback(function (e) {
                    t.setLink({link_id: e.data_id, link_type: e.type, link_title: e.data_title, link_url: e.data_url})
                }).modal("show")
            }
        },
        chooseStaticLink: function (e) {
            if (!($(e.target).parents(".js-collection-region").length > 0)) {
                var n = $(e.target).data("type"), i = this;
                t.getStaticUrl(n, function (e) {
                    i.setLink({link_id: "", link_type: n, link_title: "", link_url: e})
                })
            }
        },
        chooseOtherLink: function (e) {
            if (!($(e.target).parents(".js-collection-region").length > 0)) {
                var t, n = this;
                t = this.$(this.$(".js-link-to").length > 0 ? ".js-link-to" : ".js-dropdown-toggle");
                var i = e.target;
                s.initialize({
                    target: t, trigger: $(i), callback: function (e) {
                        n.setLink({link_id: "", link_type: "link", link_title: e, link_url: e})
                    }
                })
            }
        },
        deleteLink: function () {
            this.setLink({})
        },
        setLink: function (e) {
            this.model.set({wx_link: e}), this.model.set("wx_link_url", e.link_url || "")
        }
    })
}),define("text!components/showcase/2.0.0/component/templates/edit.html", [], function () {
    return '<form class="form-horizontal" novalidate>\n    <div class="control-group control-group-large">\n        <label class="control-label">自定义页面模块：</label>\n        <div class="controls" name="_id">\n            <div class="control-action">\n                <% if (_id !== \'\') { %>\n                    <div class="pull-left link-to">\n                        <a href="<%= link %>" target="_blank" class="new-window link-to-title">\n                            <span class="label label-success">\n                                自定义页面模块\n                                <em class="link-to-title-text"><%- title %></em>\n                            </span>\n                        </a>\n                    </div>\n                    <a href="javascript:void(0);" class="js-add-component add-component">修改</a>\n                <% } else { %>\n                    <a href="javascript:void(0);" class="js-add-component add-component">+添加</a>\n                <% } %>\n            </div>\n        </div>\n    </div>\n</form>\n'
}),define("components/showcase/2.0.0/component/views/edit", ["require", "underscore", "components/showcase/2.0.0/base/views/edit_base", "text!components/showcase/2.0.0/component/templates/edit.html", "components/modal/1.0.0/modal"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/edit_base"), i = e("text!components/showcase/2.0.0/component/templates/edit.html"), s = e("components/modal/1.0.0/modal");
    return n.extend({
        template: t.template(i),
        events: {"click .js-add-component": "handleAddComponent"},
        handleAddComponent: function () {
            var e = this;
            this.componentModal = s.initialize({type: "component"}).setChooseItemCallback(function (t) {
                e.model.set({type: "component", _id: t.data_id, title: t.title, link: t.data_url}), e.render()
            }), this.componentModal.modal("show")
        }
    })
}),define("text!components/showcase/2.0.0/search/templates/edit.html", [], function () {
    return '<div class="app-component-desc">\n   <p>可随意插入任何页面和位置，方便粉丝快速搜索商品.</p>\n   <p>注意：记得给商品添加合适的商品标签吧。</p>\n</div>\n'
}),define("components/showcase/2.0.0/search/views/edit", ["require", "underscore", "components/showcase/2.0.0/base/views/edit_base", "text!components/showcase/2.0.0/search/templates/edit.html"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/edit_base"), i = e("text!components/showcase/2.0.0/search/templates/edit.html");
    return n.extend({template: t.template(i)})
}),define("text!components/showcase/2.0.0/line/templates/edit.html", [], function () {
    return '<div class="app-component-desc">\n    <p>辅助线</p>\n</div>\n'
}),define("components/showcase/2.0.0/line/views/edit", ["require", "underscore", "components/showcase/2.0.0/base/views/edit_base", "text!components/showcase/2.0.0/line/templates/edit.html"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/edit_base"), i = e("text!components/showcase/2.0.0/line/templates/edit.html");
    return n.extend({template: t.template(i)})
}),define("text!components/showcase/2.0.0/cube2/templates/edit_item.html", [], function () {
    return '\n<div class="control-group">\n    <label class="control-label"><em class="required">*</em>选择图片：</label>\n    <div class="controls" name="image_url">\n        <% if (image_url === \'\') { %>\n            <a class="control-action js-trigger-image" href="javascript: void(0);">选择图片</a>\n        <% } else { %>\n            <img src="<%= image_url %>" data-full-size="<%= image_url %>" width="100" height="100" class="thumb-image">\n            <a class="control-action js-trigger-image" href="javascript: void(0);">修改</a>\n        <% } %>\n        <p class="help-desc">建议尺寸：<%- 160 * width %> x <%- 160 * height %> 像素</p>\n    </div>\n</div>\n<div class="control-group">\n    <label class="control-label">链接到：</label>\n    <div class="controls">\n        <% if (link_type != \'\') { %>\n            <div class="control-action clearfix">\n                <div class="pull-left js-link-to link-to">\n                    <% if (link_title !== \'\') { %>\n                    <a href="<%= link_url %>" target="_blank" class="new-window link-to-title">\n                    <% } %>\n\n                    <span class="label label-success">\n                        <% if (link_type === \'feature\') { %>\n                            微页面\n                        <% } else if (link_type === \'category\') { %>\n                            微页面分类\n                        <% } else if (link_type === \'topic\') { %>\n                            专题\n                        <% } else if (link_type === \'article\') { %>\n                            资讯\n                        <% } else if (link_type === \'goods\') { %>\n                            商品\n                        <% } else if (link_type === \'tag\') { %>\n                            商品标签\n                        <% } else if (link_type === \'activity\') { %>\n                            营销活动\n                        <% } else if (link_type === \'survey\') { %>\n                            调查\n                        <% } else if (link_type === \'homepage\') { %>\n                            店铺主页\n                        <% } else if (link_type === \'usercenter\') { %>\n                            会员主页\n                        <% } else if (link_type === \'link\') { %>\n                            外链\n                        <% } else if (link_type === \'history\') { %>\n                            历史信息\n                        <% } %>\n                    <% if (link_title !== \'\') { %>\n                            <em class="link-to-title-text"><%- link_title %></em>\n                        </span>\n                    </a>\n                    <% } else { %>\n                        </span>\n                    <% } %>\n                    <a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除">×</a>\n                </div>\n                <div class="dropdown hover pull-right">\n                    <a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>\n                    <%= dropdown_menu() %>\n                </div>\n            </div>\n\n        <% } else { %>\n            <div class="dropdown hover">\n                <a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:void(0);">设置链接到的页面地址 <i class="caret"></i></a>\n                <%= dropdown_menu() %>\n            </div>\n        <% } %>\n    </div>\n</div>\n<div class="control-group">\n    <label class="control-label">图片占：</label>\n    <div class="controls">\n        <div class="btn-group">\n            <a class="btn dropdown-toggle" data-toggle="dropdown" href="javascript:;">\n                <%- height %>行 <%- width %>列\n                <span class="caret"></span>\n            </a>\n            <ul class="dropdown-menu">\n                <% for(var i = 0; i < layout.length; i++) { %>\n                    <% var cols = layout[i].cols, rows = layout[i].rows; %>\n                    <li><a class="js-image-layout" href="javascript:;" data-width="<%- cols %>" data-height="<%- rows %>"><%- rows %>行 <%- cols %>列</a></li>\n                <% } %>\n            </ul>\n        </div>\n    </div>\n</div>\n<div class="actions">\n    <span class="action delete close-modal" title="删除">×</span>\n</div>\n'
}),define("components/showcase/2.0.0/cube2/views/edit_item", ["require", "underscore", "jquery", "components/showcase/2.0.0/base/views/edit_base", "text!components/showcase/2.0.0/cube2/templates/edit_item.html", "text!components/public_template/dropdown_menu.html", "components/pop/atom/link", "components/modal/1.0.0/modal", "components/image/2.0.0/app", "core/utils"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("components/showcase/2.0.0/base/views/edit_base"), s = e("text!components/showcase/2.0.0/cube2/templates/edit_item.html"), o = e("text!components/public_template/dropdown_menu.html"), a = e("components/pop/atom/link"), l = e("components/modal/1.0.0/modal"), c = e("components/image/2.0.0/app"), r = e("core/utils");
    return i.extend({
        tagName: "li",
        className: "choice",
        template: t.template(s),
        dropdownTpl: t.template(o),
        events: {
            'blur input[type="text"]': "updateModel",
            "click .actions .delete": "delete",
            "click .actions .add": "add",
            "click .js-trigger-image": "chooseImage",
            "click .js-modal-magazine, .js-modal-goods, .js-modal-activity, .js-modal-survey": "chooseLink",
            "click .js-modal-history, .js-modal-homepage, .js-modal-usercenter": "chooseStaticLink",
            "click .js-modal-links": "chooseOtherLink",
            "click .js-delete-link": "deleteLink",
            "click .js-image-layout": "updateLayout"
        },
        onInit: function (e) {
            this.parent = e.parent || {}, this.listenTo(this.model, "change:image_url", this.render), this.listenTo(this.model, "change:link_url", this.render)
        },
        render: function () {
            var e = this.model.cid, n = t.clone(this.model.attributes);
            t.extend(n, {
                cid: e,
                dropdown_menu: this.dropdownTpl,
                layout: this.model.layout(this.parent.model.layoutMap)
            });
            var i = this.model.get("image_url");
            return i = i && r.fullfillImage(i), n.image_url = i, n.image_thumb_url = i, this.$el.html(this.template(n)), this
        },
        chooseImage: function () {
            var e = this;
            c.initialize({
                multiChoose: !1, callback: function (t) {
                    t = t[0], e.model.set({
                        image_id: t.attachment_id,
                        image_url: t.attachment_url,
                        image_thumb_url: t.thumb_url,
                        image_width: Number(t.width),
                        image_height: Number(t.height)
                    }), e.parent.render()
                }
            })
        },
        chooseLink: function (e) {
            var t = this, i = n(e.target).data("type");
            l.initialize({type: i}).setChooseItemCallback(function (e) {
                t.model.set({
                    link_id: e.data_id,
                    link_type: e.type,
                    link_title: e.data_title,
                    link_url: e.data_url
                }), t.parent.render()
            }).modal("show")
        },
        chooseStaticLink: function (e) {
            var t = n(e.target).data("type"), i = this;
            r.getStaticUrl(t, function (e) {
                i.model.set({link_id: "", link_type: t, link_title: "", link_url: e}), i.parent.render()
            })
        },
        chooseOtherLink: function (e) {
            var t, i = this;
            t = this.$(this.$(".js-link-to").length > 0 ? ".js-link-to" : ".js-dropdown-toggle");
            var s = e.target;
            a.initialize({
                target: t, trigger: n(s), callback: function (e) {
                    i.model.set({link_id: "", link_type: "link", link_title: e, link_url: e}), i.parent.render()
                }
            })
        },
        updateLayout: function (e) {
            var t = n(e.target);
            this.model.set({width: +t.data("width"), height: +t.data("height")}), this.parent.render()
        },
        deleteLink: function () {
            this.model.set({link_id: "", link_type: "", link_title: "", link_url: ""}), this.parent.render()
        },
        "delete": function () {
            this.model.destroy()
        },
        add: function () {
            if (this.model.collection.length >= 20)return void r.errorNotify("选项最多20个。");
            var e = t.clone(this.model.constructor.prototype.defaults), n = this.model.index();
            this.model.collection.add(e, {at: n + 1, element: this.$el})
        }
    })
}),define("text!components/showcase/2.0.0/cube2/templates/layout_modal.html", [], function () {
    return '<div class="modal-header">\n    <a class="close" data-dismiss="modal">×</a>\n    <ul class="module-nav modal-tab">\n        <li class="active hide">\n            <h4>选择布局</h4>\n        </li>\n    </ul>\n</div>\n<div class="modal-body clearfix layout-table">\n    <%\n        var result = [];\n        for(var i = 0; i < layout.length; i++){\n            result[layout[i].cols] = layout[i].rows;\n        }\n    %>\n    <% for(var i = 1; i < result.length; i++){ %>\n    <ul class="layout-cols layout-cols-<%- i %>">\n        <% for(var j = 1; j <= result[i]; j++){ %>\n            <% var cols = i, rows = j %>\n            <li data-cols="<%- cols %>" data-rows="<%- rows %>"></li>\n        <% } %>\n        </ul>\n    <% } %>\n</div>\n\n'
}),define("components/showcase/2.0.0/cube2/views/layout_modal", ["require", "underscore", "jquery", "backbone", "text!components/showcase/2.0.0/cube2/templates/layout_modal.html"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("backbone"), s = e("text!components/showcase/2.0.0/cube2/templates/layout_modal.html"), o = i.View.extend({
        className: "modal hide fade",
        template: t.template(s),
        events: {
            "click .layout-cols li": "chooseLayout", "mouseenter .layout-cols li": function (e) {
                var t = n(e.target), i = +t.data("cols"), s = +t.data("rows"), o = this.$(".layout-table li").removeClass("selected");
                o.filter(function (e, t) {
                    return t = n(t), +t.data("cols") <= i && +t.data("rows") <= s
                }).addClass("selected")
            }, hidden: "delete"
        },
        initialize: function (e) {
            this.options = e || {}, this.render()
        },
        render: function () {
            return this.$el.html(this.template(this.model.attributes)).modal("show"), this
        },
        chooseLayout: function (e) {
            var t = n(e.target), i = +t.data("cols"), s = +t.data("rows");
            this.options.callback && this.options.callback({width: i, height: s}), this.$el.modal("hide")
        },
        "delete": function () {
            this.$el.data("modal", null), this.remove()
        }
    });
    return o
}),define("text!components/showcase/2.0.0/cube2/templates/edit.html", [], function () {
    return '<form class="form-horizontal custom-cube2-table cube2-edit" novalidate>\n    <div class="control-group layout-map">\n        <label class="control-label">布局：</label>\n        <div class="controls" name="layout_map">\n            <table>\n                <tbody>\n                    <%= tableContent %>\n                </tbody>\n            </table>\n            <p class="help-desc">点击 + 号添加内容</p>\n        </div>\n    </div>\n    <div class="control-group js-item-region">\n        <ul class="choices"></ul>\n    </div>\n</form>\n'
}),define("components/showcase/2.0.0/cube2/views/edit", ["require", "underscore", "jquery", "backbone", "components/showcase/2.0.0/base/views/edit_base", "components/showcase/2.0.0/cube2/models/item", "components/showcase/2.0.0/cube2/views/edit_item", "components/showcase/2.0.0/cube2/views/layout_modal", "text!components/showcase/2.0.0/cube2/templates/td.html", "text!components/showcase/2.0.0/cube2/templates/edit.html"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("backbone"), s = e("components/showcase/2.0.0/base/views/edit_base"), o = e("components/showcase/2.0.0/cube2/models/item"), a = e("components/showcase/2.0.0/cube2/views/edit_item"), l = e("components/showcase/2.0.0/cube2/views/layout_modal"), c = e("text!components/showcase/2.0.0/cube2/templates/td.html"), r = e("text!components/showcase/2.0.0/cube2/templates/edit.html");
    return s.extend({
        template: t.template(r),
        tdTemplate: t.template(c),
        events: {
            "click .empty": "add", "click .not-empty": "edit", "click td a": function (e) {
                e.preventDefault()
            }
        },
        regions: {itemRegion: ".js-item-region"},
        onInit: function () {
            this.currentSelection = -1, this.previousSelection = -1, this.listenTo(this.model.get("sub_entry"), "add", this.render), this.listenTo(this.model.get("sub_entry"), "remove", this["delete"]), this.listenTo(this.model.get("sub_entry"), "valid:error", function (e) {
                var t = this;
                setTimeout(function () {
                    t.$(".not-empty[data-index=" + e.index() + "]").trigger("click")
                }, 20)
            })
        },
        onBeforeRender: function () {
            this.model.denerateTableContent()
        },
        onRender: function () {
            0 === this.$(".layout-map .empty").size() && this.$(".layout-map .help-desc").hide(), this.suggestion(), this.renderSelection()
        },
        "delete": function () {
            this.currentSelection = -1, this.previousSelection = -1, this.render()
        },
        add: function (e) {
            var t = this, s = this.model.get("sub_entry"), a = n(e.target), c = +a.data("x"), r = +a.data("y"), d = function (e) {
                p.set(e), s.add(p, {silent: !0}), t.currentSelection = s.length - 1, t.render()
            }, p = o.initialize({x: c, y: r}), u = p.layout(this.model.layoutMap);
            return 1 === u.length ? void d({width: 1, height: 1}) : void new l({
                model: new i.Model({layout: u}),
                callback: d
            })
        },
        edit: function (e) {
            var t = n(e.currentTarget), i = +t.data("index");
            i !== this.currentSelection && (this.currentSelection = i, this._slideSelection())
        },
        renderSelection: function () {
            var e = this, t = this.model.get("sub_entry");
            e.$(".choices").html(""), t.each(function (t, n) {
                var i = new a({model: t, parent: e});
                i.render(), n !== e.previousSelection && i.$el.hide(), e.$(".choices").append(i.el)
            }), this._slideSelection()
        },
        _slideSelection: function () {
            if (this.$("td").removeClass("current"), this.$("td[data-index=" + this.currentSelection + "]").addClass("current"), this.previousSelection !== this.currentSelection) {
                var e = this.$(".choice");
                e.eq(this.previousSelection).slideUp(), e.eq(this.currentSelection).slideDown(), this.previousSelection = this.currentSelection
            }
        },
        suggestion: function () {
            this.$el.find(".not-empty").filter(function () {
                return !n(this).find("img").attr("src")
            }).each(function () {
                var e = n(this), t = 160 * +e.attr("colspan"), i = 160 * +e.attr("rowspan");
                e.append("<span>" + t + "x" + i + "</span>")
            })
        }
    })
}),define("text!components/showcase/2.0.0/tpl_shop/templates/edit.html", [], function () {
    return '<form class="form-horizontal" novalidate>\n    <div class="control-group">\n        <label class="control-label">背景图片：</label>\n        <div class="controls">\n            <% if (backgroundImage === \'\') { %>\n                <a class="control-action js-trigger-image" href="javascript: void(0);">选择图片</a>\n            <% } else { %>\n                <div class="tpl-shop-header" style="width: 320px; background-image: url(<%- fullfillImage(backgroundImage) %>);">\n                    <a class="close-modal small hide js-delete-image" data-index="0">×</a>\n                </div>\n                <a class="control-action js-trigger-image" href="javascript: void(0);">修改</a>\n            <% } %>\n            <p class="help-desc">最佳尺寸：640 x 200 像素。</p>\n            <p class="help-desc">尺寸不匹配时，图片将被压缩或拉伸以铺满画面。</p>\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label">背景颜色：</label>\n        <div class="controls">\n            <input type="color" value="<%- backgroundColor %>" name="backgroundColor">\n            <button class="btn js-reset-bg" type="button">重置</button>\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label">店铺Logo：</label>\n        <div class="controls">\n            <img src="<%- fullfillImage(window._global.mp_data.logo, \'!145x145.jpg\') %>" width="80" height="80" class="thumb-image" style="width: 80px; height: 80px;">\n            <a class="control-action js-trigger-avatar" href="javascript: void(0);">修改店铺Logo</a>\n        </div>\n    </div>\n</form>\n'
}),define("components/uploadlogo/models/model", ["require", "backbone", "core/utils"], function (e) {
    var t, n = e("backbone"), i = e("core/utils");
    return t = i.isFenxiao() ? window._global.url.fenxiao + "/supplier/enterprise/template/logo.json" : window._global.url.www + "/account/team/logo.json", n.Model.extend({
        defaults: {logo: ""},
        url: t,
        sync: function () {
            return i.ajax({url: this.url, type: "PUT", data: this.toJSON()})
        }
    })
}),define("components/uploadlogo/app", ["require", "underscore", "backbone", "marionette", "core/utils", "components/image/2.0.0/app", "./models/model"], function (e) {
    var t = e("underscore"), n = (e("backbone"), e("marionette")), i = e("core/utils"), s = e("components/image/2.0.0/app"), o = e("./models/model");
    return n.ItemView.extend({
        initialize: function (e) {
            this.options = e || {}, this.model = new o, s.initialize(i.isFenxiao() ? {
                multiChoose: !1,
                onlyUpload: !0,
                hideDownload: !0,
                hideIconList: !0,
                uploadURL: _global.url.fenxiao + "/common/qiniu/upToken.json",
                callback: t.bind(this.selectedImage, this)
            } : {
                multiChoose: !1,
                onlyUpload: !0,
                hideDownload: !0,
                hideIconList: !0,
                callback: t.bind(this.selectedImage, this)
            })
        }, selectedImage: function (e) {
            var t = e[0], n = this;
            this.model.set("logo", t.attachment_full_url), this.model.sync().done(function () {
                i.isFenxiao() ? window._global.template_logo = t.attachment_full_url : window._global.mp_data.logo = t.attachment_full_url, n.options.callback && n.options.callback(), n.close()
            }).fail(function () {
                i.errorNotify("上传店铺Logo失败")
            })
        }, onClose: function () {
        }
    })
}),define("components/showcase/2.0.0/tpl_shop/views/edit", ["require", "underscore", "components/showcase/2.0.0/base/views/edit_base", "text!components/showcase/2.0.0/tpl_shop/templates/edit.html", "components/image/2.0.0/app", "components/uploadlogo/app", "core/utils"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/edit_base"), i = e("text!components/showcase/2.0.0/tpl_shop/templates/edit.html"), s = e("components/image/2.0.0/app"), o = e("components/uploadlogo/app"), a = e("core/utils");
    return n.extend({
        template: t.template(i),
        events: {
            'blur input[type="text"]': "updateModel",
            'change input[type="color"]': "changeColor",
            "click .js-reset-bg": "resetBg",
            "click .js-trigger-image": "chooseImage",
            "click .js-trigger-avatar": "chooseLogo",
            "click .js-delete-image": "deleteImage"
        },
        templateHelpers: {fullfillImage: a.fullfillImage},
        resetBg: function () {
            this.$('input[type="color"]').val("#EF483F"), this._changeColor("#EF483F")
        },
        changeColor: function (e) {
            this._changeColor(e.target.value)
        },
        _changeColor: function (e) {
            this.model.set({backgroundColor: e})
        },
        chooseImage: function () {
            this._openImageModal(function (e) {
                this.model.set("backgroundImage", e)
            })
        },
        chooseLogo: function () {
            var e = this;
            new o({
                callback: function () {
                    e.render(), e.model.trigger("change")
                }
            })
        },
        _openImageModal: function (e) {
            var n = t.bind(function (t) {
                t = t[0], e.call(this, t.attachment_url), this.render()
            }, this);
            s.initialize({multiChoose: !1, callback: n})
        },
        deleteImage: function () {
            this.model.set({backgroundImage: ""})
        }
    })
}),define("text!components/showcase/2.0.0/tpl_weixin/templates/edit.html", [], function () {
    return '<form class="form-horizontal" novalidate>\n    <div class="control-group">\n        <label class="control-label"><em class="required">*</em>背景图片：</label>\n        <div class="controls">\n            <% if (background === \'\') { %>\n                <a class="control-action js-trigger-image" href="javascript: void(0);">选择图片</a>\n            <% } else { %>\n                <img src="<%= fullfillImage(background) %>" width="100" height="100" class="thumb-image">\n                <a class="control-action js-trigger-image" href="javascript: void(0);">修改</a>\n            <% } %>\n            <p class="help-block">建议尺寸：640 x 1080 像素</p>\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label">背景链接：</label>\n        <div class="controls" name="link_url">\n            <% if (bg_link_type != \'\') { %>\n                <div class="control-action clearfix">\n                    <div class="pull-left js-link-to link-to">\n                        <% if (bg_link_title !== \'\') { %>\n                            <a href="<%= bg_link_url %>" target="_blank" class="new-window link-to-title">\n                        <% } %>\n                        <span class="label label-success">\n                            <% if (bg_link_type === \'feature\') { %>\n                                微页面\n                            <% } else if (bg_link_type === \'category\') { %>\n                                微页面分类\n                            <% } else if (bg_link_type === \'topic\') { %>\n                                专题\n                            <% } else if (bg_link_type === \'article\') { %>\n                                资讯\n                            <% } else if (bg_link_type === \'goods\') { %>\n                                商品\n                            <% } else if (bg_link_type === \'tag\') { %>\n                                商品标签\n                            <% } else if (bg_link_type === \'activity\') { %>\n                                营销活动\n                            <% } else if (bg_link_type === \'survey\') { %>\n                                调查\n                            <% } else if (bg_link_type === \'homepage\') { %>\n                                店铺主页\n                            <% } else if (bg_link_type === \'usercenter\') { %>\n                                会员主页\n                            <% } else if (bg_link_type === \'link\') { %>\n                                外链\n                            <% } else if (bg_link_type === \'history\') { %>\n                                历史信息\n                            <% } %>\n                        <% if (bg_link_title !== \'\') { %>\n                                <em class="link-to-title-text"><%- bg_link_title %></em>\n                            </span>\n                        </a>\n                        <% } else { %>\n                            </span>\n                        <% } %>\n                    </div>\n                    <div class="dropdown hover pull-right">\n                        <a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>\n                        <%= dropdown_menu() %>\n                    </div>\n                </div>\n\n            <% } else { %>\n                <div class="dropdown hover">\n                    <a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:void(0);">设置链接到的页面地址 <i class="caret"></i></a>\n                    <%= dropdown_menu() %>\n                </div>\n            <% } %>\n        </div>\n    </div>\n    <div class="control-group white-space-group">\n        <label class="control-label">导航位置：</label>\n        <div class="controls controls-slider">\n            <div class="js-slider white-space-slider"></div>\n            <div class="slider-height hide"><span class="js-top"><%= top %></span> %</div>\n        </div>\n    </div>\n    <div class="control-group js-collection-region">\n\n    </div>\n    <div class="control-group options js-add-subentry">\n        <a class="add-option js-add-option" href="javascript:void(0);"><i class="icon-add"></i> 添加一个导航链接</a>\n    </div>\n</form>\n'
}),define("text!components/showcase/2.0.0/tpl_weixin/templates/edit_item.html", [], function () {
    return '<div class="control-group">\n    <label class="control-label"><em class="required">*</em>名称：</label>\n    <div class="controls">\n        <input type="text" name="title" value="<%- title %>">\n    </div>\n</div>\n<div class="control-group">\n    <label class="control-label"><em class="required">*</em>链接到：</label>\n    <div class="controls" name="link_url">\n        <% if (link_type != \'\') { %>\n            <div class="control-action clearfix">\n                <div class="pull-left js-link-to link-to">\n                    <% if (link_title !== \'\') { %>\n                        <a href="<%= link_url %>" target="_blank" class="new-window link-to-title">\n                    <% } %>\n                    <span class="label label-success">\n                        <% if (link_type === \'feature\') { %>\n                            微页面\n                        <% } else if (link_type === \'category\') { %>\n                            微页面分类\n                        <% } else if (link_type === \'topic\') { %>\n                            专题\n                        <% } else if (link_type === \'article\') { %>\n                            资讯\n                        <% } else if (link_type === \'goods\') { %>\n                            商品\n                        <% } else if (link_type === \'tag\') { %>\n                            商品标签\n                        <% } else if (link_type === \'activity\') { %>\n                            营销活动\n                        <% } else if (link_type === \'survey\') { %>\n                            调查\n                        <% } else if (link_type === \'homepage\') { %>\n                            店铺主页\n                        <% } else if (link_type === \'usercenter\') { %>\n                            会员主页\n                        <% } else if (link_type === \'link\') { %>\n                            外链\n                        <% } else if (link_type === \'history\') { %>\n                            历史信息\n                        <% } %>\n                    <% if (link_title !== \'\') { %>\n                            <em class="link-to-title-text"><%- link_title %></em>\n                        </span>\n                    </a>\n                    <% } else { %>\n                        </span>\n                    <% } %>\n                </div>\n                <div class="dropdown hover pull-right">\n                    <a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>\n                    <%= dropdown_menu() %>\n                </div>\n            </div>\n\n        <% } else { %>\n            <div class="dropdown hover">\n                <a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:void(0);">设置链接到的页面地址 <i class="caret"></i></a>\n                <%= dropdown_menu() %>\n            </div>\n        <% } %>\n    </div>\n</div>\n<div class="actions">\n    <span class="action delete close-modal" title="删除">×</span>\n</div>\n'
}),define("components/showcase/2.0.0/tpl_weixin/views/edit_item", ["require", "underscore", "jquery", "components/showcase/2.0.0/base/views/edit_base", "text!components/showcase/2.0.0/tpl_weixin/templates/edit_item.html", "text!components/public_template/dropdown_menu.html", "components/pop/atom/link", "components/modal/1.0.0/modal", "core/utils"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("components/showcase/2.0.0/base/views/edit_base"), s = e("text!components/showcase/2.0.0/tpl_weixin/templates/edit_item.html"), o = e("text!components/public_template/dropdown_menu.html"), a = e("components/pop/atom/link"), l = e("components/modal/1.0.0/modal"), c = e("core/utils");
    return i.extend({
        tagName: "li",
        className: "choice",
        template: t.template(s),
        dropdownTpl: t.template(o),
        templateHelpers: function () {
            return {
                dropdown_menu: this.dropdownTpl
            }
        },
        events: {
            'blur input[type="text"]': "updateModel",
            "click .actions .delete": "delete",
            "click .js-modal-magazine, .js-modal-goods, .js-modal-activity, .js-modal-survey": "chooseLink",
            "click .js-modal-history, .js-modal-homepage, .js-modal-usercenter": "chooseStaticLink",
            "click .js-modal-links": "chooseOtherLink"
        },
        onInit: function () {
            this.listenTo(this.model, "change", this.render)
        },
        chooseLink: function (e) {
            var t = this, i = n(e.target).data("type");
            e.stopPropagation(), l.initialize({type: i}).setChooseItemCallback(function (e) {
                t.model.set({link_id: e.data_id, link_type: e.type, link_title: e.data_title, link_url: e.data_url})
            }).modal("show")
        },
        chooseStaticLink: function (e) {
            var t = n(e.target).data("type"), i = this;
            e.stopPropagation(), c.getStaticUrl(t, function (e) {
                i.model.set({link_id: "", link_type: t, link_title: "", link_url: e})
            })
        },
        chooseOtherLink: function (e) {
            var t, i = this;
            e.stopPropagation(), t = this.$(this.$(".js-link-to").length > 0 ? ".js-link-to" : ".js-dropdown-toggle");
            var s = e.target;
            a.initialize({
                target: t, trigger: n(s), callback: function (e) {
                    i.model.set({link_id: "", link_type: "link", link_title: e, link_url: e})
                }
            })
        },
        "delete": function () {
            this.model.destroy()
        }
    })
}),define("components/showcase/2.0.0/tpl_weixin/views/edit_collection", ["require", "components/showcase/2.0.0/base/views/edit_collection_base", "components/showcase/2.0.0/tpl_weixin/views/edit_item"], function (e) {
    var t = e("components/showcase/2.0.0/base/views/edit_collection_base"), n = e("components/showcase/2.0.0/tpl_weixin/views/edit_item");
    return t.extend({
        itemView: n, onShow: function () {
            this.sortable()
        }
    })
}),define("components/showcase/2.0.0/tpl_weixin/views/edit", ["require", "underscore", "jquery", "components/showcase/2.0.0/base/views/edit_base", "text!components/showcase/2.0.0/tpl_weixin/templates/edit.html", "text!components/public_template/dropdown_menu.html", "components/pop/atom/link", "components/showcase/2.0.0/tpl_weixin/views/edit_collection", "components/image/2.0.0/app", "components/modal/1.0.0/modal", "core/utils"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("components/showcase/2.0.0/base/views/edit_base"), s = e("text!components/showcase/2.0.0/tpl_weixin/templates/edit.html"), o = e("text!components/public_template/dropdown_menu.html"), a = e("components/pop/atom/link"), l = e("components/showcase/2.0.0/tpl_weixin/views/edit_collection"), c = e("components/image/2.0.0/app"), r = e("components/modal/1.0.0/modal"), d = e("core/utils");
    return i.extend({
        template: t.template(s),
        dropdownTpl: t.template(o),
        templateHelpers: function () {
            return {fullfillImage: d.fullfillImage, dropdown_menu: this.dropdownTpl}
        },
        events: {
            'blur input[type="text"]': "updateModel",
            'click input[type="radio"]': "updateModel",
            'change input[type="color"]': "updateModel",
            "click .js-trigger-image": "chooseImage",
            "click .js-trigger-delete": "deleteImage",
            "click .js-add-option": "addOption",
            "click .js-reset-bg": "resetBg",
            "click .js-modal-magazine, .js-modal-goods, .js-modal-activity, .js-modal-survey": "chooseLink",
            "click .js-modal-history, .js-modal-homepage, .js-modal-usercenter": "chooseStaticLink",
            "click .js-modal-links": "chooseOtherLink"
        },
        modelEvents: {"change:bg_link_url": "render"},
        regions: {collectionRegion: ".js-collection-region"},
        onInit: function () {
            this.listenTo(this.model.get("sub_entry"), "reset add remove", this.toggleOptions), this.listenTo(this.model, "change:background", this.render)
        },
        onRender: function () {
            this.collectionRegion.show(new l({
                collection: this.model.get("sub_entry"),
                layout: this
            })), this.renderSilder(), this.toggleOptions()
        },
        renderSilder: function () {
            var e = this, n = e.$(".js-top");
            this.$(".js-slider").slider({
                min: 0, max: 100, value: e.model.get("top"), slide: function (i, s) {
                    var o = s.value;
                    t.isNumber(o) && e.model.set("top", o), n.text(o)
                }
            })
        },
        chooseImage: function () {
            var e = this;
            c.initialize({
                multiChoose: !1, callback: function (t) {
                    t = t[0], e.model.set({
                        background: t.attachment_url,
                        width: Number(t.width),
                        height: Number(t.height)
                    })
                }
            })
        },
        deleteImage: function () {
            this.model.set({background: "", width: "", height: ""})
        },
        resetBg: function () {
            this.model.set("color", "#ffffff"), this.$('input[type="color"]').val("#ffffff")
        },
        addOption: function () {
            this.model.get("sub_entry").add({
                type: "title_nav_selection",
                title: "",
                link_id: "",
                link_type: "",
                link_title: "",
                link_url: ""
            })
        },
        toggleOptions: function () {
            this.model.get("sub_entry").length >= 4 ? this.$(".options").hide() : this.$(".options").show()
        },
        chooseLink: function (e) {
            var t = this, i = n(e.target).data("type");
            r.initialize({type: i}).setChooseItemCallback(function (e) {
                t.model.set({
                    bg_link_id: e.data_id,
                    bg_link_type: e.type,
                    bg_link_title: e.data_title,
                    bg_link_url: e.data_url
                })
            }).modal("show")
        },
        chooseStaticLink: function (e) {
            var t = n(e.target).data("type"), i = this;
            d.getStaticUrl(t, function (e) {
                i.model.set({bg_link_id: "", bg_link_type: t, bg_link_title: "", bg_link_url: e})
            })
        },
        chooseOtherLink: function (e) {
            var t, i = this;
            t = this.$(this.$(".js-link-to").length > 0 ? ".js-link-to" : ".js-dropdown-toggle");
            var s = e.target;
            a.initialize({
                target: t, trigger: n(s), callback: function (e) {
                    i.model.set({bg_link_id: "", bg_link_type: "link", bg_link_title: e, bg_link_url: e})
                }
            })
        }
    })
}),define("text!components/showcase/2.0.0/tpl_fbb/templates/edit.html", [], function () {
    return '<form class="form-horizontal" novalidate>\n    <div class="control-group">\n        <label class="control-label"><em class="required">*</em>背景图片：</label>\n        <div class="controls">\n            <% if (background === \'\') { %>\n                <a class="control-action js-trigger-image" href="javascript: void(0);">选择图片</a>\n            <% } else { %>\n                <img src="<%= fullfillImage(background) %>" width="100" height="100" class="thumb-image">\n                <a class="control-action js-trigger-image" href="javascript: void(0);">修改</a>\n            <% } %>\n            <p class="help-desc">建议尺寸：640 x 1080 像素</p>\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label">背景链接：</label>\n        <div class="controls" name="link_url">\n            <% if (bg_link_type != \'\') { %>\n                <div class="control-action clearfix">\n                    <div class="pull-left js-link-to link-to">\n                        <% if (bg_link_title !== \'\') { %>\n                            <a href="<%= bg_link_url %>" target="_blank" class="new-window link-to-title">\n                        <% } %>\n                        <span class="label label-success">\n                            <% if (bg_link_type === \'feature\') { %>\n                                微页面\n                            <% } else if (bg_link_type === \'category\') { %>\n                                微页面分类\n                            <% } else if (bg_link_type === \'topic\') { %>\n                                专题\n                            <% } else if (bg_link_type === \'article\') { %>\n                                资讯\n                            <% } else if (bg_link_type === \'goods\') { %>\n                                商品\n                            <% } else if (bg_link_type === \'tag\') { %>\n                                商品标签\n                            <% } else if (bg_link_type === \'activity\') { %>\n                                营销活动\n                            <% } else if (bg_link_type === \'survey\') { %>\n                                调查\n                            <% } else if (bg_link_type === \'homepage\') { %>\n                                店铺主页\n                            <% } else if (bg_link_type === \'usercenter\') { %>\n                                会员主页\n                            <% } else if (bg_link_type === \'link\') { %>\n                                外链\n                            <% } else if (bg_link_type === \'history\') { %>\n                                历史信息\n                            <% } %>\n                        <% if (bg_link_title !== \'\') { %>\n                                <em class="link-to-title-text"><%- bg_link_title %></em>\n                            </span>\n                        </a>\n                        <% } else { %>\n                            </span>\n                        <% } %>\n                    </div>\n                    <div class="dropdown hover pull-right">\n                        <a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>\n                        <%= dropdown_menu() %>\n                    </div>\n                </div>\n\n            <% } else { %>\n                <div class="dropdown hover">\n                    <a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:void(0);">设置链接到的页面地址 <i class="caret"></i></a>\n                    <%= dropdown_menu() %>\n                </div>\n            <% } %>\n        </div>\n    </div>\n    <div class="separate-line-wrap">\n        <hr>\n        <div class="separate-line">\n            <p class="text-center">导航链接</p>\n            <p class="text-center">v</p>\n        </div>\n    </div>\n    <div class="control-group js-collection-region">\n\n    </div>\n    <div class="control-group options">\n        <a class="add-option js-add-option" href="javascript:;"><i class="icon-add"></i> 添加一个导航链接</a>\n    </div>\n</form>\n'
}),define("text!components/showcase/2.0.0/tpl_fbb/templates/edit_item.html", [], function () {
    return '<div class="control-group">\n    <label class="control-label"><em class="required">*</em>小标题：</label>\n    <div class="controls">\n        <input type="text" name="title" value="<%- title %>">\n    </div>\n</div>\n<div class="control-group">\n    <label class="control-label"><em class="required">*</em>链接到：</label>\n    <div class="controls" name="link_url">\n        <% if (link_type != \'\') { %>\n            <div class="control-action clearfix">\n                <div class="pull-left js-link-to link-to">\n                    <% if (link_title !== \'\') { %>\n                        <a href="<%= link_url %>" target="_blank" class="new-window link-to-title">\n                    <% } %>\n                    <span class="label label-success">\n                        <% if (link_type === \'feature\') { %>\n                            微页面\n                        <% } else if (link_type === \'category\') { %>\n                            微页面分类\n                        <% } else if (link_type === \'topic\') { %>\n                            专题\n                        <% } else if (link_type === \'article\') { %>\n                            资讯\n                        <% } else if (link_type === \'goods\') { %>\n                            商品\n                        <% } else if (link_type === \'tag\') { %>\n                            商品标签\n                        <% } else if (link_type === \'activity\') { %>\n                            营销活动\n                        <% } else if (link_type === \'survey\') { %>\n                            调查\n                        <% } else if (link_type === \'homepage\') { %>\n                            店铺主页\n                        <% } else if (link_type === \'usercenter\') { %>\n                            会员主页\n                        <% } else if (link_type === \'link\') { %>\n                            外链\n                        <% } else if (link_type === \'history\') { %>\n                            历史信息\n                        <% } %>\n                    <% if (link_title !== \'\') { %>\n                            <em class="link-to-title-text"><%- link_title %></em>\n                        </span>\n                    </a>\n                    <% } else { %>\n                        </span>\n                    <% } %>\n                </div>\n                <div class="dropdown hover pull-right">\n                    <a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>\n                    <%= dropdown_menu() %>\n                </div>\n            </div>\n\n        <% } else { %>\n            <div class="dropdown hover">\n                <a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:void(0);">设置链接到的页面地址 <i class="caret"></i></a>\n                <%= dropdown_menu() %>\n            </div>\n        <% } %>\n    </div>\n</div>\n<div class="control-group">\n    <label class="control-label">小图标：</label>\n    <div class="controls">\n        <% if (icon_image_url === \'\') { %>\n            <a class="control-action js-icon-image" href="javascript: void(0);">选择图片</a>\n        <% } else { %>\n            <img src="<%= fullfillImage(icon_image_url) %>" width="30" height="30" class="thumb-image">\n            <a class="control-action js-icon-image" href="javascript: void(0);">修改</a>\n            <span>|</span>\n            <a href="javascript:;" class="control-action js-trigger-delete-icon">删除</a>\n        <% } %>\n        <p class="help-desc">建议尺寸：60 x 60 像素</p>\n    </div>\n</div>\n<div class="control-group">\n    <label class="control-label">简介：</label>\n    <div class="controls">\n        <input type="text" name="text" value="<%- text %>">\n    </div>\n</div>\n<div class="control-group">\n    <label class="control-label">背景图：</label>\n    <div class="controls">\n        <% if (bg_image_url === \'\') { %>\n            <a class="control-action js-bg-image" href="javascript: void(0);">选择图片</a>\n        <% } else { %>\n            <img src="<%= fullfillImage(bg_image_url) %>" width="100" height="100" class="thumb-image">\n            <a class="control-action js-bg-image" href="javascript: void(0);">修改</a>\n            <span>|</span>\n            <a href="javascript:;" class="control-action js-trigger-delete-bg">删除</a>\n        <% } %>\n        <p class="help-desc">建议尺寸：85 x 188 像素</p>\n    </div>\n</div>\n<div class="control-group">\n    <label class="control-label">日期：</label>\n    <div class="controls">\n        <input type="text" name="date" value="<%- date %>">\n    </div>\n</div>\n<div class="actions">\n    <span class="action delete close-modal" title="删除">×</span>\n</div>\n'
}),define("components/showcase/2.0.0/tpl_fbb/views/edit_item", ["require", "underscore", "jquery", "components/showcase/2.0.0/base/views/edit_base", "text!components/showcase/2.0.0/tpl_fbb/templates/edit_item.html", "text!components/public_template/dropdown_menu.html", "components/pop/atom/link", "components/modal/1.0.0/modal", "components/image/2.0.0/app", "core/utils"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("components/showcase/2.0.0/base/views/edit_base"), s = e("text!components/showcase/2.0.0/tpl_fbb/templates/edit_item.html"), o = e("text!components/public_template/dropdown_menu.html"), a = e("components/pop/atom/link"), l = e("components/modal/1.0.0/modal"), c = e("components/image/2.0.0/app"), r = e("core/utils");
    return i.extend({
        tagName: "li",
        className: "choice",
        template: t.template(s),
        dropdownTpl: t.template(o),
        templateHelpers: function () {
            return {dropdown_menu: this.dropdownTpl, fullfillImage: r.fullfillImage}
        },
        events: {
            'blur input[type="text"]': "updateModel",
            "click .actions .delete": "delete",
            "click .js-modal-magazine, .js-modal-goods, .js-modal-activity, .js-modal-survey": "chooseLink",
            "click .js-modal-history, .js-modal-homepage, .js-modal-usercenter": "chooseStaticLink",
            "click .js-modal-links": "chooseOtherLink",
            "click .js-bg-image": "chooseImage",
            "click .js-icon-image": "chooseIconImage",
            "click .js-trigger-delete-bg": "deleteImage",
            "click .js-trigger-delete-icon": "deleteIconImage"
        },
        onInit: function () {
            this.listenTo(this.model, "change:link_url change:bg_image_url change:icon_image_url", this.render)
        },
        chooseImage: function () {
            var e = this;
            c.initialize({
                multiChoose: !1, callback: function (t) {
                    t = t[0], e.model.set({
                        bg_image_id: t.attachment_id,
                        bg_image_url: t.attachment_url,
                        bg_image_width: Number(t.width),
                        bg_image_height: Number(t.height)
                    })
                }
            })
        },
        deleteImage: function () {
            this.model.set({bg_image_id: "", bg_image_url: "", bg_image_width: "", bg_image_height: ""})
        },
        chooseIconImage: function () {
            var e = this;
            c.initialize({
                multiChoose: !1, callback: function (t) {
                    t = t[0], e.model.set({
                        icon_image_id: t.attachment_id,
                        icon_image_url: t.attachment_url,
                        icon_image_width: Number(t.width),
                        icon_image_height: Number(t.height)
                    })
                }
            })
        },
        deleteIconImage: function () {
            this.model.set({icon_image_id: "", icon_image_url: "", icon_image_width: "", icon_image_height: ""})
        },
        chooseLink: function (e) {
            var t = this, i = n(e.target).data("type");
            e.stopPropagation(), l.initialize({type: i}).setChooseItemCallback(function (e) {
                t.model.set({link_id: e.data_id, link_type: e.type, link_title: e.data_title, link_url: e.data_url})
            }).modal("show")
        },
        chooseStaticLink: function (e) {
            var t = n(e.target).data("type"), i = this;
            e.stopPropagation(), r.getStaticUrl(t, function (e) {
                i.model.set({link_id: "", link_type: t, link_title: "", link_url: e})
            })
        },
        chooseOtherLink: function (e) {
            var t, i = this;
            e.stopPropagation(), t = this.$(this.$(".js-link-to").length > 0 ? ".js-link-to" : ".js-dropdown-toggle");
            var s = e.target;
            a.initialize({
                target: t, trigger: n(s), callback: function (e) {
                    i.model.set({link_id: "", link_type: "link", link_title: e, link_url: e})
                }
            })
        },
        "delete": function () {
            this.model.destroy()
        }
    })
}),define("components/showcase/2.0.0/tpl_fbb/views/edit_collection", ["require", "components/showcase/2.0.0/base/views/edit_collection_base", "components/showcase/2.0.0/tpl_fbb/views/edit_item"], function (e) {
    var t = e("components/showcase/2.0.0/base/views/edit_collection_base"), n = e("components/showcase/2.0.0/tpl_fbb/views/edit_item");
    return t.extend({
        itemView: n, onShow: function () {
            this.sortable()
        }
    })
}),define("components/showcase/2.0.0/tpl_fbb/views/edit", ["require", "underscore", "jquery", "components/showcase/2.0.0/base/views/edit_base", "text!components/showcase/2.0.0/tpl_fbb/templates/edit.html", "text!components/public_template/dropdown_menu.html", "components/pop/atom/link", "components/showcase/2.0.0/tpl_fbb/views/edit_collection", "components/image/2.0.0/app", "components/modal/1.0.0/modal", "core/utils"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("components/showcase/2.0.0/base/views/edit_base"), s = e("text!components/showcase/2.0.0/tpl_fbb/templates/edit.html"), o = e("text!components/public_template/dropdown_menu.html"), a = e("components/pop/atom/link"), l = e("components/showcase/2.0.0/tpl_fbb/views/edit_collection"), c = e("components/image/2.0.0/app"), r = e("components/modal/1.0.0/modal"), d = e("core/utils");
    return i.extend({
        template: t.template(s),
        dropdownTpl: t.template(o),
        templateHelpers: function () {
            return {fullfillImage: d.fullfillImage, dropdown_menu: this.dropdownTpl}
        },
        events: {
            'blur input[type="text"]': "updateModel",
            'click input[type="radio"]': "updateModel",
            'change input[type="color"]': "updateModel",
            "click .js-trigger-image": "chooseImage",
            "click .js-trigger-delete": "deleteImage",
            "click .js-add-option": "addOption",
            "click .js-reset-bg": "resetBg",
            "click .js-modal-magazine, .js-modal-goods, .js-modal-activity, .js-modal-survey": "chooseLink",
            "click .js-modal-history, .js-modal-homepage, .js-modal-usercenter": "chooseStaticLink",
            "click .js-modal-links": "chooseOtherLink"
        },
        regions: {collectionRegion: ".js-collection-region"},
        onInit: function () {
            this.listenTo(this.model, "change:bg_link_url", this.render), this.listenTo(this.model.get("sub_entry"), "reset add remove", this.toggleOptions)
        },
        onRender: function () {
            this.collectionRegion.show(new l({
                collection: this.model.get("sub_entry"),
                layout: this
            })), this.toggleOptions()
        },
        chooseImage: function () {
            var e = this;
            c.initialize({
                multiChoose: !1, callback: function (t) {
                    t = t[0], e.model.set({
                        background: t.attachment_url,
                        width: Number(t.width),
                        height: Number(t.height)
                    })
                }
            })
        },
        deleteImage: function () {
            this.model.set({background: "", width: "", height: ""})
        },
        resetBg: function () {
            this.model.set("color", "#ffffff"), this.$('input[type="color"]').val("#ffffff")
        },
        addOption: function () {
            this.model.get("sub_entry").add({
                type: "title_nav_selection",
                title: "",
                link_id: "",
                link_type: "",
                link_title: "",
                link_url: ""
            })
        },
        toggleOptions: function () {
            this.model.get("sub_entry").length >= 20 ? this.$(".options").hide() : this.$(".options").show()
        },
        chooseLink: function (e) {
            var t = this, i = n(e.target).data("type");
            r.initialize({type: i}).setChooseItemCallback(function (e) {
                t.model.set({
                    bg_link_id: e.data_id,
                    bg_link_type: e.type,
                    bg_link_title: e.data_title,
                    bg_link_url: e.data_url
                })
            }).modal("show")
        },
        chooseStaticLink: function (e) {
            var t = n(e.target).data("type"), i = this;
            d.getStaticUrl(t, function (e) {
                i.model.set({bg_link_id: "", bg_link_type: t, bg_link_title: "", bg_link_url: e})
            })
        },
        chooseOtherLink: function (e) {
            var t, i = this;
            t = this.$(this.$(".js-link-to").length > 0 ? ".js-link-to" : ".js-dropdown-toggle");
            var s = e.target;
            a.initialize({
                target: t, trigger: n(s), callback: function (e) {
                    i.model.set({bg_link_id: "", bg_link_type: "link", bg_link_title: e, bg_link_url: e})
                }
            })
        }
    })
}),define("text!components/showcase/2.0.0/tpl_course/templates/edit.html", [], function () {
    return '<form class="form-horizontal" novalidate>\n    <div class="control-group">\n        <label class="control-label"><em class="required">*</em>背景图片：</label>\n        <div class="controls">\n            <% if (background === \'\') { %>\n                <a class="control-action js-trigger-image" href="javascript: void(0);">选择图片</a>\n            <% } else { %>\n                <img src="<%= background %>" data-full-size="<%= background %>" width="100" height="100" class="thumb-image">\n                <a class="control-action js-trigger-image" href="javascript: void(0);">修改</a>\n            <% } %>\n            <p class="help-block">建议尺寸：640 x 1080 像素</p>\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label">标题名：</label>\n        <div class="controls">\n            <input type="text" name="title" value="<%- title %>" maxlength="10">\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label">标题颜色：</label>\n        <div class="controls">\n            <input type="color" value="<%= title_color %>" name="title_color">\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label">副标题：</label>\n        <div class="controls">\n            <input type="text" name="sub_title" value="<%- sub_title %>" maxlength="20">\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label">副标题颜色：</label>\n        <div class="controls">\n            <input type="color" value="<%= sub_title_color %>" name="sub_title_color">\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label">按钮文字：</label>\n        <div class="controls">\n            <input type="text" name="button_text" value="<%- button_text %>" maxlength="10">\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label"><em class="required">*</em>按钮链接：</label>\n        <div class="controls js-parent-link">\n            <input type="hidden" name="button_link_url" value="<%= button_link_url %>">\n            <% if (button_link_type != \'\') { %>\n                <div class="control-action clearfix">\n                    <div class="pull-left js-link-to link-to">\n                        <% if (button_link_title !== \'\') { %>\n                            <a href="<%= button_link_url %>" target="_blank" class="new-window link-to-title">\n                        <% } %>\n                        <span class="label label-success">\n                            <% if (button_link_type === \'feature\') { %>\n                                微页面\n                            <% } else if (button_link_type === \'category\') { %>\n                                微页面分类\n                            <% } else if (button_link_type === \'topic\') { %>\n                                专题\n                            <% } else if (button_link_type === \'article\') { %>\n                                资讯\n                            <% } else if (button_link_type === \'goods\') { %>\n                                商品\n                            <% } else if (button_link_type === \'tag\') { %>\n                                商品标签\n                            <% } else if (button_link_type === \'activity\') { %>\n                                营销活动\n                            <% } else if (button_link_type === \'survey\') { %>\n                                调查\n                            <% } else if (button_link_type === \'homepage\') { %>\n                                店铺主页\n                            <% } else if (button_link_type === \'usercenter\') { %>\n                                会员主页\n                            <% } else if (button_link_type === \'link\') { %>\n                                外链\n                            <% } else if (button_link_type === \'history\') { %>\n                                历史信息\n                            <% } %>\n                        <% if (button_link_title !== \'\') { %>\n                                <em class="link-to-title-text"><%- button_link_title %></em>\n                            </span>\n                        </a>\n                        <% } else { %>\n                            </span>\n                        <% } %>\n                    </div>\n                    <div class="dropdown hover pull-right">\n                        <a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>\n                        <%= dropdown_menu() %>\n                    </div>\n                </div>\n\n            <% } else { %>\n                <div class="dropdown hover">\n                    <a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:void(0);">设置链接到的页面地址 <i class="caret"></i></a>\n                    <%= dropdown_menu() %>\n                </div>\n            <% } %>\n        </div>\n    </div>\n    <div class="control-group white-space-group tpl-course-white-space-group">\n        <label class="control-label">按钮离顶部：</label>\n        <div class="controls controls-slider">\n            <div class="js-slider white-space-slider"></div>\n            <div class="slider-height"><span class="js-height"><%= top %></span> %</div>\n        </div>\n    </div>\n    <div class="separate-line-wrap">\n        <hr>\n        <div class="separate-line">\n            <p class="text-center">导航链接</p>\n            <p class="text-center">v</p>\n        </div>\n    </div>\n    <div class="control-group js-collection-region">\n    </div>\n\n    <div class="control-group options">\n        <a class="add-option js-add-option" href="javascript:;"><i class="icon-add"></i> 添加一个导航链接</a>\n    </div>\n</form>\n'
}),define("text!components/showcase/2.0.0/tpl_course/templates/edit_item.html", [], function () {
    return '<div class="control-group">\n    <label class="control-label"><em class="required">*</em>小标题：</label>\n    <div class="controls">\n        <input type="text" name="title" value="<%- title %>">\n    </div>\n</div>\n<div class="control-group">\n    <label class="control-label"><em class="required">*</em>链接到：</label>\n    <div class="controls" name="link_url">\n        <% if (link_type != \'\') { %>\n            <div class="control-action clearfix">\n                <div class="pull-left js-link-to link-to">\n                    <% if (link_title !== \'\') { %>\n                        <a href="<%= link_url %>" target="_blank" class="new-window link-to-title">\n                    <% } %>\n                    <span class="label label-success">\n                        <% if (link_type === \'feature\') { %>\n                            微页面\n                        <% } else if (link_type === \'category\') { %>\n                            微页面分类\n                        <% } else if (link_type === \'topic\') { %>\n                            专题\n                        <% } else if (link_type === \'article\') { %>\n                            资讯\n                        <% } else if (link_type === \'goods\') { %>\n                            商品\n                        <% } else if (link_type === \'tag\') { %>\n                            商品标签\n                        <% } else if (link_type === \'activity\') { %>\n                            营销活动\n                        <% } else if (link_type === \'survey\') { %>\n                            调查\n                        <% } else if (link_type === \'homepage\') { %>\n                            店铺主页\n                        <% } else if (link_type === \'usercenter\') { %>\n                            会员主页\n                        <% } else if (link_type === \'link\') { %>\n                            外链\n                        <% } else if (link_type === \'history\') { %>\n                            历史信息\n                        <% } %>\n                    <% if (link_title !== \'\') { %>\n                            <em class="link-to-title-text"><%- link_title %></em>\n                        </span>\n                    </a>\n                    <% } else { %>\n                        </span>\n                    <% } %>\n                </div>\n                <div class="dropdown hover pull-right">\n                    <a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>\n                    <%= dropdown_menu() %>\n                </div>\n            </div>\n\n        <% } else { %>\n            <div class="dropdown hover">\n                <a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:void(0);">设置链接到的页面地址 <i class="caret"></i></a>\n                <%= dropdown_menu() %>\n            </div>\n        <% } %>\n    </div>\n</div>\n<div class="control-group">\n    <label class="control-label">小图标：</label>\n    <div class="controls">\n        <% if (icon_image_url === \'\') { %>\n            <a class="control-action js-icon-image" href="javascript: void(0);">选择图片</a>\n        <% } else { %>\n            <img src="<%= icon_image_url %>" data-full-size="<%= icon_image_url %>" width="30" height="30" class="thumb-image">\n            <a class="control-action js-icon-image" href="javascript: void(0);">修改</a>\n            <span>|</span>\n            <a href="javascript:;" class="control-action js-trigger-delete-icon">删除</a>\n        <% } %>\n        <p class="help-block">建议尺寸：60 x 60 像素</p>\n    </div>\n</div>\n<div class="actions">\n    <span class="action delete close-modal" title="删除">×</span>\n</div>\n'
}),define("components/showcase/2.0.0/tpl_course/views/edit_item", ["require", "underscore", "jquery", "components/showcase/2.0.0/base/views/edit_base", "text!components/showcase/2.0.0/tpl_course/templates/edit_item.html", "text!components/public_template/dropdown_menu.html", "components/pop/atom/link", "components/modal/1.0.0/modal", "components/image/2.0.0/app", "core/utils"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("components/showcase/2.0.0/base/views/edit_base"), s = e("text!components/showcase/2.0.0/tpl_course/templates/edit_item.html"), o = e("text!components/public_template/dropdown_menu.html"), a = e("components/pop/atom/link"), l = e("components/modal/1.0.0/modal"), c = e("components/image/2.0.0/app"), r = e("core/utils");
    return i.extend({
        tagName: "li",
        className: "choice",
        template: t.template(s),
        dropdownTpl: t.template(o),
        events: {
            'blur input[type="text"]': "updateModel",
            "click .actions .delete": "delete",
            "click .js-modal-magazine, .js-modal-goods, .js-modal-activity, .js-modal-survey": "chooseLink",
            "click .js-modal-history, .js-modal-homepage, .js-modal-usercenter": "chooseStaticLink",
            "click .js-modal-links": "chooseOtherLink",
            "click .js-bg-image": "chooseImage",
            "click .js-icon-image": "chooseIconImage",
            "click .js-trigger-delete-bg": "deleteImage",
            "click .js-trigger-delete-icon": "deleteIconImage"
        },
        modelEvents: {change: "render"},
        serializeData: function () {
            var e = this.model.toJSON();
            return e.icon_image_url = r.fullfillImage(e.icon_image_url), e.bg_image_url = r.fullfillImage(e.bg_image_url), e.dropdown_menu = this.dropdownTpl, e
        },
        chooseImage: function () {
            var e = this;
            c.initialize({
                multiChoose: !1, callback: function (t) {
                    t = t[0], e.model.set({
                        bg_image_id: t.attachment_id,
                        bg_image_url: t.attachment_url,
                        bg_image_width: Number(t.width),
                        bg_image_height: Number(t.height)
                    })
                }
            })
        },
        deleteImage: function () {
            this.model.set({bg_image_id: "", bg_image_url: "", bg_image_width: "", bg_image_height: ""})
        },
        chooseIconImage: function () {
            var e = this;
            c.initialize({
                multiChoose: !1, callback: function (t) {
                    t = t[0], e.model.set({
                        icon_image_id: t.attachment_id,
                        icon_image_url: t.attachment_url,
                        icon_image_width: Number(t.width),
                        icon_image_height: Number(t.height)
                    })
                }
            })
        },
        deleteIconImage: function () {
            this.model.set({icon_image_id: "", icon_image_url: "", icon_image_width: "", icon_image_height: ""})
        },
        chooseLink: function (e) {
            var t = this, i = n(e.target).data("type");
            l.initialize({type: i}).setChooseItemCallback(function (e) {
                t.model.set({link_id: e.data_id, link_type: e.type, link_title: e.data_title, link_url: e.data_url})
            }).modal("show")
        },
        chooseStaticLink: function (e) {
            var t = n(e.target).data("type"), i = this;
            r.getStaticUrl(t, function (e) {
                i.model.set({link_id: "", link_type: t, link_title: "", link_url: e})
            })
        },
        chooseOtherLink: function (e) {
            var t, i = this;
            t = this.$(this.$(".js-link-to").length > 0 ? ".js-link-to" : ".js-dropdown-toggle");
            var s = e.target;
            a.initialize({
                target: t, trigger: n(s), callback: function (e) {
                    i.model.set({link_id: "", link_type: "link", link_title: e, link_url: e})
                }
            })
        },
        "delete": function () {
            this.model.destroy()
        }
    })
}),define("components/showcase/2.0.0/tpl_course/views/edit_colleciton", ["require", "components/showcase/2.0.0/base/views/edit_collection_base", "components/showcase/2.0.0/tpl_course/views/edit_item"], function (e) {
    var t = e("components/showcase/2.0.0/base/views/edit_collection_base"), n = e("components/showcase/2.0.0/tpl_course/views/edit_item");
    return t.extend({
        itemView: n, onShow: function () {
            this.sortable()
        }
    })
}),define("components/showcase/2.0.0/tpl_course/views/edit", ["require", "underscore", "jquery", "components/showcase/2.0.0/base/views/edit_base", "text!components/showcase/2.0.0/tpl_course/templates/edit.html", "text!components/public_template/dropdown_menu.html", "components/showcase/2.0.0/tpl_course/views/edit_colleciton", "components/image/2.0.0/app", "components/pop/atom/link", "components/modal/1.0.0/modal", "core/utils"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("components/showcase/2.0.0/base/views/edit_base"), s = e("text!components/showcase/2.0.0/tpl_course/templates/edit.html"), o = e("text!components/public_template/dropdown_menu.html"), a = e("components/showcase/2.0.0/tpl_course/views/edit_colleciton"), l = e("components/image/2.0.0/app"), c = e("components/pop/atom/link"), r = e("components/modal/1.0.0/modal"), d = e("core/utils");
    return i.extend({
        template: t.template(s),
        dropdownTpl: t.template(o),
        events: {
            'blur input[type="text"]': "updateModel",
            'click input[type="radio"]': "updateModel",
            'change input[type="color"]': "updateModel",
            "click .js-trigger-image": "chooseImage",
            "click .js-trigger-delete": "deleteImage",
            "click .js-add-option": "addOption",
            "click .js-reset-bg": "resetBg",
            "click .js-parent-link .js-modal-magazine, .js-parent-link .js-modal-goods, .js-parent-link .js-modal-activity, .js-parent-link .js-modal-survey": "chooseLink",
            "click .js-parent-link .js-modal-history, .js-parent-link .js-modal-homepage, .js-parent-link .js-modal-usercenter": "chooseStaticLink",
            "click .js-parent-link .js-modal-links": "chooseOtherLink"
        },
        modelEvents: {"change:background": "render"},
        regions: {collectionRegion: ".js-collection-region"},
        onInit: function () {
            this.listenTo(this.model, "change:button_link_url", this.render), this.listenTo(this.model.get("sub_entry"), "reset add remove", this.toggleOptions)
        },
        serializeData: function () {
            var e = this.model.toJSON();
            return e.background = d.fullfillImage(e.background), e.dropdown_menu = this.dropdownTpl, e
        },
        onRender: function () {
            this.collectionRegion.show(new a({
                collection: this.model.get("sub_entry"),
                layout: this
            })), this.renderSlider(), this.toggleOptions()
        },
        renderSlider: function () {
            var e = this, n = e.$(".js-height");
            this.$(".js-slider").slider({
                min: 0, max: 100, value: e.model.get("top"), slide: function (i, s) {
                    var o = s.value;
                    t.isNumber(o) && e.model.set("top", o), n.text(o)
                }
            })
        },
        addOption: function () {
            this.model.get("sub_entry").add({
                type: "title_nav_selection",
                title: "",
                link_id: "",
                link_type: "",
                link_title: "",
                link_url: ""
            })
        },
        toggleOptions: function () {
            this.model.get("sub_entry").length >= 20 ? this.$(".options").hide() : this.$(".options").show()
        },
        chooseImage: function () {
            var e = this;
            l.initialize({
                multiChoose: !1, callback: function (t) {
                    t = t[0], e.model.set({
                        background: t.attachment_url,
                        width: Number(t.width),
                        height: Number(t.height)
                    })
                }
            })
        },
        deleteImage: function () {
            this.model.set({background: "", width: "", height: ""})
        },
        chooseLink: function (e) {
            var t = this, i = n(e.target).data("type");
            r.initialize({type: i}).setChooseItemCallback(function (e) {
                t.model.set({
                    button_link_id: e.data_id,
                    button_link_type: e.type,
                    button_link_title: e.data_title,
                    button_link_url: e.data_url
                })
            }).modal("show")
        },
        chooseStaticLink: function (e) {
            var t = n(e.target).data("type"), i = this;
            d.getStaticUrl(t, function (e) {
                i.model.set({button_link_id: "", button_link_type: t, button_link_title: "", button_link_url: e})
            })
        },
        chooseOtherLink: function (e) {
            var t, i = this;
            t = this.$(this.$(".js-link-to").length > 0 ? ".js-link-to" : ".js-dropdown-toggle");
            var s = e.target;
            c.initialize({
                target: t, trigger: n(s), callback: function (e) {
                    i.model.set({
                        button_link_id: "",
                        button_link_type: "link",
                        button_link_title: e,
                        button_link_url: e
                    })
                }
            })
        },
        resetBg: function () {
            this.model.set("color", "#ffffff"), this.$('input[type="color"]').val("#ffffff")
        }
    })
}),define("text!components/showcase/2.0.0/tpl_wxd/templates/edit.html", [], function () {
    return '<form class="form-horizontal" novalidate>\n    <div class="control-group">\n        <label class="control-label">背景图片：</label>\n        <div class="controls">\n            <% if (backgroundImage === \'\') { %>\n                <a class="control-action js-trigger-image" href="javascript: void(0);">选择图片</a>\n            <% } else { %>\n                <div class="tpl-wxd">\n                    <div class="tpl-wxd-bg">\n                        <img src="<%- backgroundImage %>" alt="">\n                    </div>\n                </div>\n                <a class="control-action js-trigger-image" href="javascript: void(0);">修改</a>\n            <% } %>\n            <p class="help-desc">建议尺寸：640 x 200 像素。</p>\n            <p class="help-desc">尺寸不匹配时，图片将被压缩或拉伸以铺满画面。</p>\n        </div>\n    </div>\n\n    <div class="control-group">\n        <label class="control-label">店铺Logo：</label>\n        <div class="controls">\n            <img src="<%- window._global.mp_data.logo %>" width="80" height="80" class="thumb-image" style="width: 80px; height: 80px;">\n            <a class="control-action js-trigger-avatar" href="javascript: void(0);">修改店铺Logo</a>\n            <p class="help-desc">建议尺寸：160 x 160 像素</p>\n        </div>\n    </div>\n</form>\n'
}),define("components/showcase/2.0.0/tpl_wxd/views/edit", ["require", "underscore", "components/showcase/2.0.0/base/views/edit_base", "text!components/showcase/2.0.0/tpl_wxd/templates/edit.html", "components/image/2.0.0/app", "components/uploadlogo/app", "core/utils"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/edit_base"), i = e("text!components/showcase/2.0.0/tpl_wxd/templates/edit.html"), s = e("components/image/2.0.0/app"), o = e("components/uploadlogo/app"), a = e("core/utils");
    return n.extend({
        template: t.template(i),
        events: {"click .js-trigger-image": "chooseImage", "click .js-trigger-avatar": "chooseAvatar"},
        serializeData: function () {
            var e = this.model.toJSON();
            return e.avatar = a.fullfillImage(e.avatar) || "", e.backgroundImage = a.fullfillImage(e.backgroundImage) || "", e
        },
        chooseImage: function () {
            this._openImageModal(function (e) {
                this.model.set("backgroundImage", e)
            })
        },
        chooseAvatar: function () {
            var e = this;
            new o({
                callback: function () {
                    e.render(), e.model.trigger("change")
                }
            })
        },
        _openImageModal: function (e) {
            var n = t.bind(function (t) {
                t = t[0], e.call(this, t.attachment_url), this.render()
            }, this);
            s.initialize({multiChoose: !1, callback: n})
        }
    })
}),define("text!components/showcase/2.0.0/tpl_11_11/templates/edit.html", [], function () {
    return '<form class="form-horizontal edit-tpl-11-11" novalidate onsubmit="return false">\n    <div class="control-group">\n        <label class="control-label">背景图片：</label>\n        <div class="controls">\n            <% if (banner === \'\') { %>\n                <a class="control-action js-trigger-image" href="javascript: void(0);">选择图片</a>\n            <% } else { %>\n                <div class="tpl-shop-header" style="width: 320px; background-image: url(<%- fullfillImage(banner) %>);">\n                    <a class="close-modal small hide js-delete-image" data-index="0">×</a>\n                </div>\n                <a class="control-action js-trigger-image" href="javascript: void(0);">修改</a>\n            <% } %>\n            <p class="help-desc">最佳尺寸：640 x 200 像素。</p>\n            <p class="help-desc">尺寸不匹配时，图片将被压缩或拉伸以铺满画面。</p>\n            <input type="hidden" name="banner">\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label">优惠券：</label>\n        <div class="controls">\n            <ul class="tradeincard-list">\n            <% _.each(tradeincard, function(item) { %>\n                <li>\n                    <div class="tradeincard-list-content">\n                        <div class="tradeincard-list-summary">\n                            <span class="label label-success">优惠券</span>\n                            <span><%- item.name %></span>\n                            <span class="c-gray">\n                                <% if(item.at_least) { %>\n                                    （满<%= item.at_least %>元可用）\n                                <% } else { %>\n                                    无限制\n                                <% } %>\n                            </span>\n                        </div>\n                    </div>\n                    <div class="tradeincard-list-opts">\n                        <a href="javascript:;" class="js-remove-tradeincard">删除</a>\n                    </div>\n                </li>\n\n            <% }); %>\n            </ul>\n            <% if(tradeincard.length < 3) { %>\n                <a href="javascript:;" class="control-action js-add-tradeincard">添加优惠券</a>\n            <% } %>\n            <input type="hidden" name="tradeincard">\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label">公告：</label>\n        <div class="controls">\n            <input type="text" name="notice" value="<%= notice %>" class="input-xxlarge" placeholder="请填写内容，如果过长，将会在手机上滚动显示">\n        </div>\n    </div>\n</form>\n'
}),define("components/showcase/2.0.0/tpl_11_11/views/edit", ["require", "underscore", "components/showcase/2.0.0/base/views/edit_base", "text!components/showcase/2.0.0/tpl_11_11/templates/edit.html", "components/image/2.0.0/app", "components/modal/1.0.0/modal", "core/utils"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/edit_base"), i = e("text!components/showcase/2.0.0/tpl_11_11/templates/edit.html"), s = e("components/image/2.0.0/app"), o = e("components/modal/1.0.0/modal"), a = e("core/utils");
    return n.extend({
        template: t.template(i),
        events: {
            'blur input[type="text"]': "updateModel",
            "click .js-trigger-image": "chooseImage",
            "click .js-delete-image": "deleteImage",
            "click .js-add-tradeincard": "addTradeincard",
            "click .js-remove-tradeincard": "removeTradeincard"
        },
        templateHelpers: {fullfillImage: a.fullfillImage},
        modelEvents: {"change:banner": "render", "change:tradeincard": "render"},
        chooseImage: function () {
            this._openImageModal(function (e) {
                this.model.set("banner", e)
            })
        },
        onRender: function () {
        },
        _openImageModal: function (e) {
            var n = t.bind(function (t) {
                t = t[0], e.call(this, t.attachment_url)
            }, this);
            s.initialize({multiChoose: !1, callback: n})
        },
        deleteImage: function () {
            this.model.set("banner", "")
        },
        addTradeincard: function () {
            var e = this;
            this.tradeincardModal = o.initialize({
                type: "tradeincard",
                multiChoose: !0
            }).setChooseItemCallback(function (n) {
                var i = e.model.get("tradeincard");
                t.each(n, function (e) {
                    i.length < 3 && i.push({
                        id: e.id,
                        name: e.name,
                        value: e.value,
                        is_at_least: e.is_at_least,
                        at_least: e.at_least
                    })
                }), e.model.trigger("change:tradeincard"), e.model.trigger("change")
            }), this.tradeincardModal.modal("show")
        },
        removeTradeincard: function (e) {
            var t = $(e.target).parents("li").index(), n = this.model.get("tradeincard");
            n.splice(t, 1), this.model.trigger("change:tradeincard"), this.model.trigger("change")
        }
    })
}),define("text!components/showcase/2.0.0/category/templates/edit_item.html", [], function () {
    return '<div class="control-group">\n    <label class="control-label">名称：</label>\n    <div class="controls">\n        <input class="" type="text" name="title" value="<%- title %>" maxLength="6">\n    </div>\n</div>\n<div class="control-group">\n    <label class="control-label"><em class="required">*</em>链接到：</label>\n    <div class="controls">\n        <input type="hidden" name="link_url">\n        <% if (link_type != \'\') { %>\n            <div class="control-action clearfix">\n                <div class="pull-left js-link-to link-to">\n                    <% if (link_title !== \'\') { %>\n                    <a href="<%= link_url %>" target="_blank" class="new-window link-to-title">\n                    <% } %>\n\n                    <span class="label label-success">\n                        <% if (link_type === \'feature\') { %>\n                            微页面\n                        <% } else if (link_type === \'category\') { %>\n                            微页面分类\n                        <% } else if (link_type === \'topic\') { %>\n                            专题\n                        <% } else if (link_type === \'article\') { %>\n                            资讯\n                        <% } else if (link_type === \'goods\') { %>\n                            商品\n                        <% } else if (link_type === \'tag\') { %>\n                            商品标签\n                        <% } else if (link_type === \'activity\') { %>\n                            营销活动\n                        <% } else if (link_type === \'survey\') { %>\n                            调查\n                        <% } else if (link_type === \'homepage\') { %>\n                            店铺主页\n                        <% } else if (link_type === \'usercenter\') { %>\n                            会员主页\n                        <% } else if (link_type === \'link\') { %>\n                            外链\n                        <% } else if (link_type === \'history\') { %>\n                            历史信息\n                        <% } %>\n                    <% if (link_title !== \'\') { %>\n                            <em class="link-to-title-text"><%- link_title %></em>\n                        </span>\n                    </a>\n                    <% } else { %>\n                        </span>\n                    <% } %>\n                    <a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除">×</a>\n                </div>\n                <div class="dropdown hover pull-right">\n                    <a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>\n                    <%= dropdown_menu() %>\n                </div>\n            </div>\n\n        <% } else { %>\n            <div class="dropdown hover">\n                <a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:void(0);">设置链接到的页面地址 <i class="caret"></i></a>\n                <%= dropdown_menu() %>\n            </div>\n        <% } %>\n    </div>\n</div>\n'
}),define("components/showcase/2.0.0/category/views/edit_item", ["require", "underscore", "jquery", "components/showcase/2.0.0/base/views/edit_base", "text!components/showcase/2.0.0/category/templates/edit_item.html", "text!components/public_template/dropdown_menu.html", "components/pop/atom/link", "components/modal/1.0.0/modal", "core/utils"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("components/showcase/2.0.0/base/views/edit_base"), s = e("text!components/showcase/2.0.0/category/templates/edit_item.html"), o = e("text!components/public_template/dropdown_menu.html"), a = e("components/pop/atom/link"), l = e("components/modal/1.0.0/modal"), c = e("core/utils");
    return i.extend({
        tagName: "li",
        className: "choice",
        template: t.template(s),
        dropdownTpl: t.template(o),
        templateHelpers: function () {
            return {dropdown_menu: this.dropdownTpl}
        },
        events: {
            'blur input[type="text"]': "updateModel",
            "click .js-modal-magazine, .js-modal-goods, .js-modal-activity, .js-modal-survey": "chooseLink",
            "click .js-modal-history, .js-modal-homepage, .js-modal-usercenter": "chooseStaticLink",
            "click .js-modal-links": "chooseOtherLink",
            "click .js-delete-link": "deleteLink"
        },
        onInit: function () {
            this.listenTo(this.model, "change:link_url", this.render)
        },
        chooseLink: function (e) {
            var t = this, i = n(e.target).data("type");
            l.initialize({type: i}).setChooseItemCallback(function (e) {
                t.model.set({link_id: e.data_id, link_type: e.type, link_title: e.data_title, link_url: e.data_url})
            }).modal("show")
        },
        chooseStaticLink: function (e) {
            var t = n(e.target).data("type"), i = this;
            c.getStaticUrl(t, function (e) {
                i.model.set({link_id: "", link_type: t, link_title: "", link_url: e})
            })
        },
        chooseOtherLink: function (e) {
            var t, i = this;
            t = this.$(this.$(".js-link-to").length > 0 ? ".js-link-to" : ".js-dropdown-toggle");
            var s = e.target;
            a.initialize({
                target: t, trigger: n(s), callback: function (e) {
                    i.model.set({link_id: "", link_type: "link", link_title: e, link_url: e})
                }
            })
        },
        deleteLink: function () {
            this.model.set({link_id: "", link_type: "", link_title: "", link_url: ""})
        }
    })
}),define("components/showcase/2.0.0/category/views/edit_collection", ["require", "components/showcase/2.0.0/base/views/edit_collection_base", "components/showcase/2.0.0/category/views/edit_item"], function (e) {
    var t = e("components/showcase/2.0.0/base/views/edit_collection_base"), n = e("components/showcase/2.0.0/category/views/edit_item");
    return t.extend({
        itemView: n, onShow: function () {
            this.sortable()
        }
    })
}),define("text!components/showcase/2.0.0/category/templates/edit.html", [], function () {
    return '<form class="form-horizontal" novalidate>\n    <div class="control-group js-collection-region">\n\n    </div>\n</form>\n'
}),define("components/showcase/2.0.0/category/views/edit", ["require", "underscore", "components/showcase/2.0.0/base/views/edit_base", "components/showcase/2.0.0/category/views/edit_collection", "text!components/showcase/2.0.0/category/templates/edit.html"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/edit_base"), i = e("components/showcase/2.0.0/category/views/edit_collection"), s = e("text!components/showcase/2.0.0/category/templates/edit.html");
    return n.extend({
        template: t.template(s),
        regions: {collectionRegion: ".js-collection-region"},
        onRender: function () {
            this.collectionRegion.show(new i({collection: this.model.get("sub_entry"), layout: this}))
        }
    })
}),define("text!components/showcase/2.0.0/white/templates/edit.html", [], function () {
    return '<form class="form-horizontal" novalidate>\n    <div class="control-group white-space-group">\n        <label class="control-label">空白高度：</label>\n        <div class="controls controls-slider">\n            <div class="js-slider white-space-slider"></div>\n            <div class="slider-height"><span class="js-height"><%= height %></span> 像素</div>\n        </div>\n    </div>\n</form>\n'
}),define("components/showcase/2.0.0/white/views/edit", ["require", "underscore", "components/showcase/2.0.0/base/views/edit_base", "text!components/showcase/2.0.0/white/templates/edit.html", "jqueryui"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/edit_base"), i = e("text!components/showcase/2.0.0/white/templates/edit.html");
    return e("jqueryui"), n.extend({
        template: t.template(i),
        ui: {slider: ".js-slider", height: ".js-height"},
        onShow: function () {
            var e = this;
            this.ui.slider.slider({
                min: 30, max: 100, value: e.model.get("height"), slide: function (n, i) {
                    var s = i.value;
                    t.isNumber(s) && e.model.set("height", s), e.ui.height.text(s)
                }
            })
        }
    })
}),define("text!components/showcase/2.0.0/store/templates/edit.html", [], function () {
    return '<div class="app-component-desc">\n    <p>进入店铺</p>\n</div>\n'
}),define("components/showcase/2.0.0/store/views/edit", ["require", "underscore", "components/showcase/2.0.0/base/views/edit_base", "text!components/showcase/2.0.0/store/templates/edit.html"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/edit_base"), i = e("text!components/showcase/2.0.0/store/templates/edit.html");
    return n.extend({template: t.template(i)})
}),define("text!components/showcase/2.0.0/recommend_goods/templates/edit.html", [], function () {
    return "<p>如果店铺中上架的商品数量少于10个，这个组件将不会在页面中显示。</p>\n"
}),define("components/showcase/2.0.0/recommend_goods/views/edit", ["require", "underscore", "components/showcase/2.0.0/base/views/edit_base", "text!components/showcase/2.0.0/recommend_goods/templates/edit.html"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/edit_base"), i = e("text!components/showcase/2.0.0/recommend_goods/templates/edit.html");
    return n.extend({
        className: "app-component-desc", template: t.template(i), onInit: function (e) {
            this.parent = e.parent, this.listenTo(this.model, "change", this.render)
        }
    })
}),define("text!components/music/2.0.0/templates/app.html", [], function () {
    return '<div class="modal-header">\n    <a class="close" data-dismiss="modal">×</a>\n    <!-- 顶部tab -->\n    <ul class="module-nav modal-tab">\n        <li class="active"><a href="javascript:;" data-pane="public" class="js-modal-tab">配乐库</a> | </li>\n        <li><a href="javascript:;" data-pane="my" class="js-modal-tab">我的音乐</a></li>\n    </ul>\n</div>\n<div class="js-content-region">\n\n</div>\n<audio id="custom_scroll_audio_player" src=""></audio>\n'
}),define("text!components/music/2.0.0/templates/public_music.html", [], function () {
    return '<div class="tab-pane">\n    <div class="modal-body">\n        <table class="ui-table ui-table-list">\n            <thead>\n                <tr>\n                    <th>音乐</th>\n                    <th class="text-center">时长</th>\n                    <th class="text-right">大小</th>\n                    <th class="text-center">风格</th>\n                    <th class="text-right">操作</th>\n                </tr>\n            </thead>\n            <tbody>\n                <% _.each(musics, function(music, index) { %>\n                <tr data-title="<%- music.title %>" data-url="<%- music.url %>">\n                    <td>\n                        <span class="music-preview js-paly-music"></span>\n                        <div class="music-content">\n                            <%= music.title %>\n                            <% if(music.description) { %>\n                                <p class="music-description"><%= music.description %></p>\n                            <% } %>\n                        </div>\n                    </td>\n                    <td class="text-center"><%- music.time %></td>\n                    <td class="text-right"><%- music.size %></td>\n                    <td class="text-center"><%- music.type %></td>\n                    <td class="text-right">\n                        <% if(music.url != currentUrl) { %>\n                        <button class="ui-btn js-btn-choose">选取</button>\n                        <% } else { %>\n                        <button class="ui-btn ui-btn-disabled">已选</button>\n                        <% } %>\n                    </td>\n                </tr>\n                <% }) %>\n            </tbody>\n        </table>\n\n    </div>\n    <div class="modal-footer">\n        <div class="pagenavi js-pagenavi">\n            <% for(var i = 1; i < totalPage + 1; i++ ) { %>\n            <a data-page-num="<%= i %>" href="javascript:;" class="num <% if(i == p) { %>active<% } %>"><%= i %></a>\n            <% } %>\n        </div>\n    </div>\n</div>\n'
}),define("components/music/2.0.0/data", [], function () {
    return {
        musics: [{
            title: "Lucky Day",
            url: "public_files/music/Lucky Day.mp3",
            type: "节奏",
            time: "01:08",
            size: "543 KB"
        }, {
            title: "Parasail",
            url: "public_files/music/Parasail.mp3",
            type: "节奏",
            time: "03:04",
            size: "1.5 MB"
        }, {
            title: "Phase Three",
            url: "public_files/music/Phase Three.mp3",
            type: "节奏",
            time: "03:08",
            size: "1.5 MB"
        }, {
            title: "Say Yeah",
            url: "public_files/music/Say Yeah.mp3",
            type: "节奏",
            time: "03:11",
            size: "1.5 MB"
        }, {
            title: "Soft",
            url: "public_files/music/Soft.mp3",
            type: "节奏",
            time: "01:23",
            size: "666 KB"
        }, {
            title: "The Wrong Way",
            url: "public_files/music/The Wrong Way.mp3",
            type: "节奏",
            time: "02:45",
            size: "1.3 MB"
        }, {
            title: "Road to Moscow",
            url: "public_files/music/Road to Moscow.mp3",
            type: "轻快",
            time: "01:14",
            size: "594 KB"
        }, {
            title: "No Pressha",
            url: "public_files/music/No Pressha.mp3",
            type: "轻快",
            time: "01:27",
            size: "700 KB"
        }, {
            title: "Rotten Gardenias",
            url: "public_files/music/Rotten Gardenias.mp3",
            type: "轻快",
            time: "02:17",
            size: "1.1 MB"
        }, {
            title: "Sound Off",
            url: "public_files/music/Sound Off.mp3",
            type: "轻快",
            time: "01:36",
            size: "769 KB"
        }, {
            title: "Swamp Stomp",
            url: "public_files/music/Swamp Stomp.mp3",
            type: "轻快",
            time: "02:05",
            size: "1 MB"
        }, {
            title: "Jazz In Paris",
            url: "public_files/music/Jazz In Paris.mp3",
            type: "轻快",
            time: "01:42",
            size: "821 KB"
        }, {
            title: "Let's Do It",
            url: "public_files/music/Let's Do It.mp3",
            type: "放松",
            time: "03:14",
            size: "1.6 MB"
        }, {
            title: "Monks",
            url: "public_files/music/Monks.mp3",
            type: "放松",
            time: "03:10",
            size: "1.5 MB"
        }, {title: "Pluto", url: "public_files/music/Pluto.mp3", type: "放松", time: "02:13", size: "1.1 MB"}, {
            title: "抱着你",
            url: "public_files/music/baozheni.mp3",
            type: "放松",
            time: "04:28",
            size: "1.9 MB",
            description: "由有赞商户 <em>VINOTECA</em> 提供正版授权"
        }]
    }
}),define("components/music/2.0.0/views/public_music", ["require", "underscore", "jquery", "marionette", "text!components/music/2.0.0/templates/public_music.html", "components/music/2.0.0/data"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("marionette"), s = e("text!components/music/2.0.0/templates/public_music.html"), o = e("components/music/2.0.0/data"), a = 10;
    return i.Layout.extend({
        template: t.template(s),
        events: {"click .js-pagenavi .num": "handlePageClick"},
        p: 1,
        initialize: function (e) {
            this.options = e || {}, this.layout = this.options.layout
        },
        serializeData: function () {
            var e = {};
            return e.musics = o.musics.slice((this.p - 1) * a, this.p * a), t.extend(e, {
                currentUrl: this.options.currentUrl,
                p: this.p,
                totalPage: Math.ceil(o.musics.length / a)
            })
        },
        handlePageClick: function (e) {
            var t = +n(e.target).data("page-num");
            t !== this.p && (this.p = t, this.render(), this.layout.stopMusic())
        }
    })
}),define("components/music/2.0.0/models/music", ["require", "underscore", "jquery", "backbone", "core/utils"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("backbone"), s = e("core/utils"), o = window._global;
    return i.Model.extend({
        defaults: {items: null, page: "", p: 1}, sync: function (e) {
            return s.ajax(e)
        }, ajax: function (e, i) {
            var s = n.Deferred();
            return "object" == typeof e && (i = e, e = void 0), i = t.defaults(i || {}, {dataType: "json"}), s.xhr = n.ajax(e, i).done(function (e) {
                0 === +e.errcode ? s.resolve(e.data, e) : s.reject(e.errmsg, e)
            }).fail(function () {
                s.reject("网络错误。", {code: -1, msg: "网络错误。"})
            }), s
        }, fetch: function (e) {
            var n = this;
            return e = e || {}, this.ajax({
                url: o.url.www + "/showcase/attachment/alert.json",
                method: "GET",
                data: t.extend({media_type: 5, s: 10, v: 2, p: this.get("p")}, e)
            }).done(function (e) {
                n.set({items: e.data_list, page: e.page_view}, {silent: !0}), n.trigger("sync")
            }).fail(function (e) {
                s.errorNotify(e)
            })
        }, uploadMusic: function () {
            var e = this, t = n.Deferred();
            return this.getToken().done(function (n) {
                e.upload(n.uptoken).done(function (e, n) {
                    t.resolve(e, n)
                }).fail(function (e) {
                    t.reject(e)
                })
            }).fail(function () {
                t.reject("获取token失败，请重试。")
            }), t
        }, getToken: function () {
            return this.sync({
                url: o.url.www + "/common/qiniu/upToken.json",
                method: "POST",
                data: {scope: o.js.qn_public, kdt_id: n.cookie("kdt_id")}
            })
        }, upload: function (e) {
            var t = new FormData;
            return t.append("token", e), t.append("file", this.get("file")), t.append("x:kdt_type", "music"), this.sync({
                url: "http://up.qiniu.com",
                method: "POST",
                data: t,
                processData: !1,
                contentType: !1
            })
        }
    })
}),define("text!components/music/2.0.0/templates/my_music.html", [], function () {
    return '<div class="tab-pane">\n    <div class="modal-body">\n        <div class="ui-box music-upload">\n            <p>根据中国相关法律、法规和规范性文件要求，有赞制定了旨在保护知识产权权利人合法权益的措施和步骤。如背景音乐上传者上传的内容侵犯音乐著作权权利人相关权益，责任由上传者全部承担，有赞不承担任何连带责任。</p>\n\n\n            <div class="music-upload-btn">\n                <a class="ui-btn ui-btn-primary music-upload-label js-music-upload-label" href="javascript:;" data-loading-text="正在上传...">同意协议，上传音乐</a>\n                <input class="music-upload-input fileupload js-upload-music-input" type="file" name="upload_music">\n                <span class="c-gray" style="margin-left: 10px;">支持MP3格式音乐，大小不超过6M</span>\n            </div>\n\n        </div>\n\n        <% if(items && items.length > 0) { %>\n            <table class="ui-table ui-table-list">\n                <thead>\n                    <tr>\n                        <th>音乐</th>\n                        <th class="text-right">操作</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <% _.each(items, function(music, index) { %>\n                    <tr data-title="<%- music.attachment_title.replace(/\\.mp3$/i, \'\') %>" data-url="<%- music.attachment_url %>">\n                        <td>\n                            <span class="music-preview js-paly-music"></span>\n                            <div class="music-content">\n                                <%= music.attachment_title.replace(/\\.mp3$/i, \'\') %>\n                                <% if(music.description) { %>\n                                    <p class="music-description"><%= music.description %></p>\n                                <% } %>\n                            </div>\n                        </td>\n                        <td class="text-right">\n                            <button class="ui-btn js-btn-choose">选取</button>\n                        </td>\n                    </tr>\n                    <% }) %>\n                </tbody>\n            </table>\n        <% } else { %>\n        <div class="no-result">还没有上传的音乐。</div>\n        <% } %>\n    </div>\n    <div class="modal-footer">\n        <div class="pagenavi js-pagenavi">\n            <%= page %>\n        </div>\n    </div>\n</div>\n'
}),define("components/music/2.0.0/views/my_music", ["require", "underscore", "jquery", "marionette", "components/music/2.0.0/models/music", "core/utils", "text!components/music/2.0.0/templates/my_music.html"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("marionette"), s = e("components/music/2.0.0/models/music"), o = e("core/utils"), a = e("text!components/music/2.0.0/templates/my_music.html");
    return i.Layout.extend({
        template: t.template(a),
        events: {
            "click .js-pagenavi .num": "handlePageClick",
            "change .js-upload-music-input": "handleFileChange",
            "click .pagenavi a:not(.active)": "handlePageNumClick",
            "keypress .pagenavi a.active": "handlePageNumKeypress"
        },
        modelEvents: {sync: "render"},
        initialize: function (e) {
            this.options = e || {}, this.layout = this.options.layout, this.model = new s, this.model.fetch()
        },
        onRender: function () {
            this.layout.stopMusic()
        },
        handlePageClick: function (e) {
            var t = +n(e.target).data("page-num");
            t !== this.p && this.layout.stopMusic()
        },
        handleFileChange: function (e) {
            var t = this, n = e.target.files[0];
            return n.name.match(/(\.|\/)(mp3)$/i) ? n.size > 6291456 ? void o.errorNotify("音乐文件大小不能超过6MB。") : (this.$(".js-music-upload-label").btn("loading"), this.$(".js-upload-music-input").hide(), this.model.set("file", n, {silent: !0}), void this.model.uploadMusic().done(function (e) {
                t.options.callback && t.options.callback({
                    url: e.attachment_full_url,
                    title: e.attachment_title.replace(/\.mp3$/i, "")
                }), t.layout.$el.modal("hide")
            }).fail(function (e) {
                o.errorNotify(e), t.$(".js-music-upload-label").btn("reset"), t.$(".js-upload-music-input").show()
            })) : void o.errorNotify("请选择MP3格式的音乐文件。")
        },
        handlePageNumClick: function (e) {
            var t = n(e.currentTarget), i = t.data("page-num");
            this.model.set("p", i, {silent: !0}), this.model.fetch()
        },
        handlePageNumKeypress: function (e) {
            var t = +n(e.currentTarget).text();
            o.isNumber(e) || e.preventDefault(), e.keyCode === o.keyCode.ENTER && (t !== +this.model.get("p") && t && (this.model.set("p", t, {silent: !0}), this.model.fetch({scroll: !0})), e.preventDefault())
        }
    })
}),define("components/music/2.0.0/music", ["require", "underscore", "jquery", "marionette", "text!components/music/2.0.0/templates/app.html", "components/music/2.0.0/views/public_music", "components/music/2.0.0/views/my_music", "core/utils", "components/spider/spider"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("marionette"), s = e("text!components/music/2.0.0/templates/app.html"), o = e("components/music/2.0.0/views/public_music"), a = e("components/music/2.0.0/views/my_music"), l = e("core/utils");
    e("components/spider/spider");
    var c = i.Layout.extend({
        className: "modal fade hide music-v2-modal",
        template: t.template(s),
        events: {
            hidden: "hidden",
            "click .js-modal-tab": "handleTabClick",
            "click .js-btn-choose": "chooseMusic",
            "click .js-paly-music": "playMusic"
        },
        regions: {content: ".js-content-region"},
        initialize: function (e) {
            this.options = e || {}, this.cache = {}, this.render()
        },
        onRender: function () {
            this.renderPublicMusicView(), this.$el.modal("show"), this.initPlayer()
        },
        renderPublicMusicView: function () {
            this.content.show(new o(t.extend({layout: this}, this.options)))
        },
        renderMyMusicView: function () {
            this.content.show(new a(t.extend({layout: this}, this.options)))
        },
        handleTabClick: function (e) {
            var t = n(e.target), i = t.parent(), s = t.data("pane");
            i.hasClass("active") || (this.$(".modal-tab > li").removeClass("active"), i.addClass("active"), "public" === s ? this.renderPublicMusicView() : this.renderMyMusicView(), this.stopMusic())
        },
        initPlayer: function () {
            var e = this;
            this.player = this.$("#custom_scroll_audio_player")[0], this.player.addEventListener("ended", function () {
                e.$(".playing").removeClass("playing")
            })
        },
        chooseMusic: function (e) {
            var t = n(e.target), i = t.parents("tr").data();
            this.options.callback && this.options.callback(i), this.hideModal()
        },
        playMusic: function (e) {
            var t = n(e.target), i = t.parents("tr").data();
            t.hasClass("playing") ? (t.removeClass("playing"), this.player.pause(), this.player.currentTime = 0) : (this.$(".playing").removeClass("playing"), t.addClass("playing"), this.player.src = l.fullfillImage(i.url), this.player.play())
        },
        stopMusic: function () {
            this.$(".playing").removeClass("playing"), 0 !== this.player.readyState && (this.player.pause(), this.player.currentTime = 0)
        },
        hideModal: function () {
            this.$el.modal("hide")
        },
        hidden: function () {
            this.$el.data("modal", null), this.close()
        },
        onClose: function () {
            this.player = null
        }
    });
    return {
        initialize: function (e) {
            new c(e)
        }
    }
}),define("text!components/showcase/2.0.0/scroll/templates/edit_meta.html", [], function () {
    return '<div class="control-group">\n    <label class="control-label">主页图标：</label>\n    <div class="controls">\n        <label class="checkbox inline">\n            <input type="checkbox" name="homepage_icon" <% if(homepage_icon == \'1\') {%>checked<%}%>>\n            显示店铺主页图标，用户点击后进入店铺主页\n        </label>\n    </div>\n</div>\n<div class="control-group">\n    <label class="control-label">背景音乐：</label>\n    <div class="controls">\n        <label class="checkbox inline">\n            <input type="checkbox" name="music_icon" <% if(music_icon == \'1\') {%>checked<%}%>>\n            启用背景音乐：\n        </label>\n\n        <% if(music_url) { %>\n            <div class="music-box">\n                <span class="label label-success js-music"><%= music_title %></span>\n                <a href="javascript:;" class="js-delete-music close-modal" title="删除">×</a>\n            </div>\n            <a href="javascript:;" class="choose-music js-music">修改</a>\n        <% } else { %>\n            <a href="javascript:;" class="choose-music js-music">选择音乐</a>\n        <% } %>\n    </div>\n</div>\n<div class="control-group">\n    <label class="control-label">循环滚动：</label>\n    <div class="controls">\n        <label class="checkbox inline">\n            <input type="checkbox" name="loop" <% if(loop == \'1\') {%>checked<%}%>>\n            封底页可继续滑动切换到封面\n        </label>\n    </div>\n</div>\n\n<div class="control-group">\n    <label class="control-label" style="width: 108px">场景切换方式：</label>\n    <div class="controls">\n        <select name="flipway" class="input-small">\n            <option value="default" <%if(flipway==\'default\'){%>selected<%}%> >普通</option>\n            <option value="zoomOut" <%if(flipway==\'zoomOut\'){%>selected<%}%> >缩小</option>\n        </select>\n    </div>\n</div>\n'
}),define("components/showcase/2.0.0/scroll/views/edit_meta", ["require", "underscore", "components/showcase/2.0.0/base/views/edit_base", "components/music/2.0.0/music", "text!components/showcase/2.0.0/scroll/templates/edit_meta.html"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/edit_base"), i = e("components/music/2.0.0/music"), s = e("text!components/showcase/2.0.0/scroll/templates/edit_meta.html");
    return n.extend({
        className: "ui-box",
        template: t.template(s),
        events: {
            'change input[type="checkbox"]': "updateModel",
            'change select[name="flipway"]': "updateModel",
            "click .js-music": "handleMusicClick",
            "click .js-delete-music": "handleDeleteMusicClick"
        },
        modelEvents: {"change:music_url": "render"},
        bindValidation: function () {
        },
        handleMusicClick: function () {
            i.initialize({callback: t.bind(this.choseMusice, this), currentUrl: this.model.get("music_url")})
        },
        choseMusice: function (e) {
            this.model.set({music_url: e.url, music_title: e.title})
        },
        handleDeleteMusicClick: function () {
            this.model.set({music_url: "", music_title: ""})
        }
    })
}),define("text!components/showcase/2.0.0/scroll/templates/edit_first_page.html", [], function () {
    return '<h4>封面页</h4>\n<div class="ui-box clearfix">\n    <% if(first_page_wipe == \'0\') { %>\n        <% if(first_page_image_url) { %>\n            <div class="image-box">\n                <img src="<%= fullfillImage(first_page_image_url, \'!140x140+2x.jpg\') %>" class="image">\n                <a href="javascript:;" class="modify-image js-first-page-image">重新上传</a>\n            </div>\n        <% } else { %>\n            <a href="javascript:;" class="add-image js-first-page-image"><i class="icon-add"></i> 添加图片</a>\n            <div class="control-group">\n                <div class="controls" style="margin: 2px;">\n                    <input type="hidden" name="first_page_image_url">\n                </div>\n            </div>\n        <% } %>\n    <% } else { %>\n        <div class="pull-left before-wipe">\n            <div class="pull-left">擦拭前：</div>\n            <div class="pull-left">\n                <% if(first_page_wipe_image_id) { %>\n                    <div class="image-box">\n                        <img src="<%= fullfillImage(first_page_wipe_image_url, \'!140x140+2x.jpg\') %>" class="image">\n                        <a href="javascript:;" class="modify-image js-first-page-wipe-image">重新上传</a>\n                    </div>\n                <% } else { %>\n                    <a href="javascript:;" class="add-image js-first-page-wipe-image"><i class="icon-add"></i> 添加图片</a>\n                <% } %>\n            </div>\n        </div>\n        <div class="pull-left after-wipe">\n            <div class="pull-left">擦拭后：</div>\n            <div class="pull-left">\n                <% if(first_page_image_id) { %>\n                    <div class="image-box">\n                        <img src="<%= fullfillImage(first_page_image_url, \'!140x140+2x.jpg\') %>" class="image">\n                        <a href="javascript:;" class="modify-image js-first-page-image">重新上传</a>\n                    </div>\n                <% } else { %>\n                    <a href="javascript:;" class="add-image js-first-page-image"><i class="icon-add"></i> 添加图片</a>\n                    <div class="control-group">\n                        <div class="controls" style="margin: 2px;">\n                            <input type="hidden" name="first_page_image_url">\n                        </div>\n                    </div>\n                <% } %>\n            </div>\n        </div>\n    <% } %>\n</div>\n<label class="checkbox inline">\n    <input type="checkbox" name="first_page_wipe" <% if(first_page_wipe == \'1\') {%>checked<%}%>>\n    启用擦拭屏幕后显示的交互效果\n</label>\n'
}),define("components/showcase/2.0.0/scroll/views/edit_first_page", ["require", "underscore", "components/showcase/2.0.0/base/views/edit_base", "components/image/2.0.0/app", "text!components/showcase/2.0.0/scroll/templates/edit_first_page.html", "core/utils"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/edit_base"), i = e("components/image/2.0.0/app"), s = e("text!components/showcase/2.0.0/scroll/templates/edit_first_page.html"), o = e("core/utils");
    return n.extend({
        className: "custom-scroll-page",
        template: t.template(s),
        templateHelpers: {fullfillImage: o.fullfillImage},
        events: {
            'change input[type="checkbox"]': "updateModel",
            "click .js-first-page-image": "handleImageClick",
            "click .js-first-page-wipe-image": "handleWipeImageClick"
        },
        modelEvents: {
            "change:first_page_wipe": "render",
            "change:first_page_image_id": "render",
            "change:first_page_wipe_image_id": "render"
        },
        bindValidation: function () {
        },
        handleImageClick: function () {
            var e = t.bind(function (e) {
                this.model.set({
                    first_page_image_id: e.attachment_id,
                    first_page_image_url: e.attachment_url,
                    first_page_image_thumb_url: e.thumb_url,
                    first_page_image_width: Number(e.width),
                    first_page_image_height: Number(e.height)
                })
            }, this);
            this.chooseImage(e)
        },
        handleWipeImageClick: function () {
            var e = t.bind(function (e) {
                this.model.set({
                    first_page_wipe_image_id: e.attachment_id,
                    first_page_wipe_image_url: e.attachment_url,
                    first_page_wipe_image_thumb_url: e.thumb_url,
                    first_page_wipe_image_width: Number(e.width),
                    first_page_wipe_image_height: Number(e.height)
                })
            }, this);
            this.chooseImage(e)
        },
        chooseImage: function (e) {
            i.initialize({
                multiChoose: !1, callback: function (n) {
                    n = n[0], t.isFunction(e) && e(n)
                }
            })
        }
    })
}),define("text!components/showcase/2.0.0/scroll/templates/edit_last_page.html", [], function () {
    return '<h4>封底页</h4>\n<div class="clearfix">\n    <div class="pull-left">\n        <% if(last_page_image_url) { %>\n            <div class="image-box">\n                <img src="<%= fullfillImage(last_page_image_url, \'!140x140+2x.jpg\') %>" class="image">\n                <a href="javascript:;" class="modify-image js-last-page-image">重新上传</a>\n            </div>\n        <% } else { %>\n            <a href="javascript:;" class="add-image js-last-page-image"><i class="icon-add"></i> 添加图片</a>\n            <div class="control-group">\n                <div class="controls" style="margin: 2px;">\n                    <input type="hidden" name="last_page_image_url">\n                </div>\n            </div>\n        <% } %>\n    </div>\n    <div class="pull-left">\n        <div class="control-group">\n            <label class="control-label">链接：</label>\n            <div class="controls">\n                <% if (last_page_link_type != \'\') { %>\n                    <div class="control-action clearfix">\n                        <div class="pull-left js-link-to link-to">\n                            <% if (last_page_link_title !== \'\') { %>\n                            <a href="<%= last_page_link_url %>" target="_blank" class="new-window link-to-title">\n                            <% } %>\n\n                            <span class="label label-success">\n                                <% if (last_page_link_type === \'feature\') { %>\n                                    微页面\n                                <% } else if (last_page_link_type === \'category\') { %>\n                                    微页面分类\n                                <% } else if (last_page_link_type === \'topic\') { %>\n                                    专题\n                                <% } else if (last_page_link_type === \'article\') { %>\n                                    资讯\n                                <% } else if (last_page_link_type === \'goods\') { %>\n                                    商品\n                                <% } else if (last_page_link_type === \'tag\') { %>\n                                    商品标签\n                                <% } else if (last_page_link_type === \'activity\') { %>\n                                    营销活动\n                                <% } else if (last_page_link_type === \'survey\') { %>\n                                    调查\n                                <% } else if (last_page_link_type === \'homepage\') { %>\n                                    店铺主页\n                                <% } else if (last_page_link_type === \'usercenter\') { %>\n                                    会员主页\n                                <% } else if (last_page_link_type === \'link\') { %>\n                                    外链\n                                <% } else if (last_page_link_type === \'history\') { %>\n                                    历史信息\n                                <% } %>\n                            <% if (last_page_link_title !== \'\') { %>\n                                    <em class="link-to-title-text"><%- last_page_link_title %></em>\n                                </span>\n                            </a>\n                            <% } else { %>\n                                </span>\n                            <% } %>\n                            <a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除">×</a>\n                        </div>\n                        <div class="dropdown hover pull-right">\n                            <a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>\n                            <%= dropdown_menu() %>\n                        </div>\n                    </div>\n\n                <% } else { %>\n                    <div class="dropdown hover">\n                        <a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:void(0);">设置链接到的页面地址 <i class="caret"></i></a>\n                        <%= dropdown_menu() %>\n                    </div>\n                <% } %>\n            </div>\n        </div>\n    </div>\n</div>\n\n'
}),define("components/showcase/2.0.0/scroll/views/edit_last_page", ["require", "underscore", "jquery", "components/showcase/2.0.0/base/views/edit_base", "components/image/2.0.0/app", "components/pop/atom/link", "components/modal/1.0.0/modal", "text!components/public_template/dropdown_menu.html", "text!components/showcase/2.0.0/scroll/templates/edit_last_page.html", "core/utils"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("components/showcase/2.0.0/base/views/edit_base"), s = e("components/image/2.0.0/app"), o = e("components/pop/atom/link"), a = e("components/modal/1.0.0/modal"), l = e("text!components/public_template/dropdown_menu.html"), c = e("text!components/showcase/2.0.0/scroll/templates/edit_last_page.html"), r = e("core/utils");
    return i.extend({
        className: "custom-scroll-page",
        template: t.template(c),
        dropdownTpl: t.template(l),
        templateHelpers: function () {
            return {fullfillImage: r.fullfillImage, dropdown_menu: this.dropdownTpl}
        },
        events: {
            "click .js-last-page-image": "handleImageClick",
            "click .js-modal-magazine, .js-modal-goods, .js-modal-activity, .js-modal-survey": "chooseLink",
            "click .js-modal-history, .js-modal-homepage, .js-modal-usercenter": "chooseStaticLink",
            "click .js-modal-links": "chooseOtherLink",
            "click .js-delete-link": "deleteLink"
        },
        modelEvents: {"change:last_page_image_url": "render", "change:last_page_link_url": "render"},
        bindValidation: function () {
        },
        handleImageClick: function () {
            var e = this;
            s.initialize({
                multiChoose: !1, callback: function (t) {
                    t = t[0], e.model.set({
                        last_page_image_id: t.attachment_id,
                        last_page_image_url: t.attachment_url,
                        last_page_image_thumb_url: t.thumb_url,
                        last_page_image_width: Number(t.width),
                        last_page_image_height: Number(t.height)
                    })
                }
            })
        },
        chooseLink: function (e) {
            var t = this, i = n(e.target).data("type");
            a.initialize({type: i}).setChooseItemCallback(function (e) {
                t.model.set({
                    last_page_link_id: e.data_id,
                    last_page_link_type: e.type,
                    last_page_link_title: e.data_title,
                    last_page_link_url: e.data_url
                })
            }).modal("show")
        },
        chooseStaticLink: function (e) {
            var t = n(e.target).data("type"), i = this;
            r.getStaticUrl(t, function (e) {
                i.model.set({
                    last_page_link_id: "",
                    last_page_link_type: t,
                    last_page_link_title: "",
                    last_page_link_url: e
                })
            })
        },
        chooseOtherLink: function (e) {
            var t, i = this;
            t = this.$(this.$(".js-link-to").length > 0 ? ".js-link-to" : ".js-dropdown-toggle");
            var s = e.target;
            o.initialize({
                target: t, trigger: n(s), callback: function (e) {
                    i.model.set({
                        last_page_link_id: "",
                        last_page_link_type: "link",
                        last_page_link_title: e,
                        last_page_link_url: e
                    })
                }
            })
        },
        deleteLink: function () {
            this.model.set({
                last_page_link_id: "",
                last_page_link_type: "",
                last_page_link_title: "",
                last_page_link_url: ""
            })
        }
    })
}),define("text!components/showcase/2.0.0/scroll/templates/edit_item.html", [], function () {
    return '<div class="choice-image-box">\n    <% if(image_url) { %>\n        <div class="image-box">\n            <img src="<%= fullfillImage(image_url, \'!140x140+2x.jpg\') %>" class="image">\n            <a href="javascript:;" class="modify-image js-page-image">重新上传</a>\n        </div>\n    <% } else { %>\n        <a href="javascript:;" class="add-image js-page-image"><i class="icon-add"></i> 添加图片</a>\n        <div class="control-group">\n            <div class="controls">\n                <input type="hidden" name="image_url">\n            </div>\n        </div>\n    <% } %>\n</div>\n<div class="choice-content">\n    <div class="control-group">\n        <label class="control-label">链接：</label>\n        <div class="controls">\n            <% if (link_type != \'\') { %>\n                <div class="control-action clearfix">\n                    <div class="pull-left js-link-to link-to">\n                        <% if (link_title !== \'\') { %>\n                        <a href="<%= link_url %>" target="_blank" class="new-window link-to-title">\n                        <% } %>\n\n                        <span class="label label-success">\n                            <% if (link_type === \'feature\') { %>\n                                微页面\n                            <% } else if (link_type === \'category\') { %>\n                                微页面分类\n                            <% } else if (link_type === \'topic\') { %>\n                                专题\n                            <% } else if (link_type === \'article\') { %>\n                                资讯\n                            <% } else if (link_type === \'goods\') { %>\n                                商品\n                            <% } else if (link_type === \'tag\') { %>\n                                商品标签\n                            <% } else if (link_type === \'activity\') { %>\n                                营销活动\n                            <% } else if (link_type === \'survey\') { %>\n                                调查\n                            <% } else if (link_type === \'homepage\') { %>\n                                店铺主页\n                            <% } else if (link_type === \'usercenter\') { %>\n                                会员主页\n                            <% } else if (link_type === \'link\') { %>\n                                外链\n                            <% } else if (link_type === \'history\') { %>\n                                历史信息\n                            <% } %>\n                        <% if (link_title !== \'\') { %>\n                                <em class="link-to-title-text"><%- link_title %></em>\n                            </span>\n                        </a>\n                        <% } else { %>\n                            </span>\n                        <% } %>\n                        <a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除">×</a>\n                    </div>\n                    <div class="dropdown hover pull-right">\n                        <a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>\n                        <%= dropdown_menu() %>\n                    </div>\n                </div>\n\n            <% } else { %>\n                <div class="dropdown hover">\n                    <a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:void(0);">设置链接到的页面地址 <i class="caret"></i></a>\n                    <%= dropdown_menu() %>\n                </div>\n            <% } %>\n        </div>\n    </div>\n    <div class="control-group">\n        <div class="controls">\n            <div class="control-action">\n                <a href="javascript:;" class="js-pop-anm-editor">设置动画</a>\n            </div>\n        </div>\n    </div>\n</div>\n<div class="actions">\n    <span class="action delete close-modal" title="删除">×</span>\n</div>\n'
}),define("text!components/showcase/2.0.0/scroll/templates/anm_workstation.html", [], function () {
    return '<ul class="choices js-elem-list"></ul>\n<div class="ui-box">\n    <a href="javascript:;" class="add-option js-add-elem"><i class="icon-add"></i> 添加元素</a>\n</div>\n'
}),define("components/showcase/2.0.0/scroll/models/anm_item", ["require", "components/showcase/2.0.0/base/models/base"], function (e) {
    var t = e("components/showcase/2.0.0/base/models/base"), n = t.extend({
        defaults: function () {
            return {
                width: "",
                height: "",
                x: 0,
                y: 0,
                duration: 1,
                delay: 0,
                anm_style: "fadeIn",
                image_id: "",
                image_url: "",
                image_thumb_url: ""
            }
        }, validation: {}, initialize: function () {
            void 0 == this.get("naturalHeight") && this.set("naturalHeight", this.get("height")), void 0 == this.get("naturalWidth") && this.set("naturalWidth", this.get("width")), this.listenTo(this, "change:width", function (e, t) {
                var n = this._previousAttributes.width;
                if (isNaN(Number(t)))return this.set({width: n}, {silent: !0}), void this.trigger("render");
                var i = this.get("naturalHeight"), s = this.get("naturalWidth");
                this.set({height: ~~(i * (t / s))}, {silent: !0}), this.trigger("render")
            }), this.listenTo(this, "change:height", function (e, t) {
                var n = this._previousAttributes.height;
                if (isNaN(Number(t)))return this.set({height: n}, {silent: !0}), void this.trigger("render");
                var i = this.get("naturalHeight"), s = this.get("naturalWidth");
                this.set({width: ~~(s * (t / i))}, {silent: !0}), this.trigger("render")
            }), this.validNumber(["x", "y", "duration", "delay"])
        }, validNumber: function (e) {
            var t = this;
            return e instanceof Array ? e.forEach(function (e) {
                t.validNumber(e)
            }) : void this.listenTo(this, "change:" + e, function (t, n) {
                var i = this._previousAttributes[e], s = {};
                n = Number(n), isNaN(n) && (s[e] = i, this.set(s, {silent: !0}), this.trigger("render"))
            })
        }
    });
    return n
}),define("components/showcase/2.0.0/scroll/collections/anms", ["require", "backbone", "components/showcase/2.0.0/scroll/models/anm_item"], function (e) {
    var t = e("backbone"), n = e("components/showcase/2.0.0/scroll/models/anm_item");
    return t.Collection.extend({
        model: n, toJSON: function () {
            var e = t.Collection.prototype.toJSON.apply(this, arguments);
            return e.filter(function (e) {
                return !!e.image_url
            })
        }
    })
}),define("text!components/showcase/2.0.0/scroll/templates/anm_item.html", [], function () {
    return '<div class="pull-left">\n    <%if(image_url){%>\n        <div class="image-box">\n            <img src="<%= fullfillImage(image_url) %>">\n            <a href="javascript:;" class="modify-image js-upload-image">重新上传</a>\n        </div>\n    <%} else {%>\n        <a href="javascript:;" class="add-image js-upload-image"><i class="icon-add"></i>添加图片</a>\n    <%}%>\n</div>\n\n\n<div class="anm-elem-form">\n    <div class="form-inline ui-box">\n        <span class="form-inline-label">宽</span>\n        <input type="text" class="input-mini" name="width" value="<%= width %>" maxlength="3" >\n        <span class="form-inline-label">高</span>\n        <input type="text" class="input-mini" name="height" value="<%= height %>" maxlength="3" >\n    </div>\n    \n    <div class="form-horizontal">\n        <div class="control-group">\n            <label class="control-label">横向位置：</label>\n            <div class="controls">\n                <input type="text" class="input-mini" name="x" value="<%= x %>" maxlength="3">\n            </div>\n        </div>\n        <div class="control-group">\n            <label class="control-label">纵向位置：</label>\n            <div class="controls">\n                <input type="text" class="input-mini" name="y" value="<%= y %>" maxlength="3">\n            </div>\n        </div>\n        <div class="control-group">\n            <label class="control-label">动画效果：</label>\n            <div class="controls">\n                <select name="anm_style" class="input-small">\n                    <option value="-1">无</option>\n                    <option value="fadeIn">淡入</option>\n                    <option value="drop">下坠</option>\n                    <option value="float">上浮</option>\n                    <option value="leftin">左入</option>\n                    <option value="rightin">右入</option>\n                </select>\n            </div>\n        </div>\n\n        <div class="control-group">\n            <label class="control-label">开始时间：</label>\n            <div class="controls">\n                <input type="text" class="input-mini" name="delay" value="<%= delay %>" maxlength="3"> 秒\n            </div>\n        </div>\n        <div class="control-group">\n            <label class="control-label">动画持续：</label>\n            <div class="controls">\n                <input type="text" class="input-mini" name="duration" value="<%= duration %>" maxlength="3"> 秒\n            </div>\n        </div>\n    </div>\n\n</div>\n\n\n<div class="actions">\n    <span class="action delete close-modal js-delete" title="删除">×</span>\n</div>'
}),define("components/showcase/2.0.0/scroll/views/anm_item", ["require", "components/showcase/2.0.0/base/views/edit_base", "text!components/showcase/2.0.0/scroll/templates/anm_item.html", "components/image/2.0.0/app", "core/utils"], function (e) {
    var t = e("components/showcase/2.0.0/base/views/edit_base"), n = e("text!components/showcase/2.0.0/scroll/templates/anm_item.html"), i = e("components/image/2.0.0/app"), s = e("core/utils");
    return t.extend({
        events: {
            "change :input": "updateModel",
            "click .js-delete": "deleteSelf",
            "click .js-upload-image": "addImage",
            mouseover: "onMouseover",
            mouseout: "onMouseout"
        }, tagName: "li", className: "anm-elem", template: _.template(n), onInit: function () {
            this.listenTo(this.model, "render", this.render), this.listenTo(this.model, "hover", this.toggleHover)
        }, bindValidation: function () {
        }, onRender: function () {
            var e = this.model;
            this.$("select").each(function () {
                var t = this.name;
                $(this).val(e.get(t))
            })
        }, templateHelpers: {fullfillImage: s.fullfillImage}, deleteSelf: function () {
            this.model.destroy()
        }, addImage: function () {
            var e = this;
            i.initialize({
                multiChoose: !1, callback: function (t) {
                    t = t[0];
                    var n = e.handleWH(t.width, t.height);
                    e.model.set({
                        image_id: t.attachment_id,
                        image_url: t.attachment_url,
                        image_thumb_url: t.thumb_url,
                        width: n.width,
                        height: n.height,
                        naturalWidth: t.width,
                        naturalHeight: t.height
                    }, {silent: !0}), e.model.trigger("render")
                }
            })
        }, handleWH: function (e, t) {
            return t = ~~(60 * t / e), e = 60, {width: e, height: t}
        }, onMouseover: function () {
            this.model.trigger("hover", !0)
        }, onMouseout: function () {
            this.model.trigger("hover", !1)
        }, toggleHover: function (e) {
            this.$el.toggleClass("anm-hover", e)
        }
    })
}),define("components/showcase/2.0.0/scroll/views/anm_workstation", ["require", "marionette", "text!components/showcase/2.0.0/scroll/templates/anm_workstation.html", "components/showcase/2.0.0/scroll/collections/anms", "components/showcase/2.0.0/scroll/views/anm_item", "core/utils"], function (e) {
    var t = e("marionette"), n = e("text!components/showcase/2.0.0/scroll/templates/anm_workstation.html"), i = e("components/showcase/2.0.0/scroll/collections/anms"), s = e("components/showcase/2.0.0/scroll/views/anm_item"), o = e("core/utils");
    return t.CompositeView.extend({
        className: "anm-editor-workstation app-design",
        template: _.template(n),
        events: {"click .js-add-elem": "addElem", mousewheel: o.handleScroll},
        itemViewContainer: ".js-elem-list",
        itemView: s,
        initialize: function () {
            var e = this.model.get("anms");
            this.collection = new i, void 0 != e && this.collection.reset(e instanceof i ? e.models : e), this.model.set("anms", this.collection)
        },
        addElem: function () {
            this.collection.push({})
        }
    })
}),define("components/showcase/2.0.0/scroll/views/anm_preview_item", ["require", "marionette", "core/utils"], function (e) {
    var t = e("marionette"), n = e("core/utils");
    return t.ItemView.extend({
        className: "anm-item-preview",
        template: _.template('<div class="js-resize anm-item-resize"></div>'),
        events: {mouseover: "onMouseover", mouseout: "onMouseout"},
        initialize: function () {
            var e = this;
            this.listenTo(this.model, "change", this.render), this.listenTo(this.model, "render", this.render), this.listenTo(this.model, "hover", function (t) {
                e.$el.toggleClass("anm-hover", t)
            }), this.initDragAndResize()
        },
        onRender: function () {
            var e = this.model.toJSON();
            e.image_url && this.$el.css({
                top: ~~e.y,
                left: ~~e.x,
                backgroundImage: "url(" + n.fullfillImage(e.image_url) + ")",
                width: ~~e.width,
                height: ~~e.height
            })
        },
        onMouseover: function () {
            this.model.trigger("hover", !0)
        },
        onMouseout: function () {
            this.model.trigger("hover", !1)
        },
        initDragAndResize: function () {
            var e = !1, t = this, n = this.resize.bind(this), i = $(window);
            this.$el.draggable({containment: "parent"}).on("mousedown", function (t) {
                $(t.target).hasClass("js-resize") && (e = !0, i.unbind("mousemove", n), i.one("mouseup", function () {
                    e = !1, i.unbind("mousemove", n)
                }).on("mousemove", n))
            }).on("dragstart", function (n) {
                return e ? !1 : void(t.resizeStart = null)
            }).on("dragstop", function () {
                var e = $(this).position();
                t.model.set("x", e.left).set("y", e.top).trigger("render")
            }).css("position", "absolute").resizable()
        },
        resize: function (e) {
            return null == this.resizeStart ? (this.resizeStart = {
                x: e.clientX,
                y: e.clientY
            }, void(this.originSize = {
                w: this.$el.width(),
                h: this.$el.height()
            })) : void this.model.set("width", this.originSize.w + e.clientX - this.resizeStart.x).trigger("render")
        }
    })
}),define("components/showcase/2.0.0/scroll/views/anm_preview", ["require", "marionette", "components/showcase/2.0.0/scroll/collections/anms", "components/showcase/2.0.0/scroll/views/anm_preview_item"], function (e) {
    var t = e("marionette"), n = (e("components/showcase/2.0.0/scroll/collections/anms"), e("components/showcase/2.0.0/scroll/views/anm_preview_item"));
    return t.CollectionView.extend({
        className: "anm-editor-preview", itemView: n, initialize: function () {
            this.collection = this.model.get("anms")
        }
    })
}),define("text!components/showcase/2.0.0/scroll/templates/anm_editor.html", [], function () {
    return '<div class="modal-header">\n    <!-- <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> -->\n    <h3>动画编辑</h3>\n</div>\n<div class="modal-body">\n    <div class="anm-editor-preview-wrap" style="background-image: url(<%= fullfillImage(image_url) %>!640x320.jpg)">\n        <div class="js-anm-preview"></div>\n    </div>\n    <div class="anm-editor-workstation-wrap js-workstation">\n    </div>\n</div>\n<div class="modal-footer">\n    <a href="javascript:;" class="btn btn-primary" data-dismiss="modal">确定</a>\n</div>'
}),define("components/showcase/2.0.0/scroll/views/anm_editor", ["require", "components/showcase/2.0.0/base/views/edit_base", "components/showcase/2.0.0/scroll/views/anm_workstation", "components/showcase/2.0.0/scroll/views/anm_preview", "text!components/showcase/2.0.0/scroll/templates/anm_editor.html", "core/utils"], function (e) {
    var t = e("components/showcase/2.0.0/base/views/edit_base"), n = e("components/showcase/2.0.0/scroll/views/anm_workstation"), i = e("components/showcase/2.0.0/scroll/views/anm_preview"), s = e("text!components/showcase/2.0.0/scroll/templates/anm_editor.html"), o = e("core/utils");
    return t.extend({
        className: "modal fade hide anm-editor",
        template: _.template(s),
        regions: {workRegion: ".js-workstation", previewRegion: ".js-anm-preview"},
        events: {hidden: "close"},
        templateHelpers: {fullfillImage: o.fullfillImage},
        bindValidation: function () {
        },
        onRender: function () {
            this.$el.modal("show"), this.workRegion.show(new n({model: this.model})), this.previewRegion.show(new i({model: this.model}))
        },
        close: function () {
            this.remove()
        }
    })
}),define("components/showcase/2.0.0/scroll/views/edit_item", ["require", "underscore", "jquery", "components/showcase/2.0.0/base/views/edit_base", "text!components/showcase/2.0.0/scroll/templates/edit_item.html", "text!components/public_template/dropdown_menu.html", "components/pop/atom/link", "components/modal/1.0.0/modal", "components/image/2.0.0/app", "components/showcase/2.0.0/scroll/views/anm_editor", "core/utils"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("components/showcase/2.0.0/base/views/edit_base"), s = e("text!components/showcase/2.0.0/scroll/templates/edit_item.html"), o = e("text!components/public_template/dropdown_menu.html"), a = e("components/pop/atom/link"), l = e("components/modal/1.0.0/modal"), c = e("components/image/2.0.0/app"), r = e("components/showcase/2.0.0/scroll/views/anm_editor"), d = e("core/utils");
    return i.extend({
        tagName: "li",
        className: "choice",
        template: t.template(s),
        dropdownTpl: t.template(o),
        templateHelpers: function () {
            return {fullfillImage: d.fullfillImage, dropdown_menu: this.dropdownTpl}
        },
        events: {
            'blur input[type="text"]': "updateModel",
            "click .actions .delete": "delete",
            "click .js-page-image": "chooseImage",
            "click .js-modal-magazine, .js-modal-goods, .js-modal-activity, .js-modal-survey": "chooseLink",
            "click .js-modal-history, .js-modal-homepage, .js-modal-usercenter": "chooseStaticLink",
            "click .js-modal-links": "chooseOtherLink",
            "click .js-delete-link": "deleteLink",
            "click .js-pop-anm-editor": "popAnmEditor"
        },
        onInit: function (e) {
            this.parent = e.parent || {}, this.listenTo(this.model, "change", this.render)
        },
        bindValidation: function () {
        },
        chooseImage: function () {
            var e = this;
            c.initialize({
                multiChoose: !1, callback: function (t) {
                    t = t[0], e.model.set({
                        image_id: t.attachment_id,
                        image_url: t.attachment_url,
                        image_thumb_url: t.thumb_url,
                        image_width: Number(t.width),
                        image_height: Number(t.height)
                    })
                }
            })
        },
        chooseLink: function (e) {
            var t = this, i = n(e.target).data("type");
            l.initialize({type: i}).setChooseItemCallback(function (e) {
                t.model.set({link_id: e.data_id, link_type: e.type, link_title: e.data_title, link_url: e.data_url})
            }).modal("show")
        },
        chooseStaticLink: function (e) {
            var t = n(e.target).data("type"), i = this;
            d.getStaticUrl(t, function (e) {
                i.model.set({link_id: "", link_type: t, link_title: "", link_url: e})
            })
        },
        chooseOtherLink: function (e) {
            var t, i = this;
            t = this.$(this.$(".js-link-to").length > 0 ? ".js-link-to" : ".js-dropdown-toggle");
            var s = e.target;
            a.initialize({
                target: t, trigger: n(s), callback: function (e) {
                    i.model.set({link_id: "", link_type: "link", link_title: e, link_url: e})
                }
            })
        },
        deleteLink: function () {
            this.model.set({link_id: "", link_type: "", link_title: "", link_url: ""})
        },
        "delete": function () {
            this.model.destroy()
        },
        popAnmEditor: function () {
            var e = new r({model: this.model});
            e.render()
        }
    })
}),define("components/showcase/2.0.0/scroll/views/edit_collection", ["require", "components/showcase/2.0.0/base/views/edit_collection_base", "components/showcase/2.0.0/scroll/views/edit_item"], function (e) {
    var t = e("components/showcase/2.0.0/base/views/edit_collection_base"), n = e("components/showcase/2.0.0/scroll/views/edit_item");
    return t.extend({
        itemView: n, onShow: function () {
            this.sortable()
        }
    })
}),define("text!components/showcase/2.0.0/scroll/templates/edit.html", [], function () {
    return '\n<form class="form-horizontal custom-scroll" novalidate>\n    <div class="js-meta-region"></div>\n\n    <div class="custom-scroll-pages">\n        <p class="">图片尺寸要求：640*1010 像素；建议每张图不超过200KB</p>\n\n        <div class="js-first-page-region"></div>\n\n        <div class="custom-scroll-page">\n            <h4>过场页面</h4>\n            <div class="js-pages-region">\n            </div>\n            <div class="js-options options">\n                <a href="javascript:;" class="add-option js-add-page"><i class="icon-add"></i> 添加一页</a>\n            </div>\n        </div>\n\n        <div class="js-last-page-region"></div>\n    </div>\n</form>\n'
}),define("components/showcase/2.0.0/scroll/views/edit", ["require", "underscore", "components/showcase/2.0.0/base/views/edit_base", "components/showcase/2.0.0/scroll/views/edit_meta", "components/showcase/2.0.0/scroll/views/edit_first_page", "components/showcase/2.0.0/scroll/views/edit_last_page", "components/showcase/2.0.0/scroll/views/edit_collection", "text!components/showcase/2.0.0/scroll/templates/edit.html"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/edit_base"), i = e("components/showcase/2.0.0/scroll/views/edit_meta"), s = e("components/showcase/2.0.0/scroll/views/edit_first_page"), o = e("components/showcase/2.0.0/scroll/views/edit_last_page"), a = e("components/showcase/2.0.0/scroll/views/edit_collection"), l = e("text!components/showcase/2.0.0/scroll/templates/edit.html");
    return n.extend({
        template: t.template(l),
        regions: {
            metaRegion: ".js-meta-region",
            firstPageRegion: ".js-first-page-region",
            pagesRegion: ".js-pages-region",
            lastPageRegion: ".js-last-page-region"
        },
        events: {"click .js-add-page": "addPage"},
        onInit: function () {
            this.listenTo(this.model.get("sub_entry"), "reset add remove", this.toggleOptions)
        },
        onRender: function () {
            this.metaRegion.show(new i({model: this.model})), this.firstPageRegion.show(new s({model: this.model})), this.lastPageRegion.show(new o({model: this.model})), this.pagesRegion.show(new a({collection: this.model.get("sub_entry")})), this.toggleOptions()
        },
        addPage: function () {
            this.model.get("sub_entry").add({})
        },
        toggleOptions: function () {
            this.model.get("sub_entry").length >= 30 ? this.$(".js-options").hide() : this.$(".js-options").show()
        }
    })
}),define("text!components/showcase/2.0.0/scroll_nav/templates/edit.html", [], function () {
    return '<form class="form-horizontal custom-scroll edit-scroll-nav" novalidate style="padding: 0 10px; width: auto;">\n    <div class="control-group clearfix">\n        <label class="control-label" style="text-align: left; width: auto;">主页图标：</label>\n        <div class="controls pull-left" style="margin-left: 0;">\n            <label class="checkbox inline">\n                <input type="checkbox" name="homepage_icon" <%= homepage_icon==\'1\' ? \'checked\' : \'\' %>>\n                显示店铺主页图标，用户点击后进入店铺主页\n            </label>\n        </div>\n    </div>\n\n    <div class="split-line"></div>\n    <div class="control-group control-group-block">\n        <label class="control-label">背景图片</label>\n        <div class="controls">\n            <p class="help-desc" style="margin-bottom: 20px;">尺寸要求：640*1010 像素；可以添加多张，每次打开页面时，系统随机选择一张</p>\n\n            <div class="background-images">\n                <% _.each(background_images, function(image, index) { %>\n                    <div class="image-box" data-index="<%= index %>">\n                        <img src="<%= fullfillImage(image.url, \'!140x140+2x.jpg\') %>" alt="">\n                        <span class="close-modal js-delete-backgorund-image" title="删除">×</span>\n                    </div>\n                <% }); %>\n            </div>\n\n            <a href="javascript:;" class="add-image js-add-background-image"><i class="icon-add"></i> 添加图片</a>\n            <input type="hidden" name="background_images">\n        </div>\n    </div>\n\n    <div class="split-line"></div>\n    <div class="control-group control-group-block">\n        <label class="control-label">前景导航</label>\n\n        <div class="controls">\n            <p class="help-desc" style="margin-bottom: 20px;">建议图片尺寸：800*230像素</p>\n\n            <div class="js-collection-region custom-scroll-page ">\n\n            </div>\n\n            <div class="js-options options" style="margin: 0;">\n                <a href="javascript:;" class="add-option js-add-module"><i class="icon-add"></i> 添加一个模块</a>\n            </div>\n        </div>\n    </div>\n\n    <div class="split-line"></div>\n    <div class="control-group control-group-block">\n        <label class="control-label">前景导航样式</label>\n\n        <div class="controls nav-styles">\n            <label class="radio inline">\n                <input name="nav_style" value="left" type="radio" <%= nav_style == \'left\'? \'checked\' : \'\' %>>向左倾斜\n            </label>\n            <label class="radio inline">\n                <input name="nav_style" value="normal" type="radio" <%= nav_style == \'normal\'? \'checked\' : \'\' %>>正常\n            </label>\n            <label class="radio inline">\n                <input name="nav_style" value="right" type="radio" <%= nav_style == \'right\'? \'checked\' : \'\' %>>向右倾斜\n            </label>\n        </div>\n    </div>\n\n    <div class="split-line"></div>\n    <div class="control-group control-group-block">\n        <label class="control-label">前景显现动画</label>\n\n        <div class="controls">\n            <label class="radio inline">\n                <input type="radio" name="animate" value="zoom" <%= animate == \'zoom\' ? \'checked\' : \'\' %>>正常\n            </label>\n            <select class="span2" name="zoom_type" style="margin-right: 40px;">\n                <option value="zoom_out" <%= zoom_type == \'zoom_out\' ? \'selected\' : \'\' %>>缩小渐现</option>\n                <option value="zoom_in" <%= zoom_type == \'zoom_in\' ? \'selected\' : \'\' %>>放大渐现</option>\n            </select>\n            <label class="radio inline">\n                <input type="radio" name="animate" value="slide" <% if(animate == \'slide\') { %>checked<% }%>>滑入\n            </label>\n            <select class="span2" name="slide_type">\n                <option value="slide_left" <%= slide_type == \'slide_left\' ? \'selected\' : \'\' %>>从左侧滑入</option>\n                <option value="slide_right" <%= slide_type == \'slide_right\' ? \'selected\' : \'\' %>>从右侧滑入</option>\n            </select>\n        </div>\n    </div>\n</form>\n'
}),define("text!components/showcase/2.0.0/scroll_nav/templates/edit_item.html", [], function () {
    return '<div class="choice-image-box">\n    <% if(image_url) { %>\n        <div class="image-box">\n            <img src="<%= fullfillImage(image_url, \'!140x140+2x.jpg\') %>" class="image">\n            <a href="javascript:;" class="modify-image js-page-image">重新上传</a>\n        </div>\n    <% } else { %>\n        <a href="javascript:;" class="add-image js-page-image"><i class="icon-add"></i> 添加图片</a>\n        <div class="control-group">\n            <div class="controls">\n                <input type="hidden" name="image_url">\n            </div>\n        </div>\n    <% } %>\n</div>\n<div class="choice-content">\n    <div class="control-group">\n        <label class="control-label">标题：</label>\n        <div class="controls">\n            <input class="" type="text" name="title" value="<%= title %>">\n        </div>\n    </div>\n    <div class="control-group">\n            <label class="control-label">副标题：</label>\n            <div class="controls">\n                <input class="" type="text" name="sub_title" value="<%= sub_title %>">\n            </div>\n        </div>\n    <div class="control-group">\n        <label class="control-label">链接：</label>\n        <div class="controls">\n            <% if (link_type != \'\') { %>\n                <div class="control-action clearfix">\n                    <div class="pull-left js-link-to link-to">\n                        <% if (link_title !== \'\') { %>\n                        <a href="<%= link_url %>" target="_blank" class="new-window link-to-title">\n                        <% } %>\n\n                        <span class="label label-success">\n                            <% if (link_type === \'feature\') { %>\n                                微页面\n                            <% } else if (link_type === \'category\') { %>\n                                微页面分类\n                            <% } else if (link_type === \'topic\') { %>\n                                专题\n                            <% } else if (link_type === \'article\') { %>\n                                资讯\n                            <% } else if (link_type === \'goods\') { %>\n                                商品\n                            <% } else if (link_type === \'tag\') { %>\n                                商品标签\n                            <% } else if (link_type === \'activity\') { %>\n                                营销活动\n                            <% } else if (link_type === \'survey\') { %>\n                                调查\n                            <% } else if (link_type === \'homepage\') { %>\n                                店铺主页\n                            <% } else if (link_type === \'usercenter\') { %>\n                                会员主页\n                            <% } else if (link_type === \'link\') { %>\n                                外链\n                            <% } else if (link_type === \'history\') { %>\n                                历史信息\n                            <% } %>\n                        <% if (link_title !== \'\') { %>\n                                <em class="link-to-title-text"><%- link_title %></em>\n                            </span>\n                        </a>\n                        <% } else { %>\n                            </span>\n                        <% } %>\n                        <a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除">×</a>\n                    </div>\n                    <div class="dropdown hover pull-right">\n                        <a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>\n                        <%= dropdown_menu() %>\n                    </div>\n                </div>\n\n            <% } else { %>\n                <div class="dropdown hover">\n                    <a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:void(0);">设置链接到的页面地址 <i class="caret"></i></a>\n                    <%= dropdown_menu() %>\n                </div>\n            <% } %>\n        </div>\n    </div>\n</div>\n<% if(index != 0 && index != 1) { %>\n<div class="actions">\n    <span class="action delete close-modal" title="删除">×</span>\n</div>\n<% } %>\n'
}),define("components/showcase/2.0.0/scroll_nav/views/edit_item", ["require", "underscore", "jquery", "components/showcase/2.0.0/base/views/edit_base", "text!components/showcase/2.0.0/scroll_nav/templates/edit_item.html", "text!components/public_template/dropdown_menu.html", "components/pop/atom/link", "components/modal/1.0.0/modal", "components/image/2.0.0/app", "core/utils"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("components/showcase/2.0.0/base/views/edit_base"), s = e("text!components/showcase/2.0.0/scroll_nav/templates/edit_item.html"), o = e("text!components/public_template/dropdown_menu.html"), a = e("components/pop/atom/link"), l = e("components/modal/1.0.0/modal"), c = e("components/image/2.0.0/app"), r = e("core/utils");
    return i.extend({
        tagName: "li",
        className: "choice",
        template: t.template(s),
        dropdownTpl: t.template(o),
        templateHelpers: function () {
            var e = this.layout.model.get("sub_entry").indexOf(this.model);
            return {fullfillImage: r.fullfillImage, dropdown_menu: this.dropdownTpl, index: e}
        },
        events: {
            'blur input[name="title"]': "updateModel",
            'blur input[name="sub_title"]': "updateModel",
            "click .actions .delete": "delete",
            "click .js-page-image": "chooseImage",
            "click .js-modal-magazine, .js-modal-goods, .js-modal-activity, .js-modal-survey": "chooseLink",
            "click .js-modal-history, .js-modal-homepage, .js-modal-usercenter": "chooseStaticLink",
            "click .js-modal-links": "chooseOtherLink",
            "click .js-delete-link": "deleteLink"
        },
        onInit: function (e) {
            this.parent = e.parent || {}, this.listenTo(this.model, "change", this.render)
        },
        chooseImage: function () {
            var e = this;
            c.initialize({
                multiChoose: !1, callback: function (t) {
                    t = t[0], e.model.set({
                        image_id: t.attachment_id,
                        image_url: t.attachment_url,
                        image_thumb_url: t.thumb_url,
                        image_width: Number(t.width),
                        image_height: Number(t.height)
                    })
                }
            })
        },
        chooseLink: function (e) {
            var t = this, i = n(e.target).data("type");
            l.initialize({type: i}).setChooseItemCallback(function (e) {
                t.model.set({link_id: e.data_id, link_type: e.type, link_title: e.data_title, link_url: e.data_url})
            }).modal("show")
        },
        chooseStaticLink: function (e) {
            var t = n(e.target).data("type"), i = this;
            r.getStaticUrl(t, function (e) {
                i.model.set({link_id: "", link_type: t, link_title: "", link_url: e})
            })
        },
        chooseOtherLink: function (e) {
            var t, i = this;
            t = this.$(this.$(".js-link-to").length > 0 ? ".js-link-to" : ".js-dropdown-toggle");
            var s = e.target;
            a.initialize({
                target: t, trigger: n(s), callback: function (e) {
                    i.model.set({link_id: "", link_type: "link", link_title: e, link_url: e})
                }
            })
        },
        deleteLink: function () {
            this.model.set({link_id: "", link_type: "", link_title: "", link_url: ""})
        },
        "delete": function () {
            this.model.destroy()
        }
    })
}),define("components/showcase/2.0.0/scroll_nav/views/edit_collection", ["require", "components/showcase/2.0.0/base/views/edit_collection_base", "components/showcase/2.0.0/scroll_nav/views/edit_item"], function (e) {
    var t = e("components/showcase/2.0.0/base/views/edit_collection_base"), n = e("components/showcase/2.0.0/scroll_nav/views/edit_item");
    return t.extend({
        itemView: n, initialize: function (e) {
            this.options = e || {}
        }, onShow: function () {
            this.sortable()
        }
    })
}),define("components/showcase/2.0.0/scroll_nav/views/edit", ["require", "underscore", "components/showcase/2.0.0/base/views/edit_base", "text!components/showcase/2.0.0/scroll_nav/templates/edit.html", "components/showcase/2.0.0/scroll_nav/views/edit_collection", "components/image/2.0.0/app", "core/utils"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/edit_base"), i = e("text!components/showcase/2.0.0/scroll_nav/templates/edit.html"), s = e("components/showcase/2.0.0/scroll_nav/views/edit_collection"), o = e("components/image/2.0.0/app"), a = e("core/utils");
    return n.extend({
        template: t.template(i),
        templateHelpers: {fullfillImage: a.fullfillImage},
        regions: {collectionRegion: ".js-collection-region"},
        events: {
            'change input[name="homepage_icon"]': "updateModel",
            'change input[name="nav_style"]': "updateModel",
            'change input[name="animate"]': "updateModel",
            'change input[name="zoom"]': "updateModel",
            'change select[name="zoom_type"]': "updateModel",
            'change select[name="slide_type"]': "updateModel",
            "click .js-add-background-image": "addBackgroundImage",
            "click .js-delete-backgorund-image": "deleteBackgroundImage",
            "click .js-add-module": "addModule"
        },
        modelEvents: {"change:background_images": "render"},
        onInit: function () {
            this.listenTo(this.model.get("sub_entry"), "reset add remove", this.toggleOptions)
        },
        onRender: function () {
            this.collectionRegion.show(new s({
                collection: this.model.get("sub_entry"),
                layout: this
            })), this.toggleOptions()
        },
        addModule: function () {
            this.model.get("sub_entry").add({})
        },
        addBackgroundImage: function () {
            var e = this, n = e.model.get("background_images") || [];
            o.initialize({
                multiChoose: !0, callback: function (i) {
                    t.each(i, function (e) {
                        n.push({
                            id: e.attachment_id,
                            url: e.attachment_url,
                            thumb_url: e.thumb_url,
                            width: +e.width,
                            height: +e.height
                        })
                    }), e.model.set("background_images", n), e.model.trigger("change:background_images"), e.model.trigger("change")
                }
            })
        },
        deleteBackgroundImage: function (e) {
            var t = +$(e.target).parents(".image-box").data("index"), n = this.model.get("background_images") || [];
            n.splice(t, 1), this.model.set("background_images", n), this.model.trigger("change:background_images"), this.model.trigger("change")
        },
        toggleOptions: function () {
            this.model.get("sub_entry").length >= 40 ? this.$(".js-options").hide() : this.$(".js-options").show()
        }
    })
}),define("text!components/showcase/2.0.0/image_text/templates/edit.html", [], function () {
    return '<form class="form-horizontal" novalidate>\n\n    <div class="control-group">\n        <label>标题</label>\n        <input type="text" name="title" value="<%- title %>" data-error-style="block">\n    </div>\n\n    <div class="control-group">\n        <label>作者<span class="label-desc">（选填）</span></label>\n        <input type="text" name="author" value="<%- author %>" data-error-style="block">\n    </div>\n\n    <div class="control-group image-region js-image-region">\n\n    </div>\n\n    <div class="control-group">\n        <label class="checkbox">\n            <input type="checkbox" name="show_image" <% if (show_image == 1) { %>checked<% } %>>封面图片显示在正文中\n        </label>\n    </div>\n\n    <div class="control-group digest">\n        <label>摘要</label>\n        <textarea name="digest" cols="30" rows="3" data-error-style="block"><%- digest %></textarea>\n    </div>\n\n    <div class="control-group">\n        <label>正文</label>\n        <% if (is_fenxiao) { %>\n            <textarea name="content" data-error-style="block" class="js-editor"><%= content %></textarea>\n        <% } else {%>\n            <script class="js-editor" type="text/plain"></script>\n            <input type="hidden" name="content" data-error-style="block">\n        <% } %>\n    </div>\n\n    <div class="control-group js-link-region">\n\n    </div>\n</form>\n'
}),define("text!components/showcase/2.0.0/image_text/templates/edit_link.html", [], function () {
    return "<label>阅读原文</label>\n<% if (link_type != '') { %>\n<div class=\"control-action clearfix\">\n    <div class=\"pull-left js-link-to link-to\">\n        <% if (link_title !== '') { %>\n        <a href=\"<%= link_url %>\" target=\"_blank\" class=\"new-window link-to-title\">\n            <% } %>\n                <span class=\"label label-success\">\n                    <% if (link_type === 'feature') { %>\n                        微页面\n                    <% } else if (link_type === 'category') { %>\n                        微页面分类\n                    <% } else if (link_type === 'topic') { %>\n                        专题\n                    <% } else if (link_type === 'article') { %>\n                        资讯\n                    <% } else if (link_type === 'goods') { %>\n                        商品\n                    <% } else if (link_type === 'tag') { %>\n                        商品标签\n                    <% } else if (link_type === 'activity') { %>\n                        营销活动\n                    <% } else if (link_type === 'survey') { %>\n                        调查\n                    <% } else if (link_type === 'homepage') { %>\n                        店铺主页\n                    <% } else if (link_type === 'usercenter') { %>\n                        会员主页\n                    <% } else if (link_type === 'link') { %>\n                        外链\n                    <% } else if (link_type === 'history') { %>\n                        历史信息\n                    <% } %>\n                <% if (link_title !== '') { %>\n                        <em class=\"link-to-title-text\"><%= link_title %></em>\n                    </span>\n        </a>\n        <% } else { %>\n        </span>\n        <% } %>\n    </div>\n    <div class=\"dropup hover pull-right\">\n        <a class=\"dropdown-toggle\" href=\"javascript:void(0);\">修改 <i class=\"caret\"></i></a>\n        <%= dropdown_menu() %>\n    </div>\n</div>\n\n<% } else { %>\n<div class=\"dropup hover\">\n    <a class=\"js-dropdown-toggle dropdown-toggle control-action\" href=\"javascript:void(0);\">设置链接到的页面地址 <i class=\"caret\"></i></a>\n    <%= dropdown_menu() %>\n</div>\n<% } %>\n"
}),define("components/showcase/2.0.0/image_text/views/edit_link", ["require", "components/showcase/2.0.0/base/views/edit_base", "underscore", "components/modal/1.0.0/modal", "components/pop/atom/link", "text!components/public_template/dropdown_menu.html", "core/utils", "text!components/showcase/2.0.0/image_text/templates/edit_link.html"], function (e) {
    var t = e("components/showcase/2.0.0/base/views/edit_base"), n = e("underscore"), i = e("components/modal/1.0.0/modal"), s = e("components/pop/atom/link"), o = e("text!components/public_template/dropdown_menu.html"), a = e("core/utils"), l = e("text!components/showcase/2.0.0/image_text/templates/edit_link.html");
    return t.extend({
        template: n.template(l),
        dropdownTpl: n.template(o),
        events: {
            "click .js-modal-magazine, .js-modal-goods, .js-modal-activity, .js-modal-survey": "chooseLink",
            "click .js-modal-history, .js-modal-homepage, .js-modal-usercenter": "chooseStaticLink",
            "click .js-modal-links": "chooseOtherLink"
        },
        modelEvents: {"change:link_url": "render"},
        serializeData: function () {
            var e = this.model.cid, t = n.clone(this.model.attributes);
            return n.extend(t, {cid: e, dropdown_menu: this.dropdownTpl}), t
        },
        bindValidation: function () {
        },
        chooseLink: function (e) {
            var t = this, n = $(e.target).data("type");
            i.initialize({type: n}).setChooseItemCallback(function (e) {
                t.model.set({link_id: e.data_id, link_type: e.type, link_title: e.data_title, link_url: e.data_url})
            }).modal("show")
        },
        chooseStaticLink: function (e) {
            var t = $(e.target).data("type"), n = this;
            a.getStaticUrl(t, function (e) {
                n.model.set({link_id: "", link_type: t, link_title: "", link_url: e})
            })
        },
        chooseOtherLink: function (e) {
            var t, n = this;
            t = this.$(this.$(".js-link-to").length > 0 ? ".js-link-to" : ".js-dropdown-toggle");
            var i = e.target;
            s.initialize({
                target: t, trigger: $(i), callback: function (e) {
                    n.model.set({link_id: "", link_type: "link", link_title: e, link_url: e})
                }
            })
        }
    })
}),define("text!components/showcase/2.0.0/image_text/templates/edit_image.html", [], function () {
    return '<label>封面<span class="label-desc"><%= desc %></span></label>\n<% if (image) { %>\n    <img src="<%- image %>" width="100" height="100"/>\n    <a class="js-add-image control-action" href="javascript:;">重新选择</a>\n<% } else { %>\n    <a class="js-add-image control-action" href="javascript:;">添加图片...</a>\n<% } %>\n<input type="hidden" name="image" data-error-style="block">\n'
}),define("components/showcase/2.0.0/image_text/views/edit_image", ["require", "components/showcase/2.0.0/base/views/edit_base", "components/image/2.0.0/app", "underscore", "core/utils", "text!components/showcase/2.0.0/image_text/templates/edit_image.html"], function (e) {
    var t = e("components/showcase/2.0.0/base/views/edit_base"), n = (e("components/image/2.0.0/app"), e("underscore")), i = e("core/utils"), s = e("text!components/showcase/2.0.0/image_text/templates/edit_image.html");
    return t.extend({
        template: n.template(s),
        events: {"click .js-add-image": "addImage"},
        modelEvents: {"change:image": "render"},
        bindValidation: function () {
        },
        addImage: function () {
            var e = this;
            window.imageModal.initialize(i.isFenxiao() ? {
                multiChoose: !1,
                uploadURL: _global.url.fenxiao + "/common/qiniu/upToken.json",
                hideIconList: !0,
                callback: function (t) {
                    e.model.set("image", t[0].attachment_url), e.model.set("image_id", t[0].attachment_id)
                }
            } : {
                multiChoose: !1, callback: function (t) {
                    var n = +t[0].width;
                    return n && n > 1200 ? void i.errorNotify("图片宽度不能大于1200像素，否则会导致群发失败") : (e.model.set("image", t[0].attachment_url), void e.model.set("image_id", t[0].attachment_id))
                }
            })
        },
        serializeData: function () {
            var e, t = this.model.collection.indexOf(this.model), n = {
                big: "（图片建议尺寸：900 x 500像素）",
                small: "（图片建议尺寸：360 x 200像素）"
            };
            e = 0 >= t ? i.isFenxiao() ? n.big : n[this.model.imageType || "small"] : "（图片建议尺寸：200 x 200像素）";
            var s = this.model.get("image");
            return s = s && i.fullfillImage(s), {image: s, desc: e}
        }
    })
}),define("components/showcase/2.0.0/image_text/views/edit", ["require", "underscore", "components/showcase/2.0.0/base/views/edit_base", "text!components/showcase/2.0.0/image_text/templates/edit.html", "core/utils", "components/showcase/2.0.0/image_text/views/edit_link", "components/showcase/2.0.0/image_text/views/edit_image", "components/modal/1.0.0/modal", "components/image/2.0.0/app"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/edit_base"), i = e("text!components/showcase/2.0.0/image_text/templates/edit.html"), s = e("core/utils"), o = e("components/showcase/2.0.0/image_text/views/edit_link"), a = e("components/showcase/2.0.0/image_text/views/edit_image"), l = e("components/modal/1.0.0/modal"), c = window.UE;
    return window.imageModal = e("components/image/2.0.0/app"), n.extend({
        className: "edit-rich-text",
        template: t.template(i),
        events: {
            "blur textarea": "updateModel",
            'blur input[type="text"]': "updateModel",
            'change input[type="checkbox"]': "updateModel"
        },
        regions: {image: ".js-image-region", link: ".js-link-region"},
        onRender: function () {
            var e = new a({model: this.model});
            if (this.image.show(e), !s.isFenxiao()) {
                var t = new o({model: this.model});
                this.link.show(t)
            }
        },
        serializeData: function () {
            var e = this.model.toJSON();
            return s.insertFenxiaoInto(e), e
        },
        onClose: function () {
            this._editor && (this._editor.removeListener("blur contentChange"), this._editor.destroy(), delete this._editor)
        },
        onShow: function () {
            s.isFenxiao() ? this.renderFenxiaoEditor() : this.renderBaiduEditor()
        },
        renderFenxiaoEditor: function () {
            var e = this;
            tinyMCE.init({
                selector: ".js-editor",
                language: "zh_CN",
                plugins: ["advlist autolink link lists charmap print preview hr", "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking", "save table contextmenu directionality emoticons template paste textcolor"],
                toolbar1: "fullpage | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | formatselect fontsizeselect",
                toolbar2: "bullist numlist | outdent indent blockquote | undo redo | link unlink anchor imageupload media | forecolor backcolor",
                toolbar3: "table | removeformat | subscript superscript | emoticons | goods",
                fontsize_formats: "10px 12px 14px 16px 18px 20px 22px 24px",
                menubar: !1,
                contextmenu: "link inserttable | cell row column deletetable",
                block_formats: "Paragraph=p;Header 1=h1;Header 2=h2;Header 3=h3;Header 4=h4;Header 5=h5;Header 6=h6",
                toolbar_items_size: "small",
                height: 400,
                image_dimensions: !1,
                media_poster: !1,
                media_alt_source: !1,
                media_dimensions: !1,
                link_title: !1,
                object_resizing: "table",
                statusbar: !1,
                setup: function (t) {
                    t.on("change", function (n) {
                        e.model.set("content", t.getContent())
                    }), t.on("blur", function (n) {
                        e.model.set("content", t.getContent())
                    }), t.addButton("imageupload", {
                        tooltip: "插入图片", icon: "image", onclick: function () {
                            imageModal.initialize({
                                uploadURL: _global.url.fenxiao + "/common/qiniu/upToken.json",
                                hideIconList: !0,
                                callback: function (n) {
                                    if ("[object Array]" == Object.prototype.toString.call(n))for (var i = 0; i < n.length; i++)t.selection.setContent(t.dom.createHTML("img", {src: s.fullfillImage(n[i].attachment_url + "!730x0.jpg")})); else t.selection.setContent(t.dom.createHTML("img", {src: s.fullfillImage(n.attachment_url + "!730x0.jpg")}));
                                    e.model.set("content", t.getContent())
                                }
                            })
                        }
                    }), t.addButton("goods", {
                        text: "插入商品", icon: !1, onclick: function () {
                            l.initialize({type: "fenxiao_goods"}).setChooseItemCallback(function (n) {
                                t.selection.setContent("<div>" + t.dom.createHTML("img", {
                                        "data-alias": n.data_alias,
                                        src: n.image_url
                                    }) + "</div>"), e.model.set("content", t.getContent())
                            }).modal("show")
                        }
                    })
                }
            })
        },
        renderBaiduEditor: function () {
            var e = this;
            this._editor = new c.ui.Editor({
                toolbars: [["bold", "italic", "underline", "strikethrough", "forecolor", "backcolor", "justifyleft", "justifycenter", "justifyright", "|", "insertunorderedlist", "insertorderedlist", "blockquote"], ["emotion", "uploadimage", "link", "removeformat", "|", "rowspacingtop", "rowspacingbottom", "lineheight", "paragraph", "fontsize"], ["inserttable", "deletetable", "insertparagraphbeforetable", "insertrow", "deleterow", "insertcol", "deletecol", "mergecells", "mergeright", "mergedown", "splittocells", "splittorows", "splittocols"]],
                autoClearinitialContent: !1,
                autoFloatEnabled: !0,
                wordCount: !0,
                elementPathEnabled: !1,
                maximumWords: 4e3,
                initialFrameWidth: 458,
                initialFrameHeight: 300,
                focus: !1,
                pasteplain: !1
            });
            var t = this._editor;
            t.addListener("blur", function () {
                e.model.set("content", e._editor.getContent())
            }), t.addListener("contentChange", function () {
                e.model.set("content", e._editor.getContent())
            }), t.render(this.$(".js-editor")[0]), t.ready(function () {
                t.setContent(e.model.get("content"))
            })
        },
        save: function () {
            this._editor && this.model.set("content", this._editor.getContent())
        }
    })
}),define("tpl!components/showcase/2.0.0/advanced_news/templates/edit_link", [], function () {
    return function (obj) {
        var __t, __p = "";
        Array.prototype.join;
        with (obj || {})__p += "<label>链接到</label>\n", "" != link_type ? (__p += '\n<div class="control-action clearfix">\n    <div class="pull-left js-link-to link-to">\n        ', "" !== link_title && (__p += '\n        <a href="' + (null == (__t = link_url) ? "" : __t) + '" target="_blank" class="new-window link-to-title">\n            '), __p += '\n                <span class="label label-success">\n                    ', "feature" === link_type ? __p += "\n                        微页面\n                    " : "category" === link_type ? __p += "\n                        微页面分类\n                    " : "topic" === link_type ? __p += "\n                        专题\n                    " : "article" === link_type ? __p += "\n                        资讯\n                    " : "goods" === link_type ? __p += "\n                        商品\n                    " : "tag" === link_type ? __p += "\n                        商品标签\n                    " : -1 !== ["activity", "guaguale", "wheel", "zodiac", "crazyguess"].indexOf(link_type) ? __p += "\n                        营销活动\n                    " : "survey" === link_type ? __p += "\n                        调查\n                    " : "homepage" === link_type ? __p += "\n                        店铺主页\n                    " : "usercenter" === link_type ? __p += "\n                        会员主页\n                    " : "link" === link_type ? __p += "\n                        外链\n                    " : "history" === link_type && (__p += "\n                        历史信息\n                    "), __p += "\n                ", __p += "" !== link_title ? '\n                        <em class="link-to-title-text">' + (null == (__t = link_title) ? "" : __t) + "</em>\n                    </span>\n        </a>\n        " : "\n        </span>\n        ", __p += '\n    </div>\n    <div class="dropdown hover pull-right">\n        <a class="dropdown-toggle" href="javascript:;">修改 <i class="caret"></i></a>\n        ' + (null == (__t = dropdown_menu()) ? "" : __t) + "\n    </div>\n</div>\n\n") : __p += '\n<div class="dropdown hover">\n    <a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:;">设置链接到的页面地址 <i class="caret"></i></a>\n    ' + (null == (__t = dropdown_menu()) ? "" : __t) + "\n</div>\n",
            __p += '\n<input type="hidden" name="link_url" data-error-style="block">\n';
        return __p
    }
}),define("components/showcase/2.0.0/advanced_news/views/edit_link", ["require", "underscore", "jquery", "components/showcase/2.0.0/base/views/edit_base", "components/modal/1.0.0/modal", "components/pop/atom/link", "text!components/public_template/dropdown_menu.html", "core/utils", "tpl!../templates/edit_link"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("components/showcase/2.0.0/base/views/edit_base"), s = e("components/modal/1.0.0/modal"), o = e("components/pop/atom/link"), a = e("text!components/public_template/dropdown_menu.html"), l = e("core/utils");
    return i.extend({
        template: e("tpl!../templates/edit_link"),
        dropdownTpl: t.template(a),
        events: {
            "click .js-modal-magazine, .js-modal-goods, .js-modal-activity, .js-modal-survey": "chooseLink",
            "click .js-modal-history, .js-modal-homepage, .js-modal-usercenter": "chooseStaticLink",
            "click .js-modal-links": "chooseOtherLink"
        },
        modelEvents: {"change:link_url": "render"},
        serializeData: function () {
            var e = this.model.cid, n = t.clone(this.model.attributes);
            return t.extend(n, {cid: e, dropdown_menu: this.dropdownTpl}), n
        },
        bindValidation: function () {
        },
        chooseLink: function (e) {
            var t = this, i = n(e.target).data("type");
            s.initialize({type: i}).setChooseItemCallback(function (e) {
                t.model.set({
                    link_id: e.data_id,
                    link_type: e._real_type || e.type,
                    link_title: e.data_title,
                    link_url: e.data_url
                })
            }).modal("show")
        },
        chooseStaticLink: function (e) {
            var t = n(e.target).data("type"), i = this;
            l.getStaticUrl(t, function (e) {
                i.model.set({link_id: "", link_type: t, link_title: "", link_url: e})
            })
        },
        chooseOtherLink: function (e) {
            var t, i = this;
            t = this.$(this.$(".js-link-to").length > 0 ? ".js-link-to" : ".js-dropdown-toggle");
            var s = e.target;
            o.initialize({
                target: t, trigger: n(s), callback: function (e) {
                    i.model.set({link_id: "", link_type: "link", link_title: e, link_url: e})
                }
            })
        }
    })
}),define("tpl!components/showcase/2.0.0/advanced_news/templates/edit_image", [], function () {
    return function (obj) {
        var __t, __p = "";
        Array.prototype.join;
        with (obj || {})__p += '<label>封面<span class="label-desc">' + (null == (__t = desc) ? "" : __t) + "</span></label>\n", __p += cover_url ? '\n    <img src="' + (null == (__t = cover_url) ? "" : _.escape(__t)) + '" width="100" height="100"/>\n    <a class="js-add-image control-action" href="javascript:;">重新选择</a>\n' : '\n    <a class="js-add-image control-action" href="javascript:;">添加图片...</a>\n', __p += '\n<input type="hidden" name="cover_url" data-error-style="block">\n';
        return __p
    }
}),define("components/showcase/2.0.0/advanced_news/views/edit_image", ["require", "components/showcase/2.0.0/base/views/edit_base", "components/image/2.0.0/app", "core/utils", "tpl!../templates/edit_image"], function (e) {
    var t = e("components/showcase/2.0.0/base/views/edit_base"), n = e("components/image/2.0.0/app"), i = e("core/utils");
    return t.extend({
        template: e("tpl!../templates/edit_image"),
        events: {"click .js-add-image": "addImage"},
        modelEvents: {"change:cover_url": "render"},
        bindValidation: function () {
        },
        addImage: function () {
            var e = this;
            n.initialize({
                multiChoose: !1, callback: function (t) {
                    e.model.set("cover_url", t[0].attachment_url), e.model.set("cover_id", t[0].attachment_id)
                }
            })
        },
        serializeData: function () {
            var e, t = this.model.collection.indexOf(this.model), n = {
                big: "（图片建议尺寸：900 x 500像素）",
                small: "（图片建议尺寸：360 x 200像素）"
            };
            return e = 0 >= t ? n[this.model.imageType || "small"] : "（图片建议尺寸：200 x 200像素）", {
                cover_url: i.fullfillImage(this.model.get("cover_url")),
                desc: e
            }
        }
    })
}),define("tpl!components/showcase/2.0.0/advanced_news/templates/edit", [], function () {
    return function (obj) {
        var __t, __p = "";
        Array.prototype.join;
        with (obj || {})__p += '<form class="form-horizontal" novalidate>\n\n    <div class="control-group js-link-region">\n\n    </div>\n\n    <div class="control-group">\n        <label>标题</label>\n        <input type="text" name="title" value="' + (null == (__t = title) ? "" : _.escape(__t)) + '" data-error-style="block">\n    </div>\n\n    <div class="control-group image-region js-image-region">\n\n    </div>\n\n    <div class="control-group digest">\n        <label>摘要</label>\n        <textarea name="digest" cols="30" rows="3" data-error-style="block">' + (null == (__t = digest) ? "" : _.escape(__t)) + "</textarea>\n    </div>\n\n</form>\n";
        return __p
    }
}),define("components/showcase/2.0.0/advanced_news/views/edit", ["require", "components/showcase/2.0.0/base/views/edit_base", "./edit_link", "./edit_image", "tpl!../templates/edit"], function (e) {
    var t = e("components/showcase/2.0.0/base/views/edit_base"), n = e("./edit_link"), i = e("./edit_image");
    return t.extend({
        className: "edit-rich-text",
        template: e("tpl!../templates/edit"),
        events: {
            "blur textarea": "updateModel",
            'blur input[type="text"]': "updateModel",
            'change input[type="checkbox"]': "updateModel"
        },
        regions: {imageRegion: ".js-image-region", linkRegion: ".js-link-region"},
        onRender: function () {
            this.imageRegion.show(new i({model: this.model})), this.linkRegion.show(new n({model: this.model}))
        }
    })
}),define("text!components/showcase/2.0.0/audio/templates/edit.html", [], function () {
    return '<form class="form-horizontal edit-audio" novalidate>\n    <div class="control-group">\n        <label class="control-label">音频：</label>\n        <div class="controls">\n            <input type="hidden" name="audio">\n            <% if (audio) { %>\n                <div class="voice-wrapper" data-voice-src="<%- audio %>">\n                    <span class="voice-player">\n                        <span class="stop">点击播放</span>\n                        <span class="second"></span>\n                        <i class="play" style="display:none;"></i>\n                    </span>\n                    <a href="javascript:;" class="js-choose-audio control-action">重新选择音频</a>\n                </div>\n            <% } else { %>\n            <a href="javascript:;" class="js-choose-audio control-action">选择音频</a>\n            <% } %>\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label">样式：</label>\n        <div class="controls">\n            <label class="radio">\n                <input type="radio" name="style" value="0" <% if (style== \'0\') { %> checked <% } %>>模仿微信对话样式\n            </label>\n            <% if(style == \'0\') { %>\n                <div class="control-group control-group-inner">\n                    <label class="control-label">头像：</label>\n                    <div class="controls">\n                        <div class="clearfix">\n                            <img src="<%= avatar %>" class="edit-audio-avatar">\n                            <div class="edit-audio-avatar-action">\n                                <div>\n                                    <a href="javascript:;" class="js-upload-avatar">上传头像</a>\n                                    <span class="c-gray"> | </span>\n                                    <a href="javascript:;" class="js-use-default-avatar">使用店铺logo</a>\n                                </div>\n                                <p class="help-desc">建议尺寸80*80像素</p>\n                                <p class="help-desc">如果不设置，默认将使用店铺logo</p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class="control-group control-group-inner">\n                    <label class="control-label">气泡：</label>\n                    <div class="controls">\n                        <label class="radio inline">\n                            <input type="radio" name="bubble" value="left" <% if(bubble == \'left\') { %>checked<% } %>>\n                            居左\n                        </label>\n                        <label class="radio inline">\n                            <input type="radio" name="bubble" value="right" <% if(bubble == \'right\') { %>checked<% } %>>\n                            居右\n                        </label>\n                    </div>\n                </div>\n            <% } %>\n            <label class="radio">\n                <input type="radio" name="style" value="1" <% if (style== \'1\') { %> checked <% } %>>简易音乐播放器\n            </label>\n            <% if (style == \'1\') { %>\n                <div class="control-group control-group-inner">\n                    <label class="control-label">标题：</label>\n                    <div class="controls">\n                        <input type="text" placeholder="标题" name="title" value="<%- title %>">\n                    </div>\n                </div>\n                <div class="control-group control-group-inner">\n                    循环：\n                    <label class="checkbox inline">\n                        <% if (+loop === 0) { %>\n                        <input type="checkbox" name="loop" value="0">开启循环播放\n                        <% } else { %>\n                        <input type="checkbox" name="loop" value="1" checked>开启循环播放\n                        <% } %>\n                    </label>\n                </div>\n            <% } %>\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label">播放：</label>\n        <div class="controls">\n            <label class="radio">\n                <input type="radio" name="reload" value="1" <% if (reload == \'1\') { %> checked <% } %>>暂停后再恢复播放时，从头开始\n            </label>\n            <label class="radio">\n                <input type="radio" name="reload" value="0" <% if (reload == \'0\') { %> checked <% } %>>暂停后再恢复播放时，从暂停位置开始\n            </label>\n        </div>\n    </div>\n</form>\n'
}),define("text!components/audio/1.0.0/templates/audio_list.html", [], function () {
    return '<div class="modal-header">\n    <a class="close" data-dismiss="modal">×</a>\n    <!-- 顶部tab -->\n    <ul class="module-nav modal-tab">\n        <li class="active"><a href="javascript:;" data-pane="audio" class="js-modal-tab">用过的语音</a> | </li>\n        <li><a href="javascript:;" data-pane="upload" class="js-modal-tab">新语音</a></li>\n    </ul>\n</div>\n<div class="tab-pane js-tab-pane-audio">\n    <div class="modal-body module-audio">\n        <table class="table">\n            <thead>\n                <tr>\n                    <th class="time"><span>语音</span></th>\n                    <th class="title"><span>文件名</span></th>\n                    <th class="time"><span>创建时间</span></th>\n                    <th class="opts">\n                        <form class="form-search search-box">\n                            <div class="input-append">\n                                <input class="input-small js-modal-search-input" type="text"/>\n                                <a href="javascript:void(0);" class="btn js-fetch-page js-modal-search" data-action-type="search">搜</a>\n                            </div>\n                        </form>\n                    </th>\n                </tr>\n            </thead>\n            <tbody class="module-body clearfix">\n\n            </tbody>\n        </table>\n    </div>\n    <div class="modal-footer">\n        <div class="modal-action pull-left">\n            <input type="button" class="btn btn-primary js-choose-audio hide" value="确定使用">\n        </div>\n        <div class="pagenavi js-pagenavi"></div>\n    </div>\n</div>\n<div class="tab-pane js-tab-pane-upload hide">\n    <div class="modal-body">\n        <div class="upload-local-img js-upload-local-audio"></div>\n    </div>\n    <div class="modal-footer">\n        <div class="modal-action pull-right">\n            <input type="button" class="btn btn-primary js-upload-audio" data-loading-text="上传中..." value="确定上传">\n        </div>\n    </div>\n</div>\n\n'
}),define("text!components/audio/1.0.0/templates/audio.html", [], function () {
    return '<td>\n    <div class="td_cont">\n        <div class="voice-wrapper" data-voice-src="<%= window._global.url.imgqn %>/<%= attachment_url %>!8k.mp3">\n            <span class="voice-player">\n                <span class="arrow"></span>\n                <span class="stop">点击播放</span>\n                <span class="second"></span>\n                <i class="play" style="display:none;"></i>\n            </span>\n        </div>\n    </div>\n</td>\n<td class="title"><%= attachment_title %></td>\n<td class="time">\n    <span class="td_cont"><%= created_time %></span>\n</td>\n<td class="opts">\n    <div class="td_cont"><button class="btn btn-choose">选取</button></div>\n</td>'
}),define("components/audio/1.0.0/views/audio_view", ["require", "marionette", "text!components/audio/1.0.0/templates/audio.html"], function (e) {
    var t = e("marionette"), n = e("text!components/audio/1.0.0/templates/audio.html");
    return t.ItemView.extend({
        template: _.template(n),
        tagName: "tr",
        events: {"click .btn-choose": "select"},
        collectionEvents: {clear: "clear"},
        className: function () {
            return this.model.collection.isSelected(this.model) ? "selected" : ""
        },
        select: function (e) {
            this.model.collection.select(this.model) && (this.$el.toggleClass("selected"), 0 == this.model.collection.multiChoose && this.model.collection.trigger("audio:choose:success"))
        },
        clear: function () {
            this.$el.removeClass("selected")
        }
    })
}),define("components/audio/1.0.0/views/audio_list_view", ["require", "marionette", "text!components/audio/1.0.0/templates/audio_list.html", "components/audio/1.0.0/views/audio_view", "core/utils"], function (e) {
    var t = e("marionette"), n = e("text!components/audio/1.0.0/templates/audio_list.html"), i = e("components/audio/1.0.0/views/audio_view"), s = e("core/utils");
    return t.CompositeView.extend({
        className: "modal fade hide",
        ui: {
            pagenavi: ".js-pagenavi",
            chooseButton: ".js-choose-audio",
            audio: ".js-tab-pane-audio",
            upload: ".js-tab-pane-upload",
            pane: ".tab-pane",
            uploadButton: ".js-upload-audio",
            searchInput: ".js-modal-search-input"
        },
        events: {
            "click .pagenavi .fetch_page": "handlePageNumClick",
            "keypress .pagenavi .js-goto-input": "handlePageNumKeypress",
            "click .js-choose-audio": "chooseAudio",
            "click .js-update-audio-list": "update",
            "click .js-modal-tab": "tab",
            "click .js-upload-audio": "uploadAudio",
            "click .js-modal-search": "update",
            "keydown .js-modal-search-input": "search"
        },
        template: _.template(n),
        itemView: i,
        itemViewContainer: ".module-body",
        collectionEvents: {sync: "renderPagenavi", select: "toggleChooseButton"},
        initialize: function () {
            this.update();
            var e = this;
            this.listenTo(window.NC, "audio:upload:always", function () {
                e.ui.uploadButton.button("reset")
            }), this.listenTo(this.collection, "audio:choose:success", this.chooseAudio), this.listenTo(window.NC, "audio:upload:success", this.update)
        },
        tab: function (e) {
            var t = $(e.target), n = t.parent();
            n.addClass("active"), n.siblings("li").removeClass("active");
            var i = t.data("pane");
            this.ui.pane.addClass("hide"), this.ui[i].removeClass("hide")
        },
        handlePageNumClick: function (e) {
            var t = $(e.currentTarget), n = +t.data("page-num");
            this.gotoPage(n)
        },
        handlePageNumKeypress: function (e) {
            var t = +$(e.currentTarget).text();
            s.isNumber(e) || e.preventDefault(), e.keyCode === s.keyCode.ENTER && (this.gotoPage(t), e.preventDefault())
        },
        gotoPage: function (e) {
            this.collection._pageNumber = e, this._fetch()
        },
        update: function () {
            this._fetch()
        },
        search: function (e) {
            e.stopPropagation(), e.keyCode == s.keyCode.ENTER && (this._fetch(), e.preventDefault())
        },
        _fetch: function () {
            this.$el.addClass("audio-loading");
            var e = "";
            _.isFunction(this.ui.searchInput.val) && (e = this.ui.searchInput.val());
            var t = s.addParameter(this.collection.url, {p: this.collection._pageNumber, keyword: e}), n = this;
            this.collection.fetch({
                url: t, success: function () {
                    n.$el.removeClass("audio-loading")
                }
            })
        },
        chooseAudio: function () {
            var e = this.collection.getSelectedAudios();
            window.NC.trigger("audio:choose:success", e), this.clearAllSelected()
        },
        clearAllSelected: function () {
            this.collection.clearAllSelected(), this.$("li.selected").removeClass("selected")
        },
        renderPagenavi: function () {
            this.ui.pagenavi.html(this.collection.pagenavi)
        },
        toggleChooseButton: function (e, t) {
            e > 0 ? this.ui.chooseButton.removeClass("hide") : this.ui.chooseButton.addClass("hide")
        },
        uploadAudio: function (e) {
            this.ui.uploadButton.button("loading"), window.NC.trigger("audio:upload")
        }
    })
}),define("components/audio/1.0.0/models/audio", ["require", "backbone"], function (e) {
    var t = e("backbone");
    return t.Model.extend({})
}),define("components/audio/1.0.0/collections/audios", ["require", "backbone", "components/audio/1.0.0/models/audio", "core/utils"], function (e) {
    var t = e("backbone"), n = e("components/audio/1.0.0/models/audio"), i = e("core/utils");
    return t.Collection.extend({
        url: _global.url.www + "/showcase/attachment/alert.json?media_type=2&v=2",
        model: n,
        _pageNumber: 1,
        parse: function (e) {
            return 0 == e.errcode ? (this.pagenavi = e.data.page_view, e.data.data_list) : void i.errorNotify(e.errmsg || "出错啦。")
        },
        _selectedModel: [],
        _idAttribute: "attachment_id",
        getSelectedAudios: function () {
            return this._selectedModel
        },
        select: function (e) {
            var t = this;
            if (e.get("attachment_size") > 1024 * this.maxSize)return i.errorNotify("音频不能大于 " + this.maxSize + " KB"), !1;
            var n = {};
            n[this._idAttribute] = e.get(this._idAttribute);
            var s = _.where(this._selectedModel, n);
            return s.length > 0 ? _.each(s, function (e) {
                t._selectedModel.splice(t._selectedModel.indexOf(e), 1)
            }) : this._selectedModel.push(e.attributes), this.trigger("select", this._selectedModel.length, e), !0
        },
        isSelected: function (e) {
            var t = {};
            t[this._idAttribute] = e.get(this._idAttribute);
            var n = _.where(this._selectedModel, t);
            return n.length > 0 ? !0 : !1
        },
        clearAllSelected: function () {
            this._selectedModel.length = 0, this.trigger("clear"), this.trigger("select", 0)
        }
    })
}),define("text!components/audio/1.0.0/templates/audio_upload.html", [], function () {
    return '<div class="control-group">\n    <label class="control-label">本地语音：</label>\n    <div class="controls preview-container js-preview-upload-img">\n    </div>\n    <div class="controls">\n        <div class="control-action">\n            <div class="voice-preview hide">\n                <p class="name"></p>\n                <p class="size"></p>\n            </div>\n            <div class="voice-file-input">\n                <a href="javascript:;" class="js-fileupload-btn">添加语音...</a>\n                <input class="js-fileupload-input" type="file" name="upload_file" data-url="http://img.koudaitong.com/uploadmultiple?format=json">\n            </div>\n\n            <p class="help-desc">最大支持 <span class="js-max-size">2 MB</span> 以内的语音 (amr, mp3 格式)</p>\n        </div>\n    </div>\n</div>'
}),define("components/audio/1.0.0/views/audio_upload", ["require", "marionette", "text!components/audio/1.0.0/templates/audio_upload.html"], function (e) {
    var t = e("marionette"), n = e("text!components/audio/1.0.0/templates/audio_upload.html");
    return t.CompositeView.extend({
        tagName: "form",
        className: "form-horizontal",
        template: _.template(n),
        events: {"change .js-fileupload-input": "selectFile"},
        initialize: function () {
            this.listenTo(window.NC, "audio:upload", this.upload)
        },
        appendBuffer: function (e, t) {
            e.$(".fileinput-button").before(t)
        },
        appendHtml: function (e, t, n) {
            e.isBuffering ? (e.elBuffer.appendChild(t.el), e._bufferedChildren.push(t)) : e.$(".fileinput-button").before(t.el)
        },
        selectFile: function (e) {
            var t = e.target.files, n = this;
            _.each(t, function (e) {
                var t = e.size / 1024;
                t > n.collection.maxSize || e.name.match(/(\.|\/)(mp3|amr)$/i) && n.previewAndAdd(e)
            })
        },
        previewAndAdd: function (e) {
            var t = new FileReader, n = this;
            t.onload = function (t) {
                n.collection.reset({
                    src: t.target.result,
                    file: e
                }, {silent: !0}), n.$(".voice-preview").show(), n.$(".voice-preview .name").html(e.name), n.$(".voice-preview .size").html((e.size / 1024).toFixed(1) + "kb")
            }, this.$(".js-fileupload-btn").html("重新选择.."), t.readAsDataURL(e)
        },
        upload: function () {
            this.collection.sync({
                success: function () {
                    this.render()
                }.bind(this)
            })
        }
    })
}),define("components/audio/1.0.0/models/audio_upload", ["require", "backbone"], function (e) {
    var t = e("backbone");
    return t.Model.extend({})
}),function (e) {
    "function" == typeof define && define.amd ? define("cookie", ["jquery"], e) : e(jQuery)
}(function (e) {
    function t(e) {
        return l.raw ? e : encodeURIComponent(e)
    }

    function n(e) {
        return l.raw ? e : decodeURIComponent(e)
    }

    function i(e) {
        return t(l.json ? JSON.stringify(e) : String(e))
    }

    function s(e) {
        0 === e.indexOf('"') && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            return e = decodeURIComponent(e.replace(a, " ")), l.json ? JSON.parse(e) : e
        } catch (t) {
        }
    }

    function o(t, n) {
        var i = l.raw ? t : s(t);
        return e.isFunction(n) ? n(i) : i
    }

    var a = /\+/g, l = e.cookie = function (s, a, c) {
        if (void 0 !== a && !e.isFunction(a)) {
            if (c = e.extend({}, l.defaults, c), "number" == typeof c.expires) {
                var r = c.expires, d = c.expires = new Date;
                d.setDate(d.getDate() + r)
            }
            return document.cookie = [t(s), "=", i(a), c.expires ? "; expires=" + c.expires.toUTCString() : "", c.path ? "; path=" + c.path : "", c.domain ? "; domain=" + c.domain : "", c.secure ? "; secure" : ""].join("")
        }
        for (var p = s ? void 0 : {}, u = document.cookie ? document.cookie.split("; ") : [], m = 0, h = u.length; h > m; m++) {
            var _ = u[m].split("="), g = n(_.shift()), v = _.join("=");
            if (s && s === g) {
                p = o(v, a);
                break
            }
            s || void 0 === (v = o(v)) || (p[g] = v)
        }
        return p
    };
    l.defaults = {}, e.removeCookie = function (t, n) {
        return void 0 === e.cookie(t) ? !1 : (e.cookie(t, "", e.extend({}, n, {expires: -1})), !e.cookie(t))
    }
}),define("components/image/1.0.0/models/image_upload", ["require", "backbone"], function (e) {
    var t = e("backbone");
    return t.Model.extend({})
}),define("components/image/1.0.0/collections/image_upload", ["require", "cookie", "backbone", "components/image/1.0.0/models/image_upload", "core/utils"], function (e) {
    var t = (e("cookie"), e("backbone")), n = e("components/image/1.0.0/models/image_upload"), i = e("core/utils");
    return t.Collection.extend({
        model: n,
        url: "http://up.qiniu.com",
        uploadURL: _global.url.www + "/common/qiniu/upToken.json",
        eventPrefix: "image",
        sync: function (e) {
            var t = this;
            if (e = e || {}, this.length <= 0)return void window.NC.trigger(t.eventPrefix + ":upload:always");
            var n;
            $.post(this.uploadURL, {
                scope: this["private"] ? _global.js.qn_private : _global.js.qn_public,
                kdt_id: $.cookie("kdt_id")
            }).success(function (s) {
                i.parse(s, {
                    success: function (i) {
                        n = i.uptoken, t.upload(n, e)
                    }, fail: function () {
                        window.NC.trigger(t.eventPrefix + ":upload:always"), i.errorNotify("获取token失败，请重试。")
                    }
                })
            }).fail(function () {
                window.NC.trigger(t.eventPrefix + ":upload:always"), i.errorNotify("获取token失败，请重试。")
            })
        },
        upload: function (e, t) {
            var n = this, s = [], o = [];
            this.each(function (a, l) {
                var c = new $.Deferred, r = new FormData;
                r.append("token", e), r.append("file", a.get("file")), $.ajax({
                    url: this.url,
                    type: "post",
                    data: r,
                    dataType: "json",
                    processData: !1,
                    contentType: !1
                }).success(function (e, n, o) {
                    i.parse(e, {
                        success: function (e) {
                            s[l] = e, _.isFunction(t.success) && t.success(), c.resolve()
                        }, fail: function () {
                            c.reject()
                        }
                    })
                }).fail(function () {
                    c.reject()
                }).always(function () {
                    window.NC.trigger(n.eventPrefix + ":upload:always")
                }), o.push(c)
            }.bind(this)), $.when.apply(void 0, o).promise().done(function () {
                window.NC.trigger(n.eventPrefix + ":upload:success", s), n.reset(), i.successNotify("上传成功")
            }).fail(function () {
                i.errorNotify("上传失败，请重试")
            })
        },
        clearDownload: function (e) {
            e.destroy()
        },
        swapImages: function (e, t) {
            var n = this.models, i = n.splice(e, 1)[0];
            return n.splice(t, 0, i), n
        }
    })
}),define("components/audio/1.0.0/collections/audio_upload", ["require", "backbone", "components/audio/1.0.0/models/audio_upload", "core/utils", "components/image/1.0.0/collections/image_upload"], function (e) {
    var t = (e("backbone"), e("components/audio/1.0.0/models/audio_upload")), n = (e("core/utils"), e("components/image/1.0.0/collections/image_upload"));
    return n.extend({model: t, eventPrefix: "audio"})
}),define("components/player/audio_player", ["jquery"], function (e) {
    var t = function (e, t) {
        this.Audio.init(e, t)
    };
    t.prototype.Audio = {
        init: function (t, n) {
            var i = this;
            this.opts = n, this.$voice = e(t), this.$wrapper = this.$voice.parent(), this.$stop = this.$voice.find(n.stop), this.$play = this.$voice.find(n.play), this.$second = this.$voice.find(n.second), this.$duration = this.$voice.find(n.duration), this.stop_text = "点击播放", this.voice_src = this.$wrapper.data("voice-src"), this.stopnow = null, i.appendDom()
        }, appendDom: function () {
            var t = this, n = null, i = e('<div id="audio_wrapper"><audio id="audio_player" preload="" type="audio/mpeg" src=""></audio></div>').hide();
            0 === e("#audio_wrapper").size() && e("body").append(i);
            var s = t.voice_src;
            s.slice && ".amr" === s.slice(-4) && (s += "!128k.mp3"), e("#audio_player").attr("src", s), n = e("#audio_player").get(0), t.voicePlay(n)
        }, voicePlay: function (t) {
            var n = this, i = this.opts, s = "js-audio-playnow";
            e("." + s).find(i.play).hide(), e("." + s).find(i.stop).text(n.stop_text).show(), e("." + s).find(i.second).empty().hide(), e("." + s).find(i.duration).show(), e("." + s).removeClass(s), n.$voice.addClass(s), n.$stop.text("loading..."), n.playerEvent(t)
        }, playerEvent: function (t) {
            var n = this, i = null, s = !!navigator.userAgent.match(/AppleWebKit.*Mobile./), o = function () {
                n.$play.hide(), n.$stop.text(n.stop_text).show(), n.$second.empty().hide(), n.$duration.show(), n.$voice.removeClass("js-audio-playnow"), i && clearInterval(i)
            };
            n.stopnow = !1, s && t.play(), t.addEventListener("canplay", function () {
                n.stopnow || (s || (t.play(), n.$second.empty().show(), i && clearInterval(i), n.$second.html("0/" + Math.floor(t.duration)), i = setInterval(function () {
                    n.$second.html(Math.round(t.currentTime) + "/" + Math.floor(t.duration))
                }, 1e3)), n.$stop.text(n.stop_text).hide(), n.$play.show(), n.$duration.hide())
            }), t.addEventListener("ended", function () {
                o()
            }), t.addEventListener("error", function () {
                n.$stop.text("加载失败！")
            }), e("body").on("click", ".js-audio-playnow", function () {
                n.stopnow = !0, t.pause(), o()
            })
        }
    }, e.fn.extend({
        audioPlayer: function (n) {
            return this.each(function () {
                var i = e.extend({stop: ".stop", play: ".play", second: ".second", duration: ".duration"}, n);
                new t(this, i)
            })
        }
    }), e.getAudioDuration = function (t) {
        var n, i, s, o;
        return i = new e.Deferred, void 0 == t ? (i.reject("音频地址为空"), i) : (t.split && (o = t.split("/"), o = o[o.length - 1], -1 === o.indexOf(".") && (t += "!128k.mp3")), t.slice && ".amr" === t.slice(-4) && (t += "!128k.mp3"), n = new Audio, n.src = t, n.oncanplay = function () {
            clearTimeout(s), i.resolve(n.duration)
        }, n.onerror = function () {
            clearTimeout(s), i.reject("音频获取失败")
        }, s = setTimeout(function () {
            i.reject("获取音频信息超时")
        }, 5e3), i)
    }
}),define("components/audio/1.0.0/audio", ["require", "core/event", "marionette", "components/audio/1.0.0/views/audio_list_view", "components/audio/1.0.0/collections/audios", "components/audio/1.0.0/views/audio_upload", "components/audio/1.0.0/collections/audio_upload", "components/player/audio_player"], function (e) {
    window.NC = e("core/event");
    var t = e("marionette"), n = e("components/audio/1.0.0/views/audio_list_view"), i = e("components/audio/1.0.0/collections/audios"), s = e("components/audio/1.0.0/views/audio_upload"), o = e("components/audio/1.0.0/collections/audio_upload");
    e("components/player/audio_player");
    var a = new t.Application;
    a.on("initialize:before", function () {
        $("body").append('<div class="js-audio-app-container"></div>'), a.addRegions({
            container: ".js-audio-app-container",
            audioUpload: ".js-upload-local-audio"
        })
    });
    var l = new i, c = new o;
    a.addInitializer(function (e) {
        a.container.show(new n({collection: l})), a.audioUpload.show(new s({collection: c}))
    }), a.on("show:audio", function () {
        a.container.$el.find(".modal").modal("show");
        var e, t = a._options.maxSize;
        void 0 != t && (e = t % 1024 == 0 ? t / 1024 + " MB" : t + " KB", a.audioUpload.$el.find(".js-max-size").html(e));
        var n = a._options.tabIndex, i = a._options.onlyUpload, s = a.container.$el.find(".js-modal-tab");
        void 0 != n && s.eq(n).click(), i === !0 && (a.container.$el.find(".module-nav li").eq(0).hide(), s.eq(1).click())
    });
    var r = function (e) {
        var t = e[0];
        if (+t.attachment_size > 6291456) {
            var n = a.container.$el.find(".js-upload-audio");
            setTimeout(function () {
                n.data("loading-text", "文件正在转码，大概需要30秒钟..."), n.button("loading")
            }, 1), $.get(t.attachment_full_url + "!64k.mp3").always(function () {
                n.button("reset"), n.data("loading-text", "上传中..."), d(e)
            })
        } else d(e)
    }, d = function (e) {
        a._options && _.isFunction(a._options.callback) && a._options.callback(e), a.container.$el.find(".modal").modal("hide")
    };
    return window.NC.on("audio:upload:success", r), window.NC.on("audio:download:success", d), window.NC.on("audio:choose:success", d), {
        initialize: function (e) {
            this._initialized || (a.start(), this._initialized = !0), a._options = e, e.multiChoose === !1 ? l.multiChoose = !1 : l.multiChoose = !0, e.maxSize ? (c.maxSize = e.maxSize, l.maxSize = e.maxSize) : (e.maxSize = c.maxSize = 2048, l.maxSize = 2048), $("body").off("click", ".voice-player:not(.js-audio-playnow)"), $("body").on("click", ".voice-player:not(.js-audio-playnow)", function () {
                $(this).audioPlayer()
            }), a.trigger("show:audio")
        }
    }
}),define("components/showcase/2.0.0/audio/views/edit", ["require", "underscore", "core/utils", "components/showcase/2.0.0/base/views/edit_base", "text!components/showcase/2.0.0/audio/templates/edit.html", "components/image/2.0.0/app", "components/audio/1.0.0/audio"], function (e) {
    var t = e("underscore"), n = e("core/utils"), i = e("components/showcase/2.0.0/base/views/edit_base"), s = e("text!components/showcase/2.0.0/audio/templates/edit.html"), o = e("components/image/2.0.0/app"), a = e("components/audio/1.0.0/audio"), l = [1, 171949, 719286, 2222222222];
    return i.extend({
        template: t.template(s),
        events: {
            'change input[type="checkbox"]': "updateModel",
            'change input[type="radio"]': "updateModel",
            'blur input[type="text"]': "updateModel",
            "click .js-choose-audio": "chooseAudio",
            "click .js-upload-avatar": "chooseImage",
            "click .js-use-default-avatar": "useDefaultAvatar"
        },
        modelEvents: {"change:audio": "render", "change:style": "render", "change:avatar": "render"},
        serializeData: function () {
            var e = this.model.toJSON();
            return t.extend(e, {
                audio: n.fullfillImage(e.audio),
                avatar: n.fullfillImage(e.avatar || _global.mp_data.logo, "!80x80.jpg")
            })
        },
        chooseAudio: function () {
            var e = this;
            a.initialize({
                multiChoose: !1,
                multiUpload: !1,
                maxSize: -1 !== l.indexOf(_global.kdt_id) ? 30720 : 6144,
                callback: function (t) {
                    t = t[0];
                    var n = t.attachment_file || t.attachment_url;
                    e.model.set({audio: n})
                }
            })
        },
        chooseImage: function () {
            var e = this;
            o.initialize({
                multiChoose: !1, callback: function (t) {
                    t = t[0], e.model.set("avatar", t.attachment_url)
                }
            })
        },
        useDefaultAvatar: function () {
            this.model.set("avatar", "")
        }
    })
}),define("tpl!components/showcase/2.0.0/shop_banner/templates/edit", [], function () {
    return function (obj) {
        var __t, __p = "";
        Array.prototype.join;
        with (obj || {})__p += '<form class="form-horizontal" novalidate>\n    <div class="control-group">\n        <label class="control-label">背景图片：</label>\n        <div class="controls">\n            <div class="custom-shop-banner" style="width: 320px; background-image: url(' + (null == (__t = fullfillImage(background_image)) ? "" : _.escape(__t)) + ');"></div>\n            <a class="control-action js-trigger-image" href="javascript: void(0);">修改</a>\n            <p class="help-desc">最佳尺寸：640 x 480 像素。</p>\n            <p class="help-desc">尺寸不匹配时，图片将被压缩或拉伸以铺满画面。</p>\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label">店铺Logo：</label>\n        <div class="controls">\n            <img src="' + (null == (__t = logo()) ? "" : _.escape(__t)) + '" width="80" height="80" class="thumb-image" style="width: 80px; height: 80px;">\n            <a class="control-action js-trigger-avatar" href="javascript: void(0);">修改店铺Logo</a>\n        </div>\n    </div>\n    ', isFenxiao() && (__p += '\n    <div class="control-group">\n        <label class="control-label">店铺简介：</label>\n        <div class="controls">\n            <textarea name="intro" rows="2" cols="8" maxlength="40" style="resize: none;width:320px;">' + (null == (__t = intro) ? "" : __t) + '</textarea>\n            <p class="help-desc">最多40个字</p>\n        </div>\n    </div>\n    '), __p += "\n</form>\n";
        return __p
    }
}),define("components/showcase/2.0.0/shop_banner/views/edit", ["require", "components/showcase/2.0.0/base/views/edit_base", "components/image/2.0.0/app", "components/uploadlogo/app", "core/utils", "tpl!../templates/edit"], function (e) {
    var t = e("components/showcase/2.0.0/base/views/edit_base"), n = e("components/image/2.0.0/app"), i = e("components/uploadlogo/app"), s = e("core/utils");
    return t.extend({
        template: e("tpl!../templates/edit"),
        events: {
            "click .js-reset-bg": "resetBg",
            "click .js-trigger-image": "chooseImage",
            "click .js-trigger-avatar": "chooseLogo",
            "blur textarea": "updateModel"
        },
        modelEvents: {"change:background_image": "render"},
        templateHelpers: {
            logo: function () {
                return s.isFenxiao() ? s.fullfillImage(window._global.template_logo, "!145x145.jpg") : s.fullfillImage(window._global.mp_data.logo, "!145x145.jpg")
            }, fullfillImage: s.fullfillImage, isFenxiao: s.isFenxiao
        },
        chooseImage: function () {
            var e = this;
            n.initialize(s.isFenxiao() ? {
                multiChoose: !1,
                uploadURL: _global.url.fenxiao + "/common/qiniu/upToken.json",
                hideIconList: !0,
                callback: function (t) {
                    t = t[0], e.model.set("background_image", t.attachment_url)
                }
            } : {
                multiChoose: !1, callback: function (t) {
                    t = t[0], e.model.set("background_image", t.attachment_url)
                }
            })
        },
        chooseLogo: function () {
            var e = this;
            new i({
                callback: function () {
                    e.render(), e.model.trigger("change");
                }
            })
        }
    })
}),define("tpl!components/showcase/2.0.0/tags/templates/edit_item", [], function () {
    return function (obj) {
        var __t, __p = "";
        Array.prototype.join;
        with (obj || {})__p += '<div class="edit-tags">\n    <div class="tag-source">\n        <div class="control-group">\n            <label class="control-label pull-left">商品来源：</label>\n            <div class="controls pull-left">\n                ', __p += title ? '\n                        <a href="' + (null == (__t = url) ? "" : _.escape(__t)) + '" target="_blank" class="tag-title new-window">' + (null == (__t = title) ? "" : _.escape(__t)) + '</a>\n                        <a href="javascript:;" class="tag-modify js-select-tag">修改</a>\n                ' : '\n                    <a href="javascript:;" class="js-select-tag pull-left">选择商品分组</a>\n                ', __p += '\n                <input type="hidden" name="title">\n            </div>\n        </div>\n    </div>\n</div>\n<div class="actions">\n    <span class="action delete close-modal" title="删除">×</span>\n</div>\n';
        return __p
    }
}),define("components/showcase/2.0.0/tags/views/edit_item", ["require", "underscore", "jquery", "components/showcase/2.0.0/base/views/edit_base", "components/modal/1.0.0/modal", "core/utils", "tpl!../templates/edit_item"], function (e) {
    var t = e("underscore"), n = (e("jquery"), e("components/showcase/2.0.0/base/views/edit_base")), i = e("components/modal/1.0.0/modal"), s = e("core/utils");
    return n.extend({
        tagName: "li",
        className: "choice",
        template: e("tpl!../templates/edit_item"),
        events: {"click .actions .delete": "delete", "click .js-select-tag": "handleSelectTag"},
        onInit: function () {
            this.listenTo(this.model, "change", this.render)
        },
        urlCheck: function (e) {
            this.fullfillUrl(e, "link_url")
        },
        "delete": function () {
            var e = this.model.collection;
            this.model.destroy(), e.trigger("reset")
        },
        add: function () {
            if (this.model.collection.length >= 8)return void s.errorNotify("选项最多8个。");
            var e = t.clone(this.model.constructor.prototype.defaults), n = this.model.index();
            this.model.collection.add(e, {at: n + 1}), this.model.collection.trigger("reset")
        },
        handleSelectTag: function () {
            var e = this;
            this.tagModel = i.initialize({type: "tag"}).setChooseItemCallback(function (t) {
                e.model.set({alias: t.data_alias, type: t.data_type, id: t.data_id, title: t.title, url: t.data_url})
            }), this.tagModel.modal("show")
        }
    })
}),define("components/showcase/2.0.0/tags/views/edit_collection", ["require", "components/showcase/2.0.0/base/views/edit_collection_base", "./edit_item"], function (e) {
    var t = e("components/showcase/2.0.0/base/views/edit_collection_base"), n = e("./edit_item");
    return t.extend({
        itemView: n, onShow: function () {
            this.sortable()
        }
    })
}),define("tpl!components/showcase/2.0.0/tags/templates/edit", [], function () {
    return function (obj) {
        var __p = "";
        Array.prototype.join;
        with (obj || {})__p += "", is_fenxiao || (__p += '\n<form class="form-horizontal" novalidate>\n    <div class="control-group js-collection-region">\n\n    </div>\n    <div class="control-group options js-add-subentry">\n        <a class="add-option js-add-option" href="javascript:void(0);"><i class="icon-add"></i> 添加商品分组</a>\n    </div>\n\n    <div class="control-group">\n        <p class="app-component-desc help-desc">选择商品来源后，左侧实时预览暂不支持显示其包含的商品数据</p>\n    </div>\n\n</form>\n'), __p += '\n\n<div class="js-goods-style-region" style="margin-top: 10px;"></div>\n';
        return __p
    }
}),define("components/showcase/2.0.0/tags/views/edit", ["require", "components/showcase/2.0.0/base/views/edit_base", "../views/edit_collection", "components/showcase/2.0.0/goods_list/views/edit_goods_style", "components/modal/1.0.0/modal", "core/utils", "tpl!../templates/edit"], function (e) {
    var t = e("components/showcase/2.0.0/base/views/edit_base"), n = e("../views/edit_collection"), i = e("components/showcase/2.0.0/goods_list/views/edit_goods_style"), s = e("components/modal/1.0.0/modal"), o = e("core/utils"), a = 4;
    return t.extend({
        template: e("tpl!../templates/edit"),
        regions: {collectionRegion: ".js-collection-region", goodsStyleRegion: ".js-goods-style-region"},
        events: {"click .js-add-option": "addOption"},
        onInit: function () {
            this.listenTo(this.model.get("sub_entry"), "reset add remove", this.toggleOptions)
        },
        serializeData: function () {
            var e = this.model.toJSON();
            return o.insertFenxiaoInto(e), e
        },
        onRender: function () {
            this.collectionRegion.show(new n({
                collection: this.model.get("sub_entry"),
                layout: this
            })), this.goodsStyleRegion.show(new i({model: this.model})), this.toggleOptions()
        },
        addOption: function () {
            var e = this, t = e.model.get("sub_entry");
            s.initialize({multiChoose: !0, type: "tag"}).setChooseItemCallback(function (e) {
                var n = !1;
                if (_.each(e, function (e) {
                        t.length < a ? t.add({
                            type: e.data_type,
                            alias: e.data_alias,
                            id: e.data_id,
                            title: e.title,
                            url: e.data_url
                        }) : n = !0
                    }), n) {
                    var i = setTimeout(o.clearNotify, 3e3);
                    o.errorNotify("商品分组不能多于" + a + "个，已经自动删除多余的分组。", function () {
                        clearTimeout(i)
                    })
                }
            }).modal("show")
        },
        toggleOptions: function () {
            this.model.get("sub_entry").length >= a ? this.$(".options").hide() : this.$(".options").show()
        }
    })
}),define("tpl!components/showcase/2.0.0/notice/templates/edit", [], function () {
    return function (obj) {
        var __t, __p = "";
        Array.prototype.join;
        with (obj || {})__p += '<form class="form-horizontal edit-tpl-11-11" novalidate onsubmit="return false">\n    <div class="control-group">\n        <label class="control-label">公告：</label>\n        <div class="controls">\n            <input type="text" name="content" value="' + (null == (__t = content) ? "" : __t) + '" class="input-xxlarge" placeholder="请填写内容，如果过长，将会在手机上滚动显示">\n        </div>\n    </div>\n</form>\n';
        return __p
    }
}),define("components/showcase/2.0.0/notice/views/edit", ["require", "components/showcase/2.0.0/base/views/edit_base", "core/utils", "tpl!../templates/edit"], function (e) {
    var t = e("components/showcase/2.0.0/base/views/edit_base"), n = e("core/utils");
    return t.extend({
        template: e("tpl!../templates/edit"),
        events: {"blur input": "updateModel"},
        updateModel: n.updateModel
    })
}),define("text!components/pop/templates/delete.html", [], function () {
    return '<div class="arrow"></div>\n<div class="popover-inner popover-delete">\n    <div class="popover-content text-center">\n        <div class="form-inline">\n            <span class="help-inline item-delete">确定删除?</span>\n            <button type="button" class="btn btn-primary js-btn-confirm" data-loading-text="确定">确定</button>\n            <button type="reset" class="btn js-btn-cancel">取消</button>\n        </div>\n    </div>\n</div>\n'
}),define("components/pop/delete", ["require", "backbone", "components/pop/base", "text!components/pop/templates/delete.html", "core/utils", "underscore"], function (e) {
    var t = (e("backbone"), e("components/pop/base")), n = e("text!components/pop/templates/delete.html"), i = e("core/utils"), s = e("underscore");
    return t.extend({
        template: s.template(n), className: function () {
            return this.options.className
        }, initialize: function (e) {
            t.prototype.initialize.call(this, e)
        }, events: {"click .js-btn-cancel": "hide", "click .js-btn-confirm": "triggerCallback"}, isShow: function () {
            var e = this.$el.css("display");
            return "none" === e ? !1 : !0
        }, positioning: function () {
            var e = this, t = e.options.className;
            e.$el.show(), i.focus(e.$(".js-btn-confirm")), e.$el.position(-1 !== t.indexOf("left") ? {
                of: e.target,
                my: "right center",
                at: "left center",
                collision: "none"
            } : -1 !== t.indexOf("bottom") ? {
                of: e.target,
                my: "center top",
                at: "center bottom",
                collision: "none"
            } : {
                of: e.target,
                my: "left center",
                at: "right center",
                collision: "none"
            }), e.el.className = e.options.className
        }, reset: function (e) {
            var t = e.callback, n = e.target, i = e.trigger, s = e.className || "popover left";
            this.options.className = s, this.setCallback(t), this.setTarget(n), this.setTrigger(i), this.positioning(), this.show()
        }, triggerCallback: function (e) {
            if ("keydown" === e.type) {
                if (e.keyCode !== i.keyCode.ENTER)return
            } else if ("click" !== e.type)return;
            this.callback.call(this), this.hide()
        }
    })
}),define("components/pop/atom/delete", ["require", "backbone", "components/pop/delete"], function (e) {
    var t = (e("backbone"), e("components/pop/delete"));
    return {
        initialize: function (e) {
            var n = e.target = $(e.target), i = e.className, s = (e.type, e.callback), o = e.trigger = $(e.trigger || n), a = (e.data, e.notAutoHide || !1, e.content || "", e.appendTarget || "body"), l = new t({
                callback: s,
                target: n,
                className: i || "popover left",
                trigger: o
            });
            return l.render().$el.appendTo(a), l.positioning(), l
        }
    }
}),define("components/showcase/2.0.0/base/views/show_base", ["require", "underscore", "jquery", "marionette", "components/pop/atom/delete"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("marionette"), s = e("components/pop/atom/delete");
    return i.Layout.extend({
        className: "app-field clearfix",
        events: {
            "click .delete": "handleDelete",
            "click .add": "handleAdd",
            "click .edit": "handleEdit",
            "click .duplicate": "handleDuplicate",
            click: "handleClick"
        },
        initialize: function (e) {
            this._setOptions(e), this._bind(), this.triggerMethod("init", e)
        },
        _setOptions: function (e) {
            this.options = e || {}, this.layout = this.options.layout
        },
        _bind: function () {
            this.listenTo(this, "close", this._handleViewClose), this.listenTo(this.model, "change", this.render), this.listenTo(this.model, "valid:error", this.validError), this.listenTo(this.layout, "editing", this.editing)
        },
        _handleViewClose: function () {
            this.layout = null
        },
        handleEdit: function (e) {
            e.stopPropagation(), this.layout.displayEditView(this.model, {edit: !0})
        },
        handleDelete: function (e) {
            e.preventDefault(), e.stopPropagation();
            var i = t.bind(function () {
                var e, t = this.layout, n = this.model.index();
                n = 0 === n ? n + 1 : n - 1, e = this.model.collection.at(n), this.model.destroy(), e && t.displayEditView(e)
            }, this);
            s.initialize({target: n(e.target), callback: i})
        },
        handleDuplicate: function () {
            var e = t.result(this.model.constructor.prototype, "defaults"), n = t.pick(this.model.toJSON(), t.keys(e)), i = this.model.index();
            n = JSON.parse(JSON.stringify(n)), this.model.parse && (n = this.model.parse(n)), this.model.collection.add(n, {at: i + 1})
        },
        handleClick: function (e) {
            e.stopPropagation(), this.layout.displayEditView(this.model)
        },
        handleAdd: function (e) {
            e.stopPropagation(), this.layout.displayEditView(this.model, {add: !0})
        },
        editing: function (e) {
            e === this.model ? this.$el.addClass("editing") : this.$el.removeClass("editing")
        },
        validError: function () {
            this.layout.displayEditView(this.model, {error: !0})
        },
        position: function () {
            return this.$el.position()
        },
        offset: function () {
            return this.$el.offset()
        }
    })
}),define("text!components/showcase/2.0.0/rich_text/templates/show.html", [], function () {
    return '<div class="control-group">\n    <div class="custom-richtext<% if (fullscreen == 1) { %> custom-richtext-fullscreen<% } %>" style="<% if (color !== \'#ffffff\' && color !== \'#F9F9F9\') { %>background-color: <%= color %><% } %>"><%= content || \'<p>点此编辑『富文本』内容 ——&gt;</p><p>你可以对文字进行<strong>加粗</strong>、<em>斜体</em>、<span style="text-decoration: underline;">下划线</span>、<span style="text-decoration: line-through;">删除线</span>、文字<span style="color: rgb(0, 176, 240);">颜色</span>、<span style="background-color: rgb(255, 192, 0); color: rgb(255, 255, 255);">背景色</span>、以及字号<span style="font-size: 20px;">大</span><span style="font-size: 14px;">小</span>等简单排版操作。</p><p>还可以在这里加入表格了</p><table><tbody><tr><td width="93" valign="top" style="word-break: break-all;">中奖客户</td><td width="93" valign="top" style="word-break: break-all;">发放奖品</td><td width="93" valign="top" style="word-break: break-all;">备注</td></tr><tr><td width="93" valign="top" style="word-break: break-all;">猪猪</td><td width="93" valign="top" style="word-break: break-all;">内测码</td><td width="93" valign="top" style="word-break: break-all;"><em><span style="color: rgb(255, 0, 0);">已经发放</span></em></td></tr><tr><td width="93" valign="top" style="word-break: break-all;">大麦</td><td width="93" valign="top" style="word-break: break-all;">积分</td><td width="93" valign="top" style="word-break: break-all;"><a href="javascript: void(0);" target="_blank">领取地址</a></td></tr></tbody></table><p style="text-align: left;"><span style="text-align: left;">也可在这里插入图片、并对图片加上超级链接，方便用户点击。</span></p>\' %></div>\n    <div class="component-border"></div>\n</div>\n<div class="actions">\n    <div class="actions-wrap"><span class="action edit">编辑</span><span class="action add">加内容</span><span class="action delete">删除</span></div>\n</div>\n<div class="sort">\n    <i class="sort-handler"></i>\n</div>\n'
}),define("components/showcase/2.0.0/rich_text/views/show", ["require", "underscore", "components/showcase/2.0.0/base/views/show_base", "text!components/showcase/2.0.0/rich_text/templates/show.html"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/show_base"), i = e("text!components/showcase/2.0.0/rich_text/templates/show.html");
    return n.extend({template: t.template(i)})
}),define("text!components/showcase/2.0.0/goods/templates/show.html", [], function () {
    return '<div class="control-group">\n    <%  var showtype ;\n        if ( size_type == 0 ) {\n            showtype = \'card\';\n        } else if ( size_type == 1 ) {\n            showtype = \'waterfall\';\n        } else if (size_type == 3) {\n            showtype = \'promotion\';\n        } else {\n            showtype = \'normal\';\n        }\n\n        var btn_type = 0;\n        if ( buy_btn == \'1\' ) {\n            btn_type = buy_btn_type;\n        }\n        var is_show_wish_btn = show_wish_btn == \'1\' && window._global.isWishOpen == 1;\n\n        var is_show_sub_title = size == \'0\' && show_sub_title == \'1\';\n        var is_have_sub_title = is_show_sub_title;\n        var sub_title_class = is_show_sub_title ? \'has-sub-title\' : \'\';\n    %>\n    <ul class="sc-goods-list clearfix size-<%=size %> <%-showtype %> <%-size == 3? \'list\' : \'pic\' %>">\n        <!-- 大图  -->\n        <% if (size == \'0\') { %>\n            <% _.each(goods, function(item, index) { %>\n                <% is_have_sub_title = is_show_sub_title && item.sub_title %>\n                <li class="goods-card big-pic <%-showtype %> <%= sub_title_class %>">\n                    <a href="javascript: void(0);" class="link js-goods clearfix">\n                        <div class="photo-block">\n                            <img class="goods-photo js-goods-lazy" src="<%= item.image_url %>" />\n                        </div>\n                        <% if ( title == 1 || price == 1 || is_have_sub_title ) { %>\n                            <div class="info clearfix <%- title == \'1\' ? \'\' : \'info-no-title\' %> <%- price == \'1\' ? \'info-price\' : \'info-no-price\' %> btn<%=btn_type %>">\n                                <% if (price == \'1\') { %>\n                                    <p class="goods-title"><%- item.title %></p>\n                                    <p class="goods-sub-title c-black <%= is_have_sub_title ? \'\' : \'hide\' %>"><%=item.sub_title %></p>\n                                    <p class="goods-price"><em>￥<%= item.price %></em></p>\n                                    <p class="goods-price-taobao"></p>  \n                                <% } %>     \n                                <% if (price == \'0\') { %>\n                                    <p class="goods-title"><%- item.title %></p>\n                                    <p class="goods-sub-title c-black <%= is_have_sub_title ? \'\' : \'hide\' %>"><%=item.sub_title %></p>\n                                    <p class="goods-price"></p>\n                                    <p class="goods-price-taobao"></p>  \n                                <% } %>\n                            </div>\n                        <% }%>\n                        <% if ( buy_btn && showtype != \'normal\') { %>  \n                            <div class="goods-buy btn<%-buy_btn_type %> <%-title == \'1\' && price == \'0\'? \'info-title info-no-price\' : \'\' %>"></div>\n                        <% } %>\n                        <% if ( is_show_wish_btn ) { %>  \n                            <div class="goods-wish btn-wish"></div>\n                        <% } %>\n                    </a>\n                </li>\n            <% }); %>\n        <!-- 小图 -->\n        <% } else if ( size == \'1\' && showtype != \'waterfall\' ) { %>\n            <% _.each(goods, function(item, index) { %>\n                <li class="goods-card small-pic <%-showtype %>">\n                    <a href="javascript: void(0);" class="link js-goods clearfix">\n                        <div class="photo-block">\n                            <img class="goods-photo js-goods-lazy" src="<%= item.image_url %>" />\n                        </div>\n                        <% if ( price != 0 || (title != 0 && showtype != \'promotion\' && showtype != \'normal\') || showtype == \'promotion\' ) { %>\n                            <div class="info clearfix <%- title == \'1\' ? \'\' : \'info-no-title\' %>">\n                                <% if (price == \'1\') { %>\n                                    <p class="goods-title"><%- item.title %></p>\n                                    <p class="goods-price"><em>￥<%= item.price %></em></p>\n                                    <p class="goods-price-taobao"></p>  \n                                <% } %>     \n                                <% if (price == \'0\') { %>\n                                    <p class="goods-title"><%- item.title %></p>\n                                    <p class="goods-price"></p>\n                                    <p class="goods-price-taobao"></p>  \n                                <% } %>\n                            </div>\n                        <% }%>\n                        <% if ( buy_btn && showtype != \'normal\' ) { %>  \n                            <div class="goods-buy btn<%-buy_btn_type %>">\n                                <%- showtype == \'promotion\'? \'我要抢购\': \'\'%>\n                            </div>\n                            <% if ( title && !price && showtype != \'promotion\' ) { %>\n                                <div class=\'buy-tag-space\'></div>\n                            <% } %>\n                        <% } %>\n                        <% if ( is_show_wish_btn ) { %>  \n                            <div class="goods-wish btn-wish"></div>\n                        <% } %>\n                    </a>\n                </li>\n            <% }); %>\n        <% } else if (size == \'1\' && showtype == \'waterfall\') { %>\n            \n            <li class="sc-waterfall-half clearfix">\n                <ul class="clearfix">\n                <% _.each(goods, function(item, index) { %>\n                <% if( index % 2 != 1 ) { %>\n                    <li class="goods-card goods-list small-pic waterfall">\n                        <a href="javascript: void(0);" class="link js-goods clearfix">\n                            <div class="photo-block">\n                                <img class="goods-photo js-goods-lazy" src="<%= item.image_url %>"/>\n                            </div>\n                            <% if ( !(price == 0 && showtype != \'normal\' && title == 0 )) { %>\n                                <div class="info clearfix <%- title == \'1\'? \'\' : \'info-no-title\' %>">\n                                    <% if (price == \'1\') { %>\n                                        <p class="goods-title"><%- item.title %></p>\n                                        <p class="goods-price"><em>￥<%= item.price %></em></p>\n                                        <p class="goods-price-taobao"></p>  \n                                    <% } %>     \n                                    <% if (price == \'0\') { %>\n                                        <p class="goods-title"><%- item.title %></p>\n                                        <p class="goods-price"></p>\n                                        <p class="goods-price-taobao"></p>  \n                                    <% } %>\n                                </div>\n                            <% } %>\n                            <% if ( buy_btn && showtype != \'normal\' ) { %>  \n                                <div class="goods-buy btn<%-buy_btn_type %>"></div>\n                                <% if ( title && !price) { %>\n                                    <div class=\'buy-tag-space\'></div>\n                                <% } %>\n                            <% } %>\n                            <% if ( is_show_wish_btn ) { %>  \n                                <div class="goods-wish btn-wish"></div>\n                            <% } %>\n                        </a>\n                    </li>\n                <% } %>\n                <% }); %>\n                </ul>\n            </li>\n            <li class="sc-waterfall-half clearfix">\n                <ul class="clearfix">\n                <% _.each(goods, function(item, index) { %>\n                <% if( index % 2 == 1 ) { %>\n                    <li class="goods-card small-pic waterfall">\n                        <a href="javascript: void(0);" class="link js-goods clearfix">\n                            <div class="photo-block">\n                                <img class="goods-photo js-goods-lazy" src="<%= item.image_url %>"/>\n                            </div>\n                            <% if ( !(price == 0 && showtype != \'normal\' && title == 0 )) { %>\n                                <div class="info clearfix <%- title == \'1\'? \'\' : \'info-no-title\' %>">\n                                    <% if (price == \'1\') { %>\n                                        <p class="goods-title"><%- item.title %></p>\n                                        <p class="goods-price"><em>￥<%= item.price %></em></p>\n                                        <p class="goods-price-taobao"></p>  \n                                    <% } %>     \n                                    <% if (price == \'0\') { %>\n                                        <p class="goods-title"><%- item.title %></p>\n                                        <p class="goods-price"></p>\n                                        <p class="goods-price-taobao"></p>  \n                                    <% } %>\n                                </div>\n                            <% } %>\n                            <% if ( buy_btn && showtype != \'normal\' ) { %>  \n                                <div class="goods-buy btn<%-buy_btn_type %>"></div>\n                                <% if ( title && !price) { %>\n                                    <div class=\'buy-tag-space\'></div>\n                                <% } %>\n                            <% } %>\n                            <% if ( is_show_wish_btn ) { %>  \n                                <div class="goods-wish btn-wish"></div>\n                            <% } %>\n                        </a>\n                    </li>\n                <% } %>\n                <% }); %>\n                </ul>\n            </li>\n        <% } else if (size == \'2\') { %>\n            <!-- 一大两小 -->\n            <% _.each(goods, function(item, index) { %>\n                <% if ((index+1) % 3 === 1) { %>\n                    <!-- 大图 -->\n                    <li class="goods-card big-pic <%-showtype %>">\n                        <a href="javascript: void(0);" class="link js-goods clearfix">\n                            <div class="photo-block">\n                                <img class="goods-photo js-goods-lazy" src="<%= item.image_url %>" />\n                            </div>\n                            <% if ( title == 1 || price == 1 ) { %>\n                                <div class="info clearfix <%- title == \'1\' ? \'\' : \'info-no-title\' %> <%- price == \'1\' ? \'info-price\' : \'info-no-price\' %>">\n                                    <% if (price == \'1\') { %>\n                                        <p class="goods-title"><%- item.title %></p>\n                                        <p class="goods-price"><em>￥<%= item.price %></em></p>\n                                        <p class="goods-price-taobao"></p>  \n                                    <% } %>     \n                                    <% if (price == \'0\') { %>\n                                        <p class="goods-title"><%- item.title %></p>\n                                        <p class="goods-price"></p>\n                                        <p class="goods-price-taobao"></p>  \n                                    <% } %>\n                                </div>\n                            <% }%>\n                            <% if ( buy_btn && showtype != \'normal\') { %>  \n                                <div class="goods-buy btn<%-buy_btn_type %> <%-title == \'1\' && price == \'0\'? \'info-title info-no-price\' : \'\' %>"></div>\n                            <% } %>\n                            <% if ( is_show_wish_btn ) { %>  \n                                <div class="goods-wish btn-wish"></div>\n                            <% } %>\n                        </a>\n                    </li>\n                <% } else { %>\n                <!-- 小图 -->\n                    <li class="goods-card small-pic <%-showtype %>">\n                        <a href="javascript: void(0);" class="link js-goods clearfix">\n                            <div class="photo-block">\n                                <img class="goods-photo js-goods-lazy" src="<%= item.image_url %>" />\n                            </div>\n                            <% if ( !(price == 0 && ((showtype == \'normal\' ) || showtype != \'normal\' && title == 0 ))) { %>\n                                <div class="info clearfix <%- title == \'1\'? \'\' : \'info-no-title\' %>">\n                                    <% if (price == \'1\') { %>\n                                        <p class="goods-title"><%- item.title %></p>\n                                        <p class="goods-price"><em>￥<%= item.price %></em></p>\n                                        <p class="goods-price-taobao"></p>  \n                                    <% } %>\n                                    <% if (price == \'0\') { %>\n                                        <p class="goods-title"><%- item.title %></p>\n                                        <p class="goods-price"></p>\n                                        <p class="goods-price-taobao"></p>  \n                                    <% } %> \n                                </div>\n                            <% }%>\n                            <% if ( buy_btn && showtype != \'normal\' ) { %>  \n                                <div class="goods-buy btn<%-buy_btn_type %>"></div>\n                                <% if ( title && !price) { %>\n                                    <div class=\'buy-tag-space\'></div>\n                                <% } %>\n                            <% } %>\n                            <% if ( is_show_wish_btn ) { %>  \n                                <div class="goods-wish btn-wish"></div>\n                            <% } %>\n                        </a>\n                    </li>\n                <% } %>\n            <% }); %>\n        <% } else if (size == \'3\') { %>\n            <!-- 列表 -->\n            <% _.each(goods, function(item, index) { %>\n                <li class="goods-card <%-showtype %>">\n                    <a href="javascript: void(0);" class="link js-goods clearfix">\n                       <div class="photo-block">\n                           <img class="goods-photo js-goods-lazy" src="<%= item.image_url %>"/>\n                       </div>\n                       <div class="info">\n                            <p class="goods-title"><%- item.title %></p>\n                            <p class="goods-price"><em>￥<%= item.price %></em></p>  \n                            <p class="goods-price-taobao"></p>         \n                            <% if ( buy_btn ) { %>  \n                                <div class="goods-buy btn<%-buy_btn_type %>"></div>\n                            <% } %>\n                            <% if ( is_show_wish_btn ) { %>  \n                                <div class="goods-wish btn-wish"></div>\n                            <% } %>\n                       </div>                  \n                    </a>\n                </li>      \n            <% }); %>\n        <% } %>\n    </ul>\n    <div class="component-border"></div>\n</div>\n<div class="actions">\n    <div class="actions-wrap"><span class="action edit">编辑</span><span class="action add">加内容</span><span class="action delete">删除</span></div>\n</div>\n<div class="sort">\n    <i class="sort-handler"></i>\n</div>\n'
}),define("components/showcase/2.0.0/goods/views/show", ["require", "underscore", "components/showcase/2.0.0/base/views/show_base", "text!components/showcase/2.0.0/goods/templates/show.html", "core/utils"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/show_base"), i = e("text!components/showcase/2.0.0/goods/templates/show.html"), s = e("core/utils");
    return n.extend({
        template: t.template(i),
        templateHelpers: {fullfillImage: s.fullfillImage},
        serializeData: function () {
            var e = this.model.toJSON();
            return t.isEmpty(e.goods) && (1 == this.model.get("size") ? e.goods = [{
                id: null,
                url: null,
                image_url: "http://imgqn.koudaitong.com/upload_files/2013/11/27/138554366971566702.jpg",
                price: "379.00",
                title: "此处显示商品名称",
                sub_title: "此处显示商品描述"
            }, {
                id: null,
                url: null,
                image_url: "http://imgqn.koudaitong.com/upload_files/2013/09/27/138029081159828528.jpg",
                price: "5.50",
                title: "此处显示商品名称",
                sub_title: "此处显示商品描述"
            }, {
                id: null,
                url: null,
                image_url: "http://imgqn.koudaitong.com/upload_files/2013/09/27/138029095601969662.jpg",
                price: "32.00",
                title: "此处显示商品名称",
                sub_title: "此处显示商品描述"
            }, {
                id: null,
                url: null,
                image_url: "http://imgqn.koudaitong.com/upload_files/2013/10/09/138130084954645499.jpg",
                price: "60.00",
                title: "此处显示商品名称",
                sub_title: "此处显示商品描述"
            }] : e.goods = [{
                id: null,
                url: null,
                image_url: "http://imgqn.koudaitong.com/upload_files/2013/11/27/138554366971566702.jpg",
                price: "379.00",
                title: "此处显示商品名称",
                sub_title: "此处显示商品描述"
            }, {
                id: null,
                url: null,
                image_url: "http://imgqn.koudaitong.com/upload_files/2013/09/27/138029081159828528.jpg",
                price: "5.50",
                title: "此处显示商品名称",
                sub_title: "此处显示商品描述"
            }, {
                id: null,
                url: null,
                image_url: "http://imgqn.koudaitong.com/upload_files/2013/09/27/138029095601969662.jpg",
                price: "60.00",
                title: "此处显示商品名称",
                sub_title: "此处显示商品描述"
            }]), e
        }
    })
}),define("tpl!components/showcase/2.0.0/goods_list/templates/show_goods_style", [], function () {
    return function (obj) {
        var __t, __p = "";
        Array.prototype.join;
        with (obj || {}) {
            __p += "";
            var showtype;
            showtype = 0 == size_type ? "card" : 1 == size_type ? "waterfall" : 3 == size_type ? "promotion" : "normal";
            var btn_type = 0;
            "1" == buy_btn && (btn_type = buy_btn_type);
            var is_show_wish_btn = "1" == show_wish_btn && 1 == window._global.isWishOpen, is_show_sub_title = "0" == size && "1" == show_sub_title, is_have_sub_title = is_show_sub_title, sub_title_class = is_show_sub_title ? "has-sub-title" : "";
            if (__p += "\n\n", "1" == size) {
                __p += "\n    ";
                var goodsSample = [{
                    image_url: "http://imgqn.koudaitong.com/upload_files/2013/11/27/138554366971566702.jpg",
                    price: "379.00",
                    price_tao: "原价：380.00",
                    title: "此处显示商品名称",
                    sub_title: "此处显示商品描述"
                }, {
                    image_url: "http://imgqn.koudaitong.com/upload_files/2013/09/27/138029081159828528.jpg",
                    price: "5.50",
                    price_tao: "原价：8.00",
                    title: "此处显示商品名称",
                    sub_title: "此处显示商品描述"
                }, {
                    image_url: "http://imgqn.koudaitong.com/upload_files/2013/09/27/138029095601969662.jpg",
                    price: "32.00",
                    price_tao: "原价：60.00",
                    title: "此处显示商品名称",
                    sub_title: "此处显示商品描述"
                }, {
                    image_url: "http://imgqn.koudaitong.com/upload_files/2013/10/09/138130084954645499.jpg",
                    price: "60.00",
                    price_tao: "原价：80.00",
                    title: "此处显示商品名称",
                    sub_title: "此处显示商品描述"
                }];
                __p += "\n"
            } else {
                __p += "\n    ";
                var goodsSample = [{
                    image_url: "http://imgqn.koudaitong.com/upload_files/2013/11/27/138554366971566702.jpg",
                    price: "379.00",
                    title: "此处显示商品名称",
                    sub_title: "此处显示商品描述"
                }, {
                    image_url: "http://imgqn.koudaitong.com/upload_files/2013/09/27/138029081159828528.jpg",
                    price: "5.50",
                    title: "此处显示商品名称",
                    sub_title: "此处显示商品描述"
                }, {
                    image_url: "http://imgqn.koudaitong.com/upload_files/2013/10/09/138130084954645499.jpg",
                    price: "60.00",
                    title: "此处显示商品名称",
                    sub_title: "此处显示商品描述"
                }];
                __p += "\n"
            }
            __p += '\n<ul class="sc-goods-list clearfix size-' + (null == (__t = size) ? "" : __t) + " " + (null == (__t = showtype) ? "" : _.escape(__t)) + " " + (null == (__t = 3 == size ? "list" : "pic") ? "" : _.escape(__t)) + '">\n    <!-- 大图  -->\n    ', "0" == size ? (__p += "\n        ", _.each(goodsSample, function (e, t) {
                __p += '\n            <li class="goods-card big-pic ' + (null == (__t = showtype) ? "" : _.escape(__t)) + " " + (null == (__t = sub_title_class) ? "" : __t) + '">\n                <a href="javascript: void(0);" class="link js-goods clearfix">\n                    <div class="photo-block">\n                        <img class="goods-photo js-goods-lazy" src="' + (null == (__t = e.image_url) ? "" : __t) + '" />\n                    </div>\n                    ',
                (1 == title || 1 == price || is_have_sub_title) && (__p += '\n                        <div class="info clearfix ' + (null == (__t = "1" == title ? "" : "info-no-title") ? "" : _.escape(__t)) + " " + (null == (__t = "1" == price ? "info-price" : "info-no-price") ? "" : _.escape(__t)) + " btn" + (null == (__t = btn_type) ? "" : __t) + '">\n                            ', "1" == price && (__p += '\n                                <p class="goods-title">' + (null == (__t = e.title) ? "" : _.escape(__t)) + '</p>\n                                <p class="goods-sub-title c-black ' + (null == (__t = is_have_sub_title ? "" : "hide") ? "" : __t) + '">' + (null == (__t = e.sub_title) ? "" : __t) + '</p>\n                                <p class="goods-price"><em>￥' + (null == (__t = e.price) ? "" : __t) + '</em></p>\n                                <p class="goods-price-taobao"></p>\n                            '), __p += "\n                            ", "0" == price && (__p += '\n                                <p class="goods-title">' + (null == (__t = e.title) ? "" : _.escape(__t)) + '</p>\n                                <p class="goods-sub-title c-black ' + (null == (__t = is_have_sub_title ? "" : "hide") ? "" : __t) + '">' + (null == (__t = e.sub_title) ? "" : __t) + '</p>\n                                <p class="goods-price "></p>\n                                <p class="goods-price-taobao"></p>\n                            '), __p += "\n                        </div>\n                    "), __p += "\n                    ", buy_btn && "normal" != showtype && (__p += '\n                        <div class="goods-buy btn' + (null == (__t = buy_btn_type) ? "" : _.escape(__t)) + " " + (null == (__t = "1" == title && "0" == price ? "info-title info-no-price" : "") ? "" : _.escape(__t)) + '"></div>\n                        ', title && !price && "card" != showtype && (__p += "\n                            <div class='buy-tag-space'></div>\n                        "), __p += "\n                    "), __p += "\n                    ", is_show_wish_btn && (__p += '\n                        <div class="goods-wish btn-wish"></div>\n                    '), __p += "\n                </a>\n            </li>\n        "
            }), __p += "\n    <!-- 小图 -->\n    ") : "1" == size && "waterfall" != showtype ? (__p += "\n        ", _.each(goodsSample, function (e, t) {
                __p += '\n            <li class="goods-card small-pic ' + (null == (__t = showtype) ? "" : _.escape(__t)) + '">\n                <a href="javascript: void(0);" class="link js-goods clearfix">\n                    <div class="photo-block">\n                        <img class="goods-photo js-goods-lazy" src="' + (null == (__t = e.image_url) ? "" : __t) + '" />\n                    </div>\n                    ', (0 != price || 0 != title && "promotion" != showtype && "normal" != showtype || "promotion" == showtype) && (__p += '\n                        <div class="info clearfix ' + (null == (__t = "1" == title ? "" : "info-no-title") ? "" : _.escape(__t)) + '">\n                            ', "1" == price && (__p += '\n                                <p class="goods-title">' + (null == (__t = e.title) ? "" : _.escape(__t)) + '</p>\n                                <p class="goods-price"><em>￥' + (null == (__t = e.price) ? "" : __t) + '</em></p>\n                                <p class="goods-price-taobao">' + (null == (__t = e.price_tao) ? "" : _.escape(__t)) + "</p>\n                            "), __p += "\n                            ", "0" == price && (__p += '\n                                <p class="goods-title">' + (null == (__t = e.title) ? "" : _.escape(__t)) + '</p>\n                                <p class="goods-price"></p>\n                                <p class="goods-price-taobao">' + (null == (__t = e.price_tao) ? "" : _.escape(__t)) + "</p>\n                            "), __p += "\n                        </div>\n                    "), __p += "\n                    ", buy_btn && "normal" != showtype && (__p += '\n                        <div class="goods-buy btn' + (null == (__t = buy_btn_type) ? "" : _.escape(__t)) + '">\n                            ' + (null == (__t = "promotion" == showtype ? "我要抢购" : "") ? "" : _.escape(__t)) + "\n                        </div>\n                        ", title && !price && "promotion" != showtype && (__p += "\n                            <div class='buy-tag-space'></div>\n                        "), __p += "\n                    "), __p += "\n                    ", is_show_wish_btn && (__p += '\n                        <div class="goods-wish btn-wish"></div>\n                    '), __p += "\n                </a>\n            </li>\n        "
            }), __p += "\n    ") : "1" == size && "waterfall" == showtype ? (__p += '\n\n        <li class="sc-waterfall-half clearfix">\n            <ul class="clearfix">\n            ', _.each(goodsSample, function (e, t) {
                __p += "\n            ", t % 2 != 1 && (__p += '\n                <li class="goods-card small-pic waterfall">\n                    <a href="javascript: void(0);" class="link js-goods clearfix">\n                        <div class="photo-block">\n                            <img class="goods-photo js-goods-lazy" src="' + (null == (__t = e.image_url) ? "" : __t) + '" style="height:' + (null == (__t = 145 + 30 * t) ? "" : __t) + 'px;"/>\n                        </div>\n                        ', (0 != price || "normal" == showtype || 0 != title) && (__p += '\n                            <div class="info clearfix ' + (null == (__t = "1" == title ? "" : "info-no-title") ? "" : _.escape(__t)) + '">\n                                ', "1" == price && (__p += '\n                                    <p class="goods-title">' + (null == (__t = e.title) ? "" : _.escape(__t)) + '</p>\n                                    <p class="goods-price"><em>￥' + (null == (__t = e.price) ? "" : __t) + '</em></p>\n                                    <p class="goods-price-taobao"></p>\n                                '), __p += "\n                                ", "0" == price && (__p += '\n                                    <p class="goods-title">' + (null == (__t = e.title) ? "" : _.escape(__t)) + '</p>\n                                    <p class="goods-price"></p>\n                                    <p class="goods-price-taobao"></p>\n                                '), __p += "\n                            </div>\n                        "), __p += "\n                        ", buy_btn && "normal" != showtype && (__p += '\n                            <div class="goods-buy btn' + (null == (__t = buy_btn_type) ? "" : _.escape(__t)) + '"></div>\n                            ', title && !price && (__p += "\n                                <div class='buy-tag-space'></div>\n                            "), __p += "\n                        "), __p += "\n                        ", is_show_wish_btn && (__p += '\n                            <div class="goods-wish btn-wish"></div>\n                        '), __p += "\n                    </a>\n                </li>\n            "), __p += "\n            "
            }), __p += '\n            </ul>\n        </li>\n        <li class="sc-waterfall-half clearfix">\n            <ul class="clearfix">\n            ', _.each(goodsSample, function (e, t) {
                __p += "\n            ", t % 2 == 1 && (__p += '\n                <li class="goods-card small-pic waterfall">\n                    <a href="javascript: void(0);" class="link js-goods clearfix">\n                        <div class="photo-block">\n                            <img class="goods-photo js-goods-lazy" src="' + (null == (__t = e.image_url) ? "" : __t) + '" style="height:' + (null == (__t = 145 + 10 * t) ? "" : __t) + 'px;"/>\n                        </div>\n                        ', (0 != price || "normal" == showtype || 0 != title) && (__p += '\n                            <div class="info clearfix ' + (null == (__t = "1" == title ? "" : "info-no-title") ? "" : _.escape(__t)) + '">\n                                ', "1" == price && (__p += '\n                                    <p class="goods-title">' + (null == (__t = e.title) ? "" : _.escape(__t)) + '</p>\n                                    <p class="goods-price"><em>￥' + (null == (__t = e.price) ? "" : __t) + '</em></p>\n                                    <p class="goods-price-taobao"></p>\n                                '), __p += "\n                                ", "0" == price && (__p += '\n                                    <p class="goods-title">' + (null == (__t = e.title) ? "" : _.escape(__t)) + '</p>\n                                    <p class="goods-price"></p>\n                                    <p class="goods-price-taobao"></p>\n                                '), __p += "\n                            </div>\n                        "), __p += "\n                        ", buy_btn && "normal" != showtype && (__p += '\n                            <div class="goods-buy btn' + (null == (__t = buy_btn_type) ? "" : _.escape(__t)) + '"></div>\n                            ', title && !price && (__p += "\n                                <div class='buy-tag-space'></div>\n                            "), __p += "\n                        "), __p += "\n                        ", is_show_wish_btn && (__p += '\n                            <div class="goods-wish btn-wish"></div>\n                        '), __p += "\n                    </a>\n                </li>\n            "), __p += "\n            "
            }), __p += "\n            </ul>\n        </li>\n    ") : "2" == size ? (__p += "\n        <!-- 一大两小 -->\n        ", _.each(goodsSample, function (e, t) {
                __p += "\n            ", (t + 1) % 3 === 1 ? (__p += '\n                <!-- 大图 -->\n                <li class="goods-card big-pic ' + (null == (__t = showtype) ? "" : _.escape(__t)) + '">\n                    <a href="javascript: void(0);" class="link js-goods clearfix">\n                        <div class="photo-block">\n                            <img class="goods-photo js-goods-lazy" src="' + (null == (__t = e.image_url) ? "" : __t) + '" />\n                        </div>\n                        ', (1 == title || 1 == price) && (__p += '\n                            <div class="info clearfix ' + (null == (__t = "1" == title ? "" : "info-no-title") ? "" : _.escape(__t)) + " " + (null == (__t = "1" == price ? "info-price" : "info-no-price") ? "" : _.escape(__t)) + '">\n                                ', "1" == price && (__p += '\n                                    <p class="goods-title">' + (null == (__t = e.title) ? "" : _.escape(__t)) + '</p>\n                                    <p class="goods-price"><em>￥' + (null == (__t = e.price) ? "" : __t) + '</em></p>\n                                    <p class="goods-price-taobao"></p>\n                                '), __p += "\n                                ", "0" == price && (__p += '\n                                    <p class="goods-title">' + (null == (__t = e.title) ? "" : _.escape(__t)) + '</p>\n                                    <p class="goods-price"></p>\n                                    <p class="goods-price-taobao"></p>\n                                '), __p += "\n                            </div>\n                        "), __p += "\n                        ", buy_btn && "normal" != showtype && (__p += '\n                            <div class="goods-buy btn' + (null == (__t = buy_btn_type) ? "" : _.escape(__t)) + " " + (null == (__t = "1" == title && "0" == price ? "info-title info-no-price" : "") ? "" : _.escape(__t)) + '"></div>\n                        '), __p += "\n                        ", is_show_wish_btn && (__p += '\n                            <div class="goods-wish btn-wish"></div>\n                        '), __p += "\n                    </a>\n                </li>\n            ") : (__p += '\n            <!-- 小图 -->\n                <li class="goods-card small-pic ' + (null == (__t = showtype) ? "" : _.escape(__t)) + '">\n                    <a href="javascript: void(0);" class="link js-goods clearfix">\n                        <div class="photo-block">\n                            <img class="goods-photo js-goods-lazy" src="' + (null == (__t = e.image_url) ? "" : __t) + '" />\n                        </div>\n                        ', (0 != price || "normal" != showtype && ("normal" == showtype || 0 != title)) && (__p += '\n                            <div class="info clearfix ' + (null == (__t = "1" == title ? "" : "info-no-title") ? "" : _.escape(__t)) + '">\n                                ', "1" == price && (__p += '\n                                    <p class="goods-title">' + (null == (__t = e.title) ? "" : _.escape(__t)) + '</p>\n                                    <p class="goods-price"><em>￥' + (null == (__t = e.price) ? "" : __t) + '</em></p>\n                                    <p class="goods-price-taobao"></p>\n                                '), __p += "\n                                ", "0" == price && (__p += '\n                                    <p class="goods-title">' + (null == (__t = e.title) ? "" : _.escape(__t)) + '</p>\n                                    <p class="goods-price"></p>\n                                    <p class="goods-price-taobao"></p>\n                                '), __p += "\n                            </div>\n                        "), __p += "\n                        ", buy_btn && "normal" != showtype && (__p += '\n                            <div class="goods-buy btn' + (null == (__t = buy_btn_type) ? "" : _.escape(__t)) + '"></div>\n                            ', title && !price && (__p += "\n                                <div class='buy-tag-space'></div>\n                            "), __p += "\n                        "), __p += "\n                        ", is_show_wish_btn && (__p += '\n                            <div class="goods-wish btn-wish"></div>\n                        '), __p += "\n                    </a>\n                </li>\n            "), __p += "\n        "
            }), __p += "\n    ") : "3" == size && (__p += "\n        <!-- 列表 -->\n        ", _.each(goodsSample, function (e, t) {
                __p += '\n            <li class="goods-card ' + (null == (__t = showtype) ? "" : _.escape(__t)) + '">\n                <a href="javascript: void(0);" class="link js-goods clearfix">\n                   <div class="photo-block">\n                       <img class="goods-photo js-goods-lazy" src="' + (null == (__t = e.image_url) ? "" : __t) + '"/>\n                   </div>\n                   <div class="info">\n                        <p class="goods-title">' + (null == (__t = e.title) ? "" : _.escape(__t)) + '</p>\n                        <p class="goods-price"><em>￥' + (null == (__t = e.price) ? "" : __t) + '</em></p>\n                        <p class="goods-price-taobao"></p>\n                        ', buy_btn && (__p += '\n                            <div class="goods-buy btn' + (null == (__t = buy_btn_type) ? "" : _.escape(__t)) + '"></div>\n                        '), __p += "\n                        ", is_show_wish_btn && (__p += '\n                            <div class="goods-wish btn-wish"></div>\n                        '), __p += "\n                   </div>\n                </a>\n            </li>\n        "
            }), __p += "\n    "), __p += "\n</ul>\n"
        }
        return __p
    }
}),define("components/showcase/2.0.0/goods_list/views/show_goods_style", ["require", "marionette", "tpl!../templates/show_goods_style"], function (e) {
    var t = e("marionette");
    return t.ItemView.extend({template: e("tpl!../templates/show_goods_style")})
}),define("tpl!components/showcase/2.0.0/goods_list/templates/show", [], function () {
    return function (obj) {
        var __p = "";
        Array.prototype.join;
        with (obj || {})__p += '<div class="control-group">\n    <div class="js-goods-style-region"></div>\n</div>\n<div class="actions">\n    <div class="actions-wrap"><span class="action edit">编辑</span><span class="action add">加内容</span><span class="action delete">删除</span></div>\n</div>\n<div class="sort">\n    <i class="sort-handler"></i>\n</div>\n';
        return __p
    }
}),define("components/showcase/2.0.0/goods_list/views/show", ["require", "underscore", "components/showcase/2.0.0/base/views/show_base", "./show_goods_style", "tpl!../templates/show"], function (e) {
    var t = (e("underscore"), e("components/showcase/2.0.0/base/views/show_base")), n = e("./show_goods_style");
    return t.extend({
        template: e("tpl!../templates/show"),
        regions: {goodsStyleRegion: ".js-goods-style-region"},
        onRender: function () {
            this.goodsStyleRegion.show(new n({model: this.model}))
        }
    })
}),define("tpl!components/showcase/2.0.0/goods_template_split/templates/show", [], function () {
    return function (obj) {
        var __p = "";
        Array.prototype.join;
        with (obj || {})__p += '<div class="control-group">\n    <div class="custom-goods-ad-split goods-template-block">\n        <p>商品详情区</p>\n        <p class="c-gray">每个商品独立编辑</p>\n    </div>\n    <div class="component-border"></div>\n</div>\n<div class="sort">\n    <i class="sort-handler"></i>\n</div>\n';
        return __p
    }
}),define("components/showcase/2.0.0/goods_template_split/views/show", ["require", "components/showcase/2.0.0/base/views/show_base", "tpl!../templates/show"], function (e) {
    var t = e("components/showcase/2.0.0/base/views/show_base");
    return t.extend({template: e("tpl!../templates/show")})
}),define("text!components/showcase/2.0.0/image_ad/templates/show.html", [], function () {
    return '<div class="control-group">\n    <% if (sub_entry.length < 1) { %>\n        <% if (show_method == \'0\') {%>\n        <div class="custom-image-swiper">\n            <div class="swiper-container" style="height: 80px">\n                <div class="swiper-wrapper">\n                    <img style="max-height: 80px; display: block;" src="http://imgqn.koudaitong.com/upload_files/2013/10/09/138129843442351477.jpg">\n                </div>\n            </div>\n        </div>\n        <% } else { %>\n        <ul class="custom-image clearfix">\n            <li>\n                <img src="http://imgqn.koudaitong.com/upload_files/2013/10/09/138129928109524248.jpg" style="display: block;">\n            </li>\n        </ul>\n        <% } %>\n    <% } else { %>\n        <% if (show_method == \'0\') { %>\n            <% if (sub_entry && sub_entry.length > 0) { %>\n            <div class="custom-image-swiper">\n                <div class="swiper-container" style="height: <%- height || 160 %>px">\n                    <div class="swiper-wrapper">\n                    </div>\n                </div>\n            </div>\n            <% } %>\n            <% if (sub_entry && sub_entry.length > 1) { %>\n            <div class="swiper-pagination">\n                <span class="swiper-pagination-switch swiper-active-switch"></span>\n                <% _.times(sub_entry.length - 1, function() { %>\n                    <span class="swiper-pagination-switch"></span>\n                <% }); %>\n            </div>\n            <% } %>\n        <% } else { %>\n        <ul class="custom-image clearfix">\n\n        </ul>\n        <% } %>\n    <% } %>\n    <div class="component-border"></div>\n</div>\n<div class="actions">\n    <div class="actions-wrap"><span class="action edit">编辑</span><span class="action add">加内容</span><span class="action delete">删除</span></div>\n</div>\n<div class="sort">\n    <i class="sort-handler"></i>\n</div>\n'
}),define("text!components/showcase/2.0.0/image_ad/templates/show_item.html", [], function () {
    return '<% if (show_method == \'0\') { %>\n    <a href="javascript: void(0);" style="height: <%- Math.round(height) || 160 %>px;">\n        <% if (title !== \'\') { %>\n            <h3 class="title"><%- title %></h3>\n        <% } %>\n        <img src="<%= image_url %>" style="max-height: <%- Math.round(height) || 160 %>px;">\n    </a>\n<% } else { %>\n    <% if (title !== \'\') { %>\n    <h3 class="title"><%- title %></h3>\n    <% } %>\n    <img src="<%= image_url %>">\n<% } %>\n'
}),define("components/showcase/2.0.0/image_ad/views/show_item", ["require", "underscore", "marionette", "text!components/showcase/2.0.0/image_ad/templates/show_item.html", "core/utils"], function (e) {
    var t = e("underscore"), n = e("marionette"), i = e("text!components/showcase/2.0.0/image_ad/templates/show_item.html"), s = e("core/utils");
    return n.ItemView.extend({
        tagName: function () {
            return "0" == this.options.parent.get("show_method") ? "div" : "li"
        }, className: function () {
            return "0" == this.options.parent.get("show_method") ? "swiper-slide" : "0" == this.options.parent.get("size") ? "" : "custom-image-small"
        }, attributes: function () {
            var e = this;
            return {
                style: function () {
                    return "0" == e.options.parent.get("show_method") ? "height: " + e.options.parent.get("height") + "px" : void 0
                }
            }
        }, template: t.template(i), initialize: function (e) {
            e = e || {}, this.parent = e.parent, this.listenTo(this.model, "change", this.render), this.listenTo(this.model, "destroy", this.remove)
        }, serializeData: function () {
            var e = t.clone(this.model.attributes);
            t.extend(e, {
                show_method: this.parent.get("show_method"),
                size: this.parent.get("size"),
                height: this.parent.get("height")
            });
            var n = this.model.get("image_url");
            return n = n && s.fullfillImage(n), e.image_url = n, e.image_thumb_url = n, e
        }
    })
}),define("components/showcase/2.0.0/image_ad/views/show", ["require", "underscore", "components/showcase/2.0.0/base/views/show_base", "text!components/showcase/2.0.0/image_ad/templates/show.html", "components/showcase/2.0.0/image_ad/views/show_item"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/show_base"), i = e("text!components/showcase/2.0.0/image_ad/templates/show.html"), s = e("components/showcase/2.0.0/image_ad/views/show_item");
    return n.extend({
        template: t.template(i), onInit: function () {
            this.listenTo(this.model.get("sub_entry"), "reset update remove", this.render)
        }, onBeforeRender: function () {
            this.model.calculateImage()
        }, onRender: function () {
            this.refreshOptions()
        }, refreshOptions: function () {
            var e, t = this;
            e = this.$("0" == this.model.get("show_method") ? ".swiper-wrapper" : ".custom-image"), this.model.get("sub_entry").length > 0 && e.empty(), this.model.get("sub_entry").each(function (n) {
                var i = new s({model: n, parent: t.model});
                e.append(i.render().el)
            })
        }
    })
}),define("text!components/showcase/2.0.0/nav/templates/show.html", [], function () {
    return '<div class="control-group">\n    <% if (sub_entry.length < 1) { %>\n\n    <% } else { %>\n        <ul class="custom-nav-4 clearfix">\n\n        </ul>\n    <% } %>\n    <div class="component-border"></div>\n</div>\n<div class="actions">\n    <div class="actions-wrap"><span class="action edit">编辑</span><span class="action add">加内容</span><span class="action delete">删除</span></div>\n</div>\n<div class="sort">\n    <i class="sort-handler"></i>\n</div>\n'
}),define("text!components/showcase/2.0.0/nav/templates/show_item.html", [], function () {
    return '<span class="nav-img-wap">\n	<img src="<%= image_url %>">\n</span>\n<% if (title !== \'\') { %>\n<span class="title"><%- title %></span>\n<% } %>'
}),define("components/showcase/2.0.0/nav/views/show_item", ["require", "underscore", "marionette", "text!components/showcase/2.0.0/nav/templates/show_item.html", "core/utils"], function (e) {
    var t = e("underscore"), n = e("marionette"), i = e("text!components/showcase/2.0.0/nav/templates/show_item.html"), s = e("core/utils");
    return n.ItemView.extend({
        tagName: "li", template: t.template(i), initialize: function (e) {
            e = e || {}, this.parent = e.parent, this.listenTo(this.model, "change", this.render), this.listenTo(this.model, "destroy", this.remove)
        }, serializeData: function () {
            var e = t.clone(this.model.attributes), n = this.model.get("image_url");
            return n = n && s.fullfillImage(n), e.image_url = n, e.image_thumb_url = n, e
        }
    })
}),define("components/showcase/2.0.0/nav/views/show", ["require", "underscore", "components/showcase/2.0.0/base/views/show_base", "text!components/showcase/2.0.0/nav/templates/show.html", "components/showcase/2.0.0/nav/views/show_item"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/show_base"), i = e("text!components/showcase/2.0.0/nav/templates/show.html"), s = e("components/showcase/2.0.0/nav/views/show_item");
    return n.extend({
        template: t.template(i), onInit: function () {
            var e = this;
            this.listenTo(this.model.get("sub_entry"), "add", function (t, n) {
                var i = new s({model: t, parent: e.model}), o = this.$(".custom-nav-4"), a = n.indexOf(t);
                0 === a ? i.render().$el.appendTo(o) : i.render().$el.insertAfter(o.children().eq(a - 1)), e.render()
            }), this.listenTo(this.model.get("sub_entry"), "remove", this.render), this.listenTo(this.model.get("sub_entry"), "reset", this.render)
        }, onRender: function () {
            this.refreshOptions()
        }, refreshOptions: function () {
            var e = this, t = this.$(".custom-nav-4");
            this.model.get("sub_entry").length > 0 && t.empty(), this.model.get("sub_entry").each(function (n) {
                var i = new s({model: n, parent: e.model});
                t.append(i.render().el)
            })
        }
    })
}),define("text!components/showcase/2.0.0/showcase/templates/show.html", [], function () {
    return '<div class="control-group">\n    <% if (sub_entry.length < 1) { %>\n\n    <% } else { %>\n    <div class="custom-showcase-wrap custom-showcase-wrap-<%= mode %>">\n        <% if (title) { %>\n        <div class="custom-showcase-wrap-title">\n            <%= title %>\n        </div>\n        <% } %>\n        <div class="custom-showcase-body">\n            <ul class="custom-showcase clearfix">\n\n            </ul>\n            <% if (body_title) { %>\n            <div class="custom-showcase-body-title text-center">\n                <%= body_title %>\n            </div>\n            <% } %>\n            <% if (body_desc) { %>\n            <p class="custom-showcase-body-desc text-center">\n                <%= body_desc %>\n            </p>\n            <% } %>\n        </div>\n    </div>\n    <% } %>\n    <div class="component-border"></div>\n</div>\n<div class="actions">\n    <div class="actions-wrap"><span class="action edit">编辑</span><span class="action add">加内容</span><span class="action delete">删除</span></div>\n</div>\n<div class="sort">\n    <i class="sort-handler"></i>\n</div>\n'
}),define("text!components/showcase/2.0.0/showcase/templates/show_item.html", [], function () {
    return '<img src="<%= fullfillImage(image_url) %>">\n<% if (title !== \'\') { %>\n<span class="title"><%- title %></span>\n<% } %>\n'
}),define("components/showcase/2.0.0/showcase/views/show_item", ["require", "underscore", "marionette", "text!components/showcase/2.0.0/showcase/templates/show_item.html", "core/utils"], function (e) {
    var t = e("underscore"), n = e("marionette"), i = e("text!components/showcase/2.0.0/showcase/templates/show_item.html"), s = e("core/utils");
    return n.ItemView.extend({
        tagName: "li", className: function () {
            return 0 === this.model.index() ? "custom-showcase-big" : "custom-showcase-small"
        }, template: t.template(i), templateHelpers: {fullfillImage: s.fullfillImage}, initialize: function () {
            this.listenTo(this.model, "change", this.render)
        }
    })
}),define("components/showcase/2.0.0/showcase/views/show", ["require", "underscore", "components/showcase/2.0.0/base/views/show_base", "text!components/showcase/2.0.0/showcase/templates/show.html", "components/showcase/2.0.0/showcase/views/show_item"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/show_base"), i = e("text!components/showcase/2.0.0/showcase/templates/show.html"), s = e("components/showcase/2.0.0/showcase/views/show_item");
    return n.extend({
        template: t.template(i), onInit: function () {
            this.listenTo(this.model.get("sub_entry"), "add", function (e) {
                var t = new s({model: e}), n = this.$(".custom-showcase"), i = e.index();
                0 === i ? t.render().$el.appendTo(n) : t.render().$el.insertAfter(n.children().eq(i - 1))
            }), this.listenTo(this.model.get("sub_entry"), "remove", this.render), this.listenTo(this.model.get("sub_entry"), "reset", this.render)
        }, onRender: function () {
            this.refreshOptions()
        }, refreshOptions: function () {
            var e = this.$(".custom-showcase");
            this.model.get("sub_entry").length > 0 && e.empty(), this.model.get("sub_entry").each(function (t) {
                var n = new s({model: t});
                e.append(n.render().el)
            })
        }
    })
}),define("text!components/showcase/2.0.0/level/templates/show.html", [], function () {
    return '<div class="control-group">\n    <div class="custom-level">\n        <img class="custom-level-img<% if (_.isUndefined(is_default) || is_default) { %> custom-level-img-blur<% } %>" src="<%= fullfillImage(image.url) %>">\n        <% if (show_level == \'1\' && show_point == \'1\') { %>\n            <div class="custom-level-title-section">\n                <h5 class="custom-level-title"><%= level_msg %>高级会员<br><%= point_msg %>100分</h5>\n            </div>\n        <% } else if (show_point == \'1\') { %>\n            <div class="custom-level-title-section">\n                <h5 class="custom-level-title"><%= point_msg %>100分</h5>\n            </div>\n        <% } else if (show_level == \'1\') { %>\n            <div class="custom-level-title-section">\n               <h5 class="custom-level-title"><%= level_msg %>高级会员</h5>\n            </div>\n        <% } %>\n    </div>\n    <div class="component-border"></div>\n</div>\n<div class="actions">\n    <div class="actions-wrap"><span class="action edit">编辑</span><span class="action add">加内容</span><span class="action delete">删除</span></div>\n</div>\n<div class="sort">\n    <i class="sort-handler"></i>\n</div>\n'
}),define("components/showcase/2.0.0/level/views/show", ["components/showcase/2.0.0/base/views/show_base", "text!components/showcase/2.0.0/level/templates/show.html", "core/utils"], function (e, t, n) {
    return e.extend({
        className: "app-field", template: _.template(t), onInit: function () {
            this.listenTo(this.model, "change", this.render), this.listenTo(this.model, "destroy", this.destroying), this.listenTo(this.model, "editing:error", this.showEditAndError)
        }, render: function () {
            return this.$el.html(this.template(_.extend({}, this.model.attributes, {fullfillImage: n.fullfillImage}))), this
        }
    })
}),define("text!components/showcase/2.0.0/link/templates/show.html", [], function () {
    return '<div class="control-group">\n    <% if (sub_entry.length < 1) { %>\n    <ul class="custom-nav clearfix">\n            <li>\n        <a class="clearfix" href="javascript: void(0);" target="_blank">\n            <span class="custom-nav-title">点此编辑第1条『关联链接』</span>\n                            <i class="pull-right right-arrow"></i>\n                    </a>\n    </li>\n            <li>\n        <a class="clearfix" href="javascript: void(0);" target="_blank">\n            <span class="custom-nav-title">点此编辑第2条『关联链接』</span>\n                            <i class="pull-right right-arrow"></i>\n                    </a>\n    </li>\n            <li>\n        <a class="clearfix" href="javascript: void(0);" target="_blank">\n            <span class="custom-nav-title">点此编辑第n条『关联链接』</span>\n                            <i class="pull-right right-arrow"></i>\n                    </a>\n    </li>\n    </ul>\n    <% } %>\n    <ul class="custom-link clearfix"></ul>\n    <div class="component-border"></div>\n</div>\n<div class="actions">\n    <div class="actions-wrap"><span class="action edit">编辑</span><span class="action add">加内容</span><span class="action delete">删除</span></div>\n</div>\n<div class="sort">\n    <i class="sort-handler"></i>\n</div>\n'
}),define("text!components/showcase/2.0.0/link/templates/show_item.html", [], function () {
    return '<a href="javascript:;" class="custom-link-link">\n    <h3 class="title">\n        <% if (source_type == \'link\') { %>\n            <%- source_title %>\n        <% } else { %>\n            第<%= index %>条 <%- source_title %> 的『关联链接』\n        <% } %>\n    </h3>\n    <i class="pull-right right-arrow"></i>\n</a>\n'
}),define("components/showcase/2.0.0/link/views/show_item", ["require", "underscore", "marionette", "text!components/showcase/2.0.0/link/templates/show_item.html"], function (e) {
    var t = e("underscore"), n = e("marionette"), i = e("text!components/showcase/2.0.0/link/templates/show_item.html");
    return n.ItemView.extend({
        tagName: "li", template: t.template(i), initialize: function (e) {
            e = e || {}, this.index = e.index, this.listenTo(this.model, "change", this.render), this.listenTo(this.model, "destroy", this.remove)
        }, serializeData: function () {
            return t.extend(this.model.toJSON(), {index: this.index})
        }
    })
}),define("components/showcase/2.0.0/link/views/show", ["require", "underscore", "components/showcase/2.0.0/base/views/show_base", "text!components/showcase/2.0.0/link/templates/show.html", "components/showcase/2.0.0/link/views/show_item"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/show_base"), i = e("text!components/showcase/2.0.0/link/templates/show.html"), s = e("components/showcase/2.0.0/link/views/show_item");
    return n.extend({
        template: t.template(i), onInit: function () {
            this.listenTo(this.model.get("sub_entry"), "add", this.render), this.listenTo(this.model.get("sub_entry"), "reset", this.render), this.listenTo(this.model.get("sub_entry"), "change", this.refreshOptions)
        }, onRender: function () {
            this.refreshOptions()
        }, refreshOptions: function () {
            var e = this.$(".custom-link");
            e.empty(), this.model.get("sub_entry").each(function (n) {
                var i, o = n.get("source_type");
                o && (i = "link" == o ? 1 : +n.get("number"), t.times(i, function (t) {
                    var i = new s({model: n, index: t + 1});
                    e.append(i.render().el)
                }))
            })
        }
    })
}),define("text!components/showcase/2.0.0/text_nav/templates/show.html", [], function () {
    return '<div class="control-group">\n    <% if (sub_entry.length < 1) { %>\n    <ul class="custom-nav clearfix">\n        <li>\n            <a class="clearfix" href="javascript:void(0);">\n                <span class="custom-nav-title">点此添加一个『文本导航』</span><i class="pull-right right-arrow"></i>\n            </a>\n        </li>\n    </ul>\n    <% } %>\n    <ul class="custom-nav clearfix js-custom-nav"></ul>\n    <div class="component-border"></div>\n</div>\n<div class="actions">\n    <div class="actions-wrap"><span class="action edit">编辑</span><span class="action add">加内容</span><span class="action delete">删除</span></div>\n</div>\n<div class="sort">\n    <i class="sort-handler"></i>\n</div>\n';
}),define("text!components/showcase/2.0.0/text_nav/templates/show_item.html", [], function () {
    return '<a class="clearfix" href="javascript:void(0);"><span class="custom-nav-title"><%= title %></span><i class="pull-right right-arrow"></i></a>\n'
}),define("components/showcase/2.0.0/text_nav/views/show_item", ["require", "underscore", "marionette", "text!components/showcase/2.0.0/text_nav/templates/show_item.html"], function (e) {
    var t = e("underscore"), n = e("marionette"), i = e("text!components/showcase/2.0.0/text_nav/templates/show_item.html");
    return n.ItemView.extend({
        tagName: "li", template: t.template(i), initialize: function (e) {
            e = e || {}, this.parent = e.parent, this.listenTo(this.model, "change", this.render), this.listenTo(this.model, "destroy", this.remove)
        }
    })
}),define("components/showcase/2.0.0/text_nav/views/show", ["require", "underscore", "components/showcase/2.0.0/base/views/show_base", "text!components/showcase/2.0.0/text_nav/templates/show.html", "components/showcase/2.0.0/text_nav/views/show_item"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/show_base"), i = e("text!components/showcase/2.0.0/text_nav/templates/show.html"), s = e("components/showcase/2.0.0/text_nav/views/show_item");
    return n.extend({
        template: t.template(i), onInit: function () {
            this.listenTo(this.model.get("sub_entry"), "add", this.render), this.listenTo(this.model.get("sub_entry"), "reset", this.render)
        }, onRender: function () {
            this.refreshOptions()
        }, refreshOptions: function () {
            var e = this, t = this.$(".js-custom-nav");
            t.empty(), this.model.get("sub_entry").each(function (n) {
                var i = new s({model: n, parent: e.model});
                t.append(i.render().el)
            })
        }
    })
}),define("text!components/showcase/2.0.0/tag_list/templates/show.html", [], function () {
    return '<div class="control-group">\n    <div class="custom-tag-list clearfix">\n        <div class="custom-tag-list-menu-block js-collection-region" style="min-height: 323px;">\n        </div>\n        <div class="custom-tag-list-goods">\n            <ul class="custom-tag-list-goods-list">\n                <%\n                    var images_url = [\n                        \'http://imgqn.koudaitong.com/upload_files/2013/11/27/138554366971566702.jpg!60x60+2x.jpg\',\n                        \'http://imgqn.koudaitong.com/upload_files/2013/09/27/138029081159828528.jpg!60x60+2x.jpg\',\n                        \'http://imgqn.koudaitong.com/upload_files/2013/09/27/138029095601969662.jpg!60x60+2x.jpg\',\n                        \'http://imgqn.koudaitong.com/upload_files/2013/10/09/138130084954645499.jpg!60x60+2x.jpg\'\n                    ]; %>\n                <% _.each(images_url, function(url){ %>\n                <li class="custom-tag-list-single-goods clearfix">\n                    <div class="custom-tag-list-goods-img">\n                        <img src="<%= url %>" style="display: inline;">\n                    </div>\n                    <div class="custom-tag-list-goods-detail">\n                        <p class="custom-tag-list-goods-title">此处显示商品名称</p>\n                        <span class="custom-tag-list-goods-price">￥100.00</span>\n                        <a class="custom-tag-list-goods-buy" href="javascript:void(0)"><span></span></a>\n                    </div>\n                </li>\n                <% }); %>\n            </ul>\n        </div>\n    </div>\n</div>\n<div class="actions">\n    <div class="actions-wrap"><span class="action edit">编辑</span><span class="action add">加内容</span><span class="action delete">删除</span></div>\n</div>\n<div class="sort">\n    <i class="sort-handler"></i>\n</div>\n'
}),define("text!components/showcase/2.0.0/tag_list/templates/show_item.html", [], function () {
    return '<a href="javascript:;"><span><%= title %></span></a>\n'
}),define("components/showcase/2.0.0/tag_list/views/show_item", ["require", "underscore", "marionette", "text!components/showcase/2.0.0/tag_list/templates/show_item.html"], function (e) {
    var t = e("underscore"), n = e("marionette"), i = e("text!components/showcase/2.0.0/tag_list/templates/show_item.html");
    return n.ItemView.extend({
        tagName: "li", template: t.template(i), className: function () {
            return 0 === this.model.index() ? "current" : ""
        }, initialize: function (e) {
            e = e || {}, this.listenTo(this.model, "change", this.render)
        }, serializeData: function () {
            var e = this.model.toJSON();
            return t.extend(e, {index: this.model.index()})
        }
    })
}),define("text!components/showcase/2.0.0/tag_list/templates/show_empty.html", [], function () {
    return '<a href="javascript:;" class="current">商品组一</a>\n<a href="javascript:;">商品组二</a>\n<a href="javascript:;">商品组三</a>\n'
}),define("components/showcase/2.0.0/tag_list/views/show_empty", ["require", "underscore", "marionette", "text!components/showcase/2.0.0/tag_list/templates/show_empty.html"], function (e) {
    var t = e("underscore"), n = e("marionette"), i = e("text!components/showcase/2.0.0/tag_list/templates/show_empty.html");
    return n.ItemView.extend({tagName: "li", template: t.template(i)})
}),define("components/showcase/2.0.0/tag_list/views/show_collection", ["require", "marionette", "components/showcase/2.0.0/tag_list/views/show_item", "components/showcase/2.0.0/tag_list/views/show_empty"], function (e) {
    var t = e("marionette"), n = e("components/showcase/2.0.0/tag_list/views/show_item"), i = e("components/showcase/2.0.0/tag_list/views/show_empty");
    return t.CollectionView.extend({tagName: "ul", className: "custom-tag-list-side-menu", itemView: n, emptyView: i})
}),define("components/showcase/2.0.0/tag_list/views/show", ["require", "underscore", "components/showcase/2.0.0/base/views/show_base", "text!components/showcase/2.0.0/tag_list/templates/show.html", "components/showcase/2.0.0/tag_list/views/show_collection", "core/utils"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/show_base"), i = e("text!components/showcase/2.0.0/tag_list/templates/show.html"), s = e("components/showcase/2.0.0/tag_list/views/show_collection"), o = e("core/utils");
    return n.extend({
        template: t.template(i),
        templateHelpers: {fullfillImage: o.fullfillImage},
        regions: {collectionRegion: ".js-collection-region"},
        onInit: function () {
            this.listenTo(this.model.get("sub_entry"), "add", this.render), this.listenTo(this.model.get("sub_entry"), "reset", this.render)
        },
        onRender: function () {
            this.collectionRegion.show(new s({collection: this.model.get("sub_entry")}))
        }
    })
}),define("text!components/showcase/2.0.0/title/templates/show.html", [], function () {
    return '<div class="control-group">\n    <% if (title_template == \'0\') {%>\n        <% if (show_method == \'0\') { %>\n        <div class="<% if (color !== \'#ffffff\' && color !== \'#F9F9F9\') { %>custom-title-noline<% } %>"<% if (color !== \'#ffffff\') { %>style="background-color: <%= color %>"<% } %>>\n            <div class="custom-title text-left">\n                <h2 class="title"><%= title || \'点击编辑『标题』\' %><span class="custom-title-link-container"></span></h2>\n                <p class="sub_title"><%= sub_title %></p>\n            </div>\n        </div>\n        <% } else if (show_method == \'1\') { %>\n        <div class="<% if (color !== \'#ffffff\' && color !== \'#F9F9F9\') { %>custom-title-noline<% } %>"<% if (color !== \'#ffffff\') { %>style="background-color: <%= color %>"<% } %>>\n            <div class="custom-title text-center">\n                <h2 class="title"><%= title || \'点击编辑『标题』\' %><span class="custom-title-link-container"></span></h2>\n                <p class="sub_title"><%= sub_title %></p>\n            </div>\n        </div>\n        <% } else { %>\n        <div class="<% if (color !== \'#ffffff\' && color !== \'#F9F9F9\') { %>custom-title-noline<% } %>"<% if (color !== \'#ffffff\') { %>style="background-color: <%= color %>"<% } %>>\n            <div class="custom-title text-right">\n                <h2 class="title"><%= title || \'点击编辑『标题』\' %><span class="custom-title-link-container"></span></h2>\n                <p class="sub_title"><%= sub_title %></p>\n            </div>\n        </div>\n        <% } %>\n    <% } else { %>\n        <div>\n            <div class="custom-title text-left">\n                <h2 class="title"><%= title || \'点击编辑『标题』\' %></h2>\n                <% if(wx_title_date != \'\' || wx_title_author != \'\' || wx_title_link != \'\') {%>\n                <p class="sub_title"><span class="sub_title_date"><%= wx_title_date %></span><span class="sub_title_author"><%= wx_title_author %></span><a class="sub_title_link" href="javascript:;"><%= wx_title_link %></a></p>\n                <% } %>\n            </div>\n        </div>\n    <% } %>\n    <div class="component-border"></div>\n</div>\n<div class="actions">\n    <div class="actions-wrap"><span class="action edit">编辑</span><span class="action add">加内容</span><span class="action delete">删除</span></div>\n</div>\n<div class="sort">\n    <i class="sort-handler"></i>\n</div>\n'
}),define("text!components/showcase/2.0.0/title/templates/show_item.html", [], function () {
    return '<span class="gray">-</span> <a><%- title %></a>\n'
}),define("components/showcase/2.0.0/title/views/show_item", ["require", "underscore", "marionette", "text!components/showcase/2.0.0/title/templates/show_item.html"], function (e) {
    var t = e("underscore"), n = e("marionette"), i = e("text!components/showcase/2.0.0/title/templates/show_item.html");
    return n.ItemView.extend({
        tagName: "span",
        className: "custom-title-link",
        template: t.template(i),
        initialize: function () {
            this.listenTo(this.model, "change", this.render), this.listenTo(this.model, "destroy", this.remove)
        }
    })
}),define("components/showcase/2.0.0/title/views/show", ["require", "underscore", "components/showcase/2.0.0/base/views/show_base", "text!components/showcase/2.0.0/title/templates/show.html", "components/showcase/2.0.0/title/views/show_item"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/show_base"), i = e("text!components/showcase/2.0.0/title/templates/show.html"), s = e("components/showcase/2.0.0/title/views/show_item");
    return n.extend({
        template: t.template(i), onInit: function () {
            var e = this;
            this.listenTo(this.model.get("sub_entry"), "add", function (t, n) {
                var i = new s({
                    model: t,
                    parent: e.model
                }), o = this.$(".custom-title-link-container"), a = n.indexOf(t);
                0 === a ? i.render().$el.appendTo(o) : i.render().$el.insertAfter(o.children().eq(a - 1))
            })
        }, onRender: function () {
            this.refreshOptions()
        }, refreshOptions: function () {
            var e = this, t = this.$(".custom-title-link-container");
            t.empty(), this.model.get("sub_entry").each(function (n) {
                var i = new s({model: n, parent: e.model});
                t.append(i.render().el)
            })
        }
    })
}),define("text!components/showcase/2.0.0/component/templates/show.html", [], function () {
    return '<div class="control-group">\n    <% if (_.isEmpty(title)) { %>\n        <div class="custom-richtext">\n            点击编辑『自定义页面模块』\n        </div>\n    <% } %>\n    <div class="custom-richtext">\n        <%= title %>\n    </div>\n    <div class="component-border"></div>\n</div>\n<div class="actions">\n    <div class="actions-wrap"><span class="action edit">编辑</span><span class="action add">加内容</span><span class="action delete">删除</span></div>\n</div>\n<div class="sort">\n    <i class="sort-handler"></i>\n</div>\n'
}),define("components/showcase/2.0.0/component/views/show", ["require", "underscore", "components/showcase/2.0.0/base/views/show_base", "text!components/showcase/2.0.0/component/templates/show.html"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/show_base"), i = e("text!components/showcase/2.0.0/component/templates/show.html");
    return n.extend({template: t.template(i)})
}),define("text!components/showcase/2.0.0/search/templates/show.html", [], function () {
    return '<div class="control-group">\n    <div class="custom-search">\n        <form action="/" method="GET">\n            <input type="text" class="custom-search-input" placeholder="商品搜索：请输入商品关键字" disabled>\n            <button type="submit" class="custom-search-button">搜索</button>\n        </form>\n    </div>\n    <div class="component-border"></div>\n</div>\n<div class="actions">\n    <div class="actions-wrap"><span class="action edit">编辑</span><span class="action add">加内容</span><span class="action delete">删除</span></div>\n</div>\n<div class="sort">\n    <i class="sort-handler"></i>\n</div>\n'
}),define("components/showcase/2.0.0/search/views/show", ["require", "underscore", "components/showcase/2.0.0/base/views/show_base", "text!components/showcase/2.0.0/search/templates/show.html"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/show_base"), i = e("text!components/showcase/2.0.0/search/templates/show.html");
    return n.extend({template: t.template(i)})
}),define("text!components/showcase/2.0.0/line/templates/show.html", [], function () {
    return '<div class="control-group">\n    <div class="custom-line-wrap">\n        <hr class="custom-line" />\n    </div>\n</div>\n<div class="actions">\n    <div class="actions-wrap"><span class="action edit">编辑</span><span class="action add">加内容</span><span class="action delete">删除</span></div>\n</div>\n<div class="sort">\n    <i class="sort-handler"></i>\n</div>\n'
}),define("components/showcase/2.0.0/line/views/show", ["require", "underscore", "components/showcase/2.0.0/base/views/show_base", "text!components/showcase/2.0.0/line/templates/show.html"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/show_base"), i = e("text!components/showcase/2.0.0/line/templates/show.html");
    return n.extend({template: t.template(i)})
}),define("text!components/showcase/2.0.0/cube2/templates/show.html", [], function () {
    return '<div class="control-group custom-cube2-table">\n    <table>\n        <tbody>\n            <%= tableContent %>\n        </tbody>\n    </table>\n</div>\n<div class="actions">\n    <div class="actions-wrap"><span class="action edit">编辑</span><span class="action add">加内容</span><span class="action delete">删除</span></div>\n</div>\n<div class="sort">\n    <i class="sort-handler"></i>\n</div>\n'
}),define("components/showcase/2.0.0/cube2/views/show", ["require", "underscore", "components/showcase/2.0.0/base/views/show_base", "text!components/showcase/2.0.0/cube2/templates/show.html"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/show_base"), i = e("text!components/showcase/2.0.0/cube2/templates/show.html");
    return n.extend({
        template: t.template(i), onInit: function () {
            this.listenTo(this.model.get("sub_entry"), "add", this.render), this.listenTo(this.model.get("sub_entry"), "remove", this.render), this.$el.on("click", "td a", function (e) {
                e.preventDefault()
            })
        }, onBeforeRender: function () {
            this.model.denerateTableContent()
        }
    })
}),define("text!components/showcase/2.0.0/tpl_shop/templates/show.html", [], function () {
    return '<div class="control-group">\n    <div class="tpl-shop">\n        <div class="tpl-shop-header" style="<% if(backgroundImage) { %>background-image: url(<%- fullfillImage(backgroundImage) %>);<% } %> background-color: <%- backgroundColor %>;">\n            <div class="tpl-shop-title"><%- window._global.mp_data.team_name %></div>\n            <div class="tpl-shop-avatar">\n                <img src="<%- fullfillImage(window._global.mp_data.logo, \'!145x145.jpg\') %>" alt="">\n            </div>\n        </div>\n        <div class="tpl-shop-content">\n            <ul class="clearfix">\n                <li>\n                    <a href="javascript:;">\n                        <span class="count">0</span>\n                        <span class="text">全部商品</span>\n                    </a>\n                </li>\n                <li>\n                    <a href="javascript:;">\n                        <span class="count">0</span>\n                        <span class="text">上新商品</span>\n                    </a>\n                </li>\n                <li>\n                    <a href="javascript:;">\n                        <span class="count user"></span>\n                        <span class="text">我的订单</span>\n                    </a>\n                </li>\n            </ul>\n        </div>\n    </div>\n</div>\n<div class="actions">\n    <div class="actions-wrap">\n        <span class="action edit">编辑</span><span class="action add">加内容</span>\n    </div>\n</div>\n<div class="sort">\n    <i class="sort-handler"></i>\n</div>\n'
}),define("components/showcase/2.0.0/tpl_shop/views/show", ["require", "underscore", "components/showcase/2.0.0/base/views/show_base", "text!components/showcase/2.0.0/tpl_shop/templates/show.html", "core/utils"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/show_base"), i = e("text!components/showcase/2.0.0/tpl_shop/templates/show.html"), s = e("core/utils");
    return n.extend({template: t.template(i), templateHelpers: {fullfillImage: s.fullfillImage}})
}),define("text!components/showcase/2.0.0/tpl_weixin/templates/show.html", [], function () {
    return '<div class="control-group">\n    <div class="tpl-weixin">\n        <img src="<%= fullfillImage(background) %>">\n        <div class="js-collection-region">\n            <ul class="tpl-weixin-list clearfix" style="top: <%= top %>%;"></ul>\n        </div>\n    </div>\n</div>\n<div class="actions">\n    <div class="actions-wrap">\n        <span class="action edit">编辑</span><span class="action add">加内容</span>\n    </div>\n</div>\n<div class="sort">\n    <i class="sort-handler"></i>\n</div>\n'
}),define("text!components/showcase/2.0.0/tpl_weixin/templates/show_item.html", [], function () {
    return '<a href="javascript:;"><%- title %></a>'
}),define("components/showcase/2.0.0/tpl_weixin/views/show_item", ["require", "underscore", "marionette", "text!components/showcase/2.0.0/tpl_weixin/templates/show_item.html"], function (e) {
    var t = e("underscore"), n = e("marionette"), i = e("text!components/showcase/2.0.0/tpl_weixin/templates/show_item.html");
    return n.ItemView.extend({
        tagName: "li", className: function () {
            var e = this.model.index() + 1, t = "tpl-weixin-list-item tpl-weixin-list-item-" + e + " done";
            return t
        }, template: t.template(i), initialize: function () {
            this.listenTo(this.model, "change", this.render), this.listenTo(this.model, "destroy", this.remove)
        }
    })
}),define("components/showcase/2.0.0/tpl_weixin/views/show", ["require", "underscore", "components/showcase/2.0.0/base/views/show_base", "text!components/showcase/2.0.0/tpl_weixin/templates/show.html", "components/showcase/2.0.0/tpl_weixin/views/show_item", "core/utils"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/show_base"), i = e("text!components/showcase/2.0.0/tpl_weixin/templates/show.html"), s = e("components/showcase/2.0.0/tpl_weixin/views/show_item"), o = e("core/utils");
    return n.extend({
        template: t.template(i), templateHelpers: {fullfillImage: o.fullfillImage}, onInit: function () {
            var e = this;
            this.listenTo(this.model.get("sub_entry"), "add", function (t, n) {
                var i = new s({model: t, parent: e.model}), o = this.$(".tpl-weixin-list"), a = n.indexOf(t);
                0 === a ? i.render().$el.appendTo(o) : i.render().$el.insertAfter(o.children().eq(a - 1))
            }), this.listenTo(this.model.get("sub_entry"), "reset remove", this.render)
        }, onRender: function () {
            this.refreshOptions()
        }, refreshOptions: function () {
            var e = this, t = this.$(".tpl-weixin-list");
            t.empty(), this.model.get("sub_entry").each(function (n) {
                var i = new s({model: n, parent: e.model});
                t.append(i.render().el)
            })
        }
    })
}),define("text!components/showcase/2.0.0/tpl_fbb/templates/show.html", [], function () {
    return '<div class="control-group">\n    <style>\n        .tpl-fbb {\n            background-image: url(<%= fullfillImage(background) %>);\n            background-position: center top;\n            background-repeat: no-repeat;\n            background-size: 320px <%= height / (width / 320) %>px;\n            height: <%= height / (width / 320) %>px;\n        }\n        .swiper-wrapper {\n            width: 500px;\n        }\n    </style>\n    <div class="tpl-fbb">\n        <div class="swiper-container js-tpl-fbb js-collection-region">\n            <div class="swiper-wrapper clearfix js-subentry-list">\n\n            </div>\n        </div>\n    </div>\n    <div class="component-border"></div>\n</div>\n'
}),define("text!components/showcase/2.0.0/tpl_fbb/templates/show_item.html", [], function () {
    return '<a href="javascript:;"<% if (bg_image_url) { %> class="slide-bg" style="background-image: url(<%= fullfillImage(bg_image_url) %>)"<% } %>>\n    <% if (bg_image_url) { %>\n        <div class="swiper-item-bg"></div>\n    <% } %>\n    <div class="tpl-fbb-item-wrap">\n        <div class="tpl-fbb-item-name">\n            <%= title %>\n        </div>\n        <div class="tpl-fbb-item-line"></div>\n        <div class="tpl-fbb-item-icon">\n            <% if (icon_image_url) { %>\n                <img src="<%= fullfillImage(icon_image_url) %>" width="30" height="30">\n            <% } %>\n        </div>\n        <div class="tpl-fbb-item-text">\n            <%= text %>\n        </div>\n        <div class="tpl-fbb-item-date">\n            <%= date %>\n        </div>\n    </div>\n</a>\n'
}),define("components/showcase/2.0.0/tpl_fbb/views/show_item", ["require", "underscore", "marionette", "text!components/showcase/2.0.0/tpl_fbb/templates/show_item.html", "core/utils"], function (e) {
    var t = e("underscore"), n = e("marionette"), i = e("text!components/showcase/2.0.0/tpl_fbb/templates/show_item.html"), s = e("core/utils");
    return n.ItemView.extend({
        tagName: "div",
        className: "swiper-slide tpl-fbb-item done",
        template: t.template(i),
        templateHelpers: {fullfillImage: s.fullfillImage},
        initialize: function () {
            this.listenTo(this.model, "change", this.render)
        }
    })
}),define("components/showcase/2.0.0/tpl_fbb/views/show_collection", ["require", "marionette", "components/showcase/2.0.0/tpl_fbb/views/show_item"], function (e) {
    var t = e("marionette"), n = e("components/showcase/2.0.0/tpl_fbb/views/show_item");
    return t.CollectionView.extend({tagName: "ul", className: "swiper-wrapper clearfix", itemView: n})
}),define("components/showcase/2.0.0/tpl_fbb/views/show", ["require", "underscore", "components/showcase/2.0.0/base/views/show_base", "text!components/showcase/2.0.0/tpl_fbb/templates/show.html", "components/showcase/2.0.0/tpl_fbb/views/show_collection", "core/utils"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/show_base"), i = e("text!components/showcase/2.0.0/tpl_fbb/templates/show.html"), s = e("components/showcase/2.0.0/tpl_fbb/views/show_collection"), o = e("core/utils");
    return n.extend({
        template: t.template(i),
        templateHelpers: {fullfillImage: o.fullfillImage},
        regions: {collectionRegion: ".js-collection-region"},
        onRender: function () {
            this.collectionRegion.show(new s({collection: this.model.get("sub_entry"), layout: this}))
        }
    })
}),define("text!components/showcase/2.0.0/tpl_course/templates/show.html", [], function () {
    return '<div class="control-group">\n    <style>\n        .tpl-fbb {\n            background-image: url(<%= fullfillImage(background) %>);\n            background-position: center top;\n            background-repeat: no-repeat;\n            background-size: 320px <%= height / (width / 320) %>px;\n            height: <%= height / (width / 320) %>px;\n        }\n        .swiper-wrapper {\n            width: 500px;\n        }\n        .tpl-course {\n            position: relative;\n        }\n    </style>\n    <div class="tpl-fbb tpl-course">\n        <h1 class="tpl-course-title" style="color: <%- title_color %>"><%- title %></h1>\n        <h2 class="tpl-course-sub-title" style="color: <%- sub_title_color %>"><%- sub_title %></h2>\n        <div class="text-center butn-section" style="top: <%- top %>%;">\n            <a href="javascript:;" class="butn butn-xxlarge butn-primary butn-buy"><%- button_text %></a>\n        </div>\n        <div class="swiper-container js-tpl-fbb js-collection-region">\n\n        </div>\n    </div>\n</div>\n'
}),define("text!components/showcase/2.0.0/tpl_course/templates/show_item.html", [], function () {
    return '<a href="javascript:;"<% if (bg_image_url) { %> class="slide-bg" style="background-image: url(<%= bg_image_url %>)"<% } %>>\n    <% if (bg_image_url) { %>\n        <div class="swiper-item-bg"></div>\n    <% } %>\n    <div class="tpl-fbb-item-wrap">\n        <div class="tpl-fbb-item-name">\n            <%= title %>\n        </div>\n        <div class="tpl-fbb-item-line"></div>\n        <div class="tpl-fbb-item-icon">\n            <% if (icon_image_url) { %>\n                <img src="<%= icon_image_url %>" width="30" height="30">\n            <% } %>\n        </div>\n    </div>\n</a>'
}),define("components/showcase/2.0.0/tpl_course/views/show_item", ["require", "underscore", "marionette", "text!components/showcase/2.0.0/tpl_course/templates/show_item.html", "core/utils"], function (e) {
    var t = e("underscore"), n = e("marionette"), i = e("text!components/showcase/2.0.0/tpl_course/templates/show_item.html"), s = e("core/utils");
    return n.ItemView.extend({
        tagName: "div",
        className: "swiper-slide tpl-fbb-item done",
        template: t.template(i),
        initialize: function (e) {
            this.options = e || {}, this.listenTo(this.model, "change", this.render), this.listenTo(this.model, "destroy", this.remove)
        },
        serializeData: function () {
            var e = this.model.toJSON();
            return e.icon_image_url = s.fullfillImage(e.icon_image_url), e.bg_image_url = s.fullfillImage(e.bg_image_url), e
        }
    })
}),define("components/showcase/2.0.0/tpl_course/views/show_collection", ["require", "marionette", "components/showcase/2.0.0/tpl_course/views/show_item"], function (e) {
    var t = e("marionette"), n = e("components/showcase/2.0.0/tpl_course/views/show_item");
    return t.CollectionView.extend({tagName: "ul", className: "swiper-wrapper clearfix", itemView: n})
}),define("components/showcase/2.0.0/tpl_course/views/show", ["require", "underscore", "components/showcase/2.0.0/base/views/show_base", "text!components/showcase/2.0.0/tpl_course/templates/show.html", "components/showcase/2.0.0/tpl_course/views/show_collection", "core/utils"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/show_base"), i = e("text!components/showcase/2.0.0/tpl_course/templates/show.html"), s = e("components/showcase/2.0.0/tpl_course/views/show_collection"), o = e("core/utils");
    return n.extend({
        template: t.template(i),
        templateHelpers: {fullfillImage: o.fullfillImage},
        regions: {collectionRegion: ".js-collection-region"},
        serializeData: function () {
            var e = this.model.toJSON();
            return e.background = o.fullfillImage(e.background), e
        },
        onRender: function () {
            this.collectionRegion.show(new s({collection: this.model.get("sub_entry"), layout: this}))
        }
    })
}),define("text!components/showcase/2.0.0/tpl_wxd/templates/show.html", [], function () {
    return '<div class="control-group">\n    <div class="tpl-wxd">\n        <div class="tpl-wxd-header" style="background-image: url(<%- fullfillImage(backgroundImage) %>)">\n            <div class="tpl-wxd-title"><%- window._global.mp_data.team_name %></div>\n            <div class="tpl-wxd-avatar">\n                <img src="<%- fullfillImage(window._global.mp_data.logo) %>" alt="">\n            </div>\n        </div>\n    </div>\n</div>\n<div class="actions">\n    <div class="actions-wrap"><span class="action edit">编辑</span><span class="action add">加内容</span></div>\n</div>\n<div class="sort">\n    <i class="sort-handler"></i>\n</div>\n'
}),define("components/showcase/2.0.0/tpl_wxd/views/show", ["require", "underscore", "components/showcase/2.0.0/base/views/show_base", "text!components/showcase/2.0.0/tpl_wxd/templates/show.html", "core/utils"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/show_base"), i = e("text!components/showcase/2.0.0/tpl_wxd/templates/show.html"), s = e("core/utils");
    return n.extend({template: t.template(i), templateHelpers: {fullfillImage: s.fullfillImage}})
}),define("text!components/showcase/2.0.0/tpl_11_11/templates/show.html", [], function () {
    return '<div class="control-group">\n    <div class="tpl-11-11">\n        <div class="tpl-11-11-banner" style="<% if(banner) { %>background-image: url(<%= fullfillImage(banner) %>)<% } %>"></div>\n        <div class="tpl-11-11-title clearfix">\n            <span class="tpl-11-11-team-name"><%= _global.mp_data.team_name %></span>\n            <div class="pull-right">\n                <a href="javascript:;" class="tpl-11-11-follow">关注</a>\n            </div>\n        </div>\n        <ul class="tpl-11-11-coupon clearfix">\n            <% if(tradeincard.length) { %>\n                <% _.each(tradeincard, function(item) { %>\n                    <li>\n                        <a href="javascript:;">\n                            <div class="tpl-11-11-coupon-meta">\n                                <div class="tpl-11-11-coupon-meta-price"><span>￥</span><%= item.value %></div>\n                                <div class="tpl-11-11-coupon-meta-desc">\n                                    <% if(item.at_least) { %>\n                                        满<%= item.at_least %>元可用\n                                    <% } else { %>\n                                        无限制\n                                    <% } %>\n                                    \n                                </div>\n                            </div>\n                            <div class="tpl-11-11-coupon-get">马上领取</div>\n                        </a>\n                    </li>\n                <% }); %>\n            <% } else { %>\n                <% for(var i = 0; i < 3; i++) { %>\n                    <li>\n                        <a href="javascript:;">\n                            <div class="tpl-11-11-coupon-meta">\n                                <div class="tpl-11-11-coupon-meta-price"><span>￥</span>100</div>\n                                <div class="tpl-11-11-coupon-meta-desc">\n                                    满500元可用\n                                </div>\n                            </div>\n                            <div class="tpl-11-11-coupon-get">马上领取</div>\n                        </a>\n                    </li>\n                <% } %>\n            <% } %>\n        </ul>\n        <div class="custom-notice">\n            <div class="custom-notice-inner">\n                <div class="custom-notice-scroll">\n                    <span>\n                        公告：<%= notice ? _.escape(notice).replace(/\\s/g, \'&nbsp;\') : \'请填写内容，如果过长，将会在手机上滚动显示\' %>\n                    </span>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<div class="actions">\n    <div class="actions-wrap">\n        <span class="action edit">编辑</span><span class="action add">加内容</span>\n    </div>\n</div>\n<div class="sort">\n    <i class="sort-handler"></i>\n</div>\n'
}),define("components/showcase/2.0.0/tpl_11_11/views/show", ["require", "underscore", "components/showcase/2.0.0/base/views/show_base", "text!components/showcase/2.0.0/tpl_11_11/templates/show.html", "core/utils"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/show_base"), i = e("text!components/showcase/2.0.0/tpl_11_11/templates/show.html"), s = e("core/utils");
    return n.extend({template: t.template(i), templateHelpers: {fullfillImage: s.fullfillImage}})
}),define("text!components/showcase/2.0.0/category/templates/show.html", [], function () {
    return '<div class="control-group">\n    <div class="custom-category js-collection-region">\n\n    </div>\n</div>\n<div class="actions">\n    <div class="actions-wrap">\n        <span class="action edit">编辑</span><span class="action add">加内容</span>\n    </div>\n</div>\n<div class="sort">\n    <i class="sort-handler"></i>\n</div>\n'
}),define("text!components/showcase/2.0.0/category/templates/show_item.html", [], function () {
    return "<% if (title !== '') { %>\n<a href=\"javascript:;\"><%- title %></a>\n<% } %>\n"
}),define("components/showcase/2.0.0/category/views/show_item", ["require", "underscore", "marionette", "text!components/showcase/2.0.0/category/templates/show_item.html"], function (e) {
    var t = e("underscore"), n = e("marionette"), i = e("text!components/showcase/2.0.0/category/templates/show_item.html");
    return n.ItemView.extend({tagName: "li", template: t.template(i), modelEvents: {change: "render"}})
}),define("components/showcase/2.0.0/category/views/show_collection", ["require", "marionette", "components/showcase/2.0.0/category/views/show_item"], function (e) {
    var t = e("marionette"), n = e("components/showcase/2.0.0/category/views/show_item");
    return t.CollectionView.extend({tagName: "ul", className: "custom-category-list clearfix", itemView: n})
}),define("components/showcase/2.0.0/category/views/show", ["require", "underscore", "components/showcase/2.0.0/base/views/show_base", "text!components/showcase/2.0.0/category/templates/show.html", "components/showcase/2.0.0/category/views/show_collection"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/show_base"), i = e("text!components/showcase/2.0.0/category/templates/show.html"), s = e("components/showcase/2.0.0/category/views/show_collection");
    return n.extend({
        template: t.template(i),
        regions: {collectionRegion: ".js-collection-region"},
        onRender: function () {
            this.collectionRegion.show(new s({collection: this.model.get("sub_entry"), layout: this}))
        }
    })
}),define("text!components/showcase/2.0.0/white/templates/show.html", [], function () {
    return '<div class="control-group">\n    <div class="custom-white text-center" style="height: <%= height %>px;">\n    </div>\n    <div class="component-border"></div>\n</div>\n<div class="actions">\n    <div class="actions-wrap"><span class="action edit">编辑</span><span class="action add">加内容</span><span class="action delete">删除</span></div>\n</div>\n<div class="sort">\n    <i class="sort-handler"></i>\n</div>\n'
}),define("components/showcase/2.0.0/white/views/show", ["require", "underscore", "components/showcase/2.0.0/base/views/show_base", "text!components/showcase/2.0.0/white/templates/show.html"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/show_base"), i = e("text!components/showcase/2.0.0/white/templates/show.html");
    return n.extend({template: t.template(i)})
}),define("text!components/showcase/2.0.0/store/templates/show.html", [], function () {
    return '<div class="control-group">\n    <div class="custom-store block-item">\n        <a class="custom-store-link clearfix" href="javascript:;">\n            <div class="custom-store-img"></div>\n            <div class="custom-store-name">\n                <%- title %>\n            </div>\n            <div class="custom-store-enter">\n                进入店铺\n            </div>\n        </a>\n    </div>\n\n    <div class="component-border"></div>\n</div>\n<div class="actions">\n    <div class="actions-wrap"><span class="action edit">编辑</span><span class="action add">加内容</span><span class="action delete">删除</span></div>\n</div>\n<div class="sort">\n    <i class="sort-handler"></i>\n</div>\n'
}),define("components/showcase/2.0.0/store/views/show", ["require", "underscore", "components/showcase/2.0.0/base/views/show_base", "text!components/showcase/2.0.0/store/templates/show.html"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/show_base"), i = e("text!components/showcase/2.0.0/store/templates/show.html");
    return n.extend({
        template: t.template(i), serializeData: function () {
            return {title: window._global.mp_data.team_name || ""}
        }
    })
}),define("text!components/showcase/2.0.0/recommend_goods/templates/show.html", [], function () {
    return '<div class="control-group">\n    <div class="custom-recommend-goods clearfix">\n        <div class="custom-recommend-goods-title">\n            <a href="javascript:;">推荐商品</a>\n        </div>\n        <ul class="custom-recommend-goods-list clearfix">\n            <% for(var i = 0; i < goodsSample.length; i++){ %>\n                <li>\n                    <a href="javascript:;">\n                        <img src="<%- goodsSample[i].image_url %>" alt="">\n                    </a>\n                </li>\n            <% } %>\n        </ul>\n    </div>\n    <div class="component-border"></div>\n</div>\n<div class="actions">\n    <div class="actions-wrap"><span class="action edit">编辑</span><span class="action add">加内容</span><span class="action delete">删除</span></div>\n</div>\n<div class="sort">\n    <i class="sort-handler"></i>\n</div>\n'
}),define("components/showcase/2.0.0/recommend_goods/views/show", ["require", "underscore", "components/showcase/2.0.0/base/views/show_base", "text!components/showcase/2.0.0/recommend_goods/templates/show.html"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/show_base"), i = e("text!components/showcase/2.0.0/recommend_goods/templates/show.html");
    return n.extend({
        className: "app-field", template: t.template(i), onInit: function () {
            this.listenTo(this.model, "change", this.render), this.listenTo(this.model, "destroy", this.destroying)
        }, render: function () {
            var e = {
                goodsSample: [{
                    image_url: "http://imgqn.koudaitong.com/upload_files/2013/11/27/138554366971566702.jpg",
                    price: "379.00"
                }, {
                    image_url: "http://imgqn.koudaitong.com/upload_files/2013/09/27/138029081159828528.jpg",
                    price: "5.50"
                }, {
                    image_url: "http://imgqn.koudaitong.com/upload_files/2013/09/27/138029095601969662.jpg",
                    price: "32.00"
                }]
            };
            return this.$el.html(this.template(e)), this
        }
    })
}),define("text!components/showcase/2.0.0/scroll/templates/show.html", [], function () {
    return '<div class="control-group">\n    <%\n        var image_url = \'\';\n        if(first_page_image_url) {\n            image_url = fullfillImage(first_page_image_url);\n        } else {\n            image_url = window._global.url.cdn_static + \'/image/scroll/default2.gif\';\n        }\n    %>\n    <div class="www-tpl-scroll">\n        <% if(homepage_icon == \'1\') { %>\n            <div class="ui-left-btns">\n                <i class="ui-homepage-btn"></i>\n            </div>\n        <% } %>\n        <% if(music_icon == \'1\') { %>\n            <div class="ui-right-btns">\n                <i class="ui-music-btn"></i>\n            </div>\n        <% } %>\n        <img src="<%= image_url %>" alt="全画幅场景">\n    </div>\n</div>\n'
}),define("components/showcase/2.0.0/scroll/views/show", ["require", "underscore", "components/showcase/2.0.0/base/views/show_base", "text!components/showcase/2.0.0/scroll/templates/show.html", "core/utils"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/show_base"), i = e("text!components/showcase/2.0.0/scroll/templates/show.html"), s = e("core/utils");
    return n.extend({template: t.template(i), templateHelpers: {fullfillImage: s.fullfillImage}})
}),define("text!components/showcase/2.0.0/scroll_nav/templates/show_item.html", [], function () {
    return '<% if(image_url) { %>\n<div class="scroll-nav-item" style="background-image: url(\'<%= fullfillImage(image_url) %>\');">\n<% } else { %>\n<div class="scroll-nav-item">\n<% } %>\n    <div class="scroll-nav-item-bg"></div>\n    <div class="scroll-nav-item-title"><%- title %></div>\n    <div class="scroll-nav-item-sub-title"><%- sub_title %></div>\n</div>\n\n\n'
}),define("components/showcase/2.0.0/scroll_nav/views/show_item", ["require", "underscore", "marionette", "text!components/showcase/2.0.0/scroll_nav/templates/show_item.html", "core/utils"], function (e) {
    var t = e("underscore"), n = e("marionette"), i = e("text!components/showcase/2.0.0/scroll_nav/templates/show_item.html"), s = e("core/utils");
    return n.ItemView.extend({
        tagName: "li",
        template: t.template(i),
        templateHelpers: {fullfillImage: s.fullfillImage},
        initialize: function (e) {
            e = e || {}, this.listenTo(this.model, "change", this.render)
        }
    })
}),define("components/showcase/2.0.0/scroll_nav/views/show_collection", ["require", "marionette", "components/showcase/2.0.0/scroll_nav/views/show_item"], function (e) {
    var t = e("marionette"), n = e("components/showcase/2.0.0/scroll_nav/views/show_item");
    return t.CollectionView.extend({tagName: "ul", className: "clearfix", itemView: n})
}),define("text!components/showcase/2.0.0/scroll_nav/templates/show.html", [], function () {
    return '<div class="control-group">\n    <%\n        var image_url = window._global.url.cdn_static + \'/image/scroll_nav/default.gif\';\n\n        if(background_images && background_images.length) {\n            image_url = fullfillImage(background_images[0].url, \'!640x320.jpg\');\n        }\n    %>\n    <div class="www-tpl-scroll www-scroll-nav">\n        <% if(homepage_icon == \'1\') { %>\n            <div class="ui-left-btns">\n                <i class="ui-homepage-btn"></i>\n            </div>\n        <% } %>\n        <img src="<%= image_url %>" alt="">\n\n        <div class="js-scroll-nav-show-collection-region nav-style-<%= nav_style %>"></div>\n    </div>\n</div>\n'
}),define("components/showcase/2.0.0/scroll_nav/views/show", ["require", "underscore", "components/showcase/2.0.0/base/views/show_base", "components/showcase/2.0.0/scroll_nav/views/show_collection", "text!components/showcase/2.0.0/scroll_nav/templates/show.html", "core/utils"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/show_base"), i = e("components/showcase/2.0.0/scroll_nav/views/show_collection"), s = e("text!components/showcase/2.0.0/scroll_nav/templates/show.html"), o = e("core/utils");
    return n.extend({
        template: t.template(s),
        templateHelpers: {fullfillImage: o.fullfillImage},
        regions: {collectionRegion: ".js-scroll-nav-show-collection-region"},
        onRender: function () {
            this.collectionRegion.show(new i({collection: this.model.get("sub_entry")}))
        }
    })
}),define("text!components/showcase/2.0.0/image_text/templates/show.html", [], function () {
    return '<% if (position === 0) { %>\n<div class="appmsg appmsg-multiple-first">\n    <h4 class="appmsg-title"><%- title || \'标题\' %></h4>\n    <p class="appmsg-meta"><%- currentDay %></p>\n    <div class="appmsg-thumb-wrap">\n        <% if (image) { %>\n        <img src="<%- image %>"/>\n        <% } else { %>\n        <p>封面图片</p>\n        <% } %>\n    </div>\n    <% if (digest) { %>\n    <div class="appmsg-digest">\n        <%- digest %>\n    </div>\n    <% } %>\n    <div class="appmsg-view-full clearfix">\n        <span>阅读全文</span>\n        <span class="pull-right">&gt;</span>\n    </div>\n</div>\n<% } else { %>\n<div class="appmsg appmsg-multiple-others">\n    <h4 class="appmsg-title"><%- title || \'标题\' %></h4>\n    <div class="appmsg-thumb-wrap">\n        <% if (image) { %>\n        <img src="<%- image %>" width="50" height="50" />\n        <% } else { %>\n        <p>缩略图</p>\n        <% } %>\n    </div>\n</div>\n<% } %>\n\n<div class="actions">\n    <div class="actions-wrap">\n        <span class="action edit">编辑</span>\n        <% if (position > 1) { %>\n        <span class="action delete">删除</span>\n        <% } %>\n    </div>\n</div>'
}),define("components/showcase/2.0.0/image_text/views/show", ["require", "underscore", "components/showcase/2.0.0/base/views/show_base", "core/utils", "text!components/showcase/2.0.0/image_text/templates/show.html"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/show_base"), i = e("core/utils"), s = e("text!components/showcase/2.0.0/image_text/templates/show.html");
    return n.extend({
        className: function () {
            var e = this.model.position();
            return e > 1 ? "app-field clearfix" : "app-field clearfix not-sortable js-not-sortable"
        }, template: t.template(s), serializeData: function () {
            var e = this.model.attributes, n = this.model.position(), s = this.model.get("image");
            s = s && i.fullfillImage(s);
            var o = i.getCurrentDay();
            return t.extend({}, e, {image: s, position: n, currentDay: o})
        }
    })
}),define("tpl!components/showcase/2.0.0/advanced_news/templates/show", [], function () {
    return function (obj) {
        var __t, __p = "";
        Array.prototype.join;
        with (obj || {})__p += "", 0 === position ? (__p += '\n    <div class="appmsg appmsg-multiple-first">\n        <h4 class="appmsg-title">' + (null == (__t = title || "标题") ? "" : _.escape(__t)) + '</h4>\n        <p class="appmsg-meta">' + (null == (__t = currentDay) ? "" : _.escape(__t)) + "</p>\n        ", isSingle ? (__p += "\n            ", cover_url && (__p += '\n                <div class="appmsg-thumb-wrap">\n                    <img src="' + (null == (__t = fullfillImage(cover_url)) ? "" : _.escape(__t)) + '"/>\n                </div>\n            '), __p += "\n        ") : (__p += '\n            <div class="appmsg-thumb-wrap">\n                ', __p += cover_url ? '\n                    <img src="' + (null == (__t = fullfillImage(cover_url)) ? "" : _.escape(__t)) + '"/>\n                ' : "\n                    <p>封面图片</p>\n                ", __p += "\n            </div>\n        "), __p += "\n        ", digest && (__p += '\n            <div class="appmsg-digest">\n                ' + (null == (__t = digest) ? "" : _.escape(__t)) + "\n            </div>\n        "), __p += '\n        <div class="appmsg-view-full clearfix">\n            <span>阅读全文</span>\n            <span class="pull-right">&gt;</span>\n        </div>\n    </div>\n') : (__p += '\n    <div class="appmsg appmsg-multiple-others">\n        <h4 class="appmsg-title">' + (null == (__t = title || "标题") ? "" : _.escape(__t)) + "</h4>\n        ", cover_url && (__p += '\n            <div class="appmsg-thumb-wrap">\n                <img src="' + (null == (__t = fullfillImage(cover_url)) ? "" : _.escape(__t)) + '" width="50" height="50" />\n            </div>\n        '), __p += "\n    </div>\n"), __p += '\n\n<div class="actions">\n    <div class="actions-wrap">\n        <span class="action edit">编辑</span>\n        ', position > 1 && (__p += '\n            <span class="action delete">删除</span>\n        '), __p += "\n    </div>\n</div>\n";
        return __p
    }
}),define("components/showcase/2.0.0/advanced_news/views/show", ["require", "underscore", "components/showcase/2.0.0/base/views/show_base", "core/utils", "text!components/showcase/2.0.0/image_text/templates/show.html", "tpl!../templates/show"], function (e) {
    var t = (e("underscore"), e("components/showcase/2.0.0/base/views/show_base")), n = e("core/utils");
    e("text!components/showcase/2.0.0/image_text/templates/show.html");
    return t.extend({
        className: function () {
            var e = this.model.position();
            return e > 1 ? "app-field clearfix" : "app-field clearfix not-sortable js-not-sortable"
        }, template: e("tpl!../templates/show"), templateHelpers: function () {
            return {
                position: this.model.position(),
                currentDay: n.getCurrentDay(),
                fullfillImage: n.fullfillImage,
                isSingle: this.model.isSingle()
            }
        }
    })
}),define("text!components/showcase/2.0.0/audio/templates/show.html", [], function () {
    return '<div class="control-group">\n    <% if (+style==0 ) { %>\n        <div class="custom-audio">\n            <div class="custom-audio-weixin clearfix <% if(bubble == \'right\') { %>custom-audio-weixin-right<% } %> ">\n                <img src="<%= avatar %>" width="40" height="40" class="custom-audio-logo">\n                <span class="custom-audio-bar">\n                    <img class="js-animation hide" src="http://static.koudaitong.com/v2/image/wap/audio/player.gif" alt="播放器动画" width="13" height="17">\n                    <i class="custom-audio-animation-static js-animation-static"></i>\n                </span>\n                <span class="custom-audio-time js-duration"></span>\n            </div>\n        </div>\n    <% } else { %>\n        <div class="custom-audio">\n            <div class="custom-audio-music">\n                <i class="custom-audio-btn js-trigger"></i>\n                <span class="custom-audio-title"><%- title %></span>\n                <span class="custom-audio-status js-status"></span>\n                <span class="custom-audio-time">\n                    <span class="js-current-time"></span>\n                    <span class="js-duration"></span>\n                </span>\n                <span class="custom-audio-timeline js-percentage"></span>\n            </div>\n        </div>\n    <% } %>\n</div>\n<div class="actions">\n    <div class="actions-wrap">\n        <span class="action edit">编辑</span>\n        <span class="action add">加内容</span>\n        <span class="action delete">删除</span>\n    </div>\n</div>\n<div class="sort">\n    <i class="sort-handler"></i>\n</div>\n'
}),define("components/showcase/2.0.0/audio/views/show", ["require", "underscore", "components/showcase/2.0.0/base/views/show_base", "text!components/showcase/2.0.0/audio/templates/show.html", "core/utils"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/show_base"), i = e("text!components/showcase/2.0.0/audio/templates/show.html"), s = e("core/utils");
    return n.extend({
        template: t.template(i), serializeData: function () {
            var e = this.model.toJSON();
            return t.extend(e, {avatar: s.fullfillImage(e.avatar || _global.mp_data.logo, "!80x80.jpg")})
        }
    })
}),define("tpl!components/showcase/2.0.0/shop_banner/templates/show", [], function () {
    return function (obj) {
        var __t, __p = "";
        Array.prototype.join;
        with (obj || {})__p += '<div class="control-group">\n    <div class="custom-shop-banner"\n        style="background-image: url(' + (null == (__t = fullfillImage(background_image)) ? "" : __t) + ');">\n\n        <div class="custom-shop-banner-inner">\n            <div class="custom-shop-banner-logo">\n                <img src="' + (null == (__t = logo()) ? "" : __t) + '" alt="Logo">\n            </div>\n            <h1>' + (null == (__t = _global.mp_data.team_name) ? "" : __t) + '</h1>\n            <p style="color: #fff;padding: 0 20px;">' + (null == (__t = intro) ? "" : __t) + '</p>\n        </div>\n\n    </div>\n</div>\n<div class="actions">\n    <div class="actions-wrap">\n        <span class="action edit">编辑</span>\n        ', isFenxiao() || (__p += '\n        <span class="action add">加内容</span>\n        '), __p += "\n    </div>\n</div>\n", isFenxiao() || (__p += '\n<div class="sort">\n    <i class="sort-handler"></i>\n</div>\n'), __p += "\n";
        return __p
    }
}),define("components/showcase/2.0.0/shop_banner/views/show", ["require", "core/utils", "components/showcase/2.0.0/base/views/show_base", "tpl!../templates/show"], function (e) {
    var t = e("core/utils"), n = e("components/showcase/2.0.0/base/views/show_base");
    return n.extend({
        template: e("tpl!../templates/show"), templateHelpers: {
            logo: function () {
                return t.isFenxiao() ? t.fullfillImage(window._global.template_logo, "!145x145.jpg") : t.fullfillImage(window._global.mp_data.logo, "!145x145.jpg")
            }, fullfillImage: t.fullfillImage, isFenxiao: t.isFenxiao
        }
    })
}),define("tpl!components/showcase/2.0.0/tags/templates/show_item", [], function () {
    return function (obj) {
        var __t, __p = "";
        Array.prototype.join;
        with (obj || {})__p += "" + (null == (__t = title) ? "" : __t) + "\n";
        return __p
    }
}),define("components/showcase/2.0.0/tags/views/show_item", ["require", "marionette", "tpl!../templates/show_item"], function (e) {
    var t = e("marionette");
    return t.ItemView.extend({
        tagName: "a", template: e("tpl!../templates/show_item"), className: function () {
            return 0 === this.model.index() ? "active" : ""
        }, initialize: function () {
            this.listenTo(this.model, "change", this.render)
        }
    })
}),define("tpl!components/showcase/2.0.0/tags/templates/show_empty", [], function () {
    return function (obj) {
        var __p = "";
        Array.prototype.join;
        with (obj || {})__p += '<a href="javascript:;">请添加商品分组</a>\n';
        return __p
    }
}),define("components/showcase/2.0.0/tags/views/show_empty", ["require", "marionette", "tpl!../templates/show_empty"], function (e) {
    var t = e("marionette");
    return t.ItemView.extend({tagName: "li", template: e("tpl!../templates/show_empty")})
}),define("components/showcase/2.0.0/tags/views/show_collection", ["require", "marionette", "./show_item", "./show_empty"], function (e) {
    var t = e("marionette"), n = e("./show_item"), i = e("./show_empty");
    return t.CollectionView.extend({
        tagName: "ul", className: function () {
            var e = this.collection.length > 1 ? "" : "hide";
            return "tabber tabber-bottom red clearfix tabber-n" + Math.max(this.collection.length, 1) + " " + e
        }, itemView: n, emptyView: i
    })
}),define("tpl!components/showcase/2.0.0/tags/templates/show", [], function () {
    return function (obj) {
        var __p = "";
        Array.prototype.join;
        with (obj || {})__p += '<div class="control-group">\n    <div class="custom-tags">\n        <div class="js-collection-region"></div>\n        <div class="js-goods-style-region"></div>\n    </div>\n    <div class="component-border"></div>\n</div>\n<div class="actions">\n    <div class="actions-wrap">\n        <span class="action edit">编辑</span>\n        ', isFenxiao() || (__p += '\n        <span class="action add">加内容</span>\n        <span class="action delete">删除</span>\n        '), __p += "        \n    </div>\n</div>\n", isFenxiao() || (__p += '\n<div class="sort">\n    <i class="sort-handler"></i>\n</div>\n'), __p += "\n";
        return __p
    }
}),define("components/showcase/2.0.0/tags/views/show", ["require", "underscore", "core/utils", "components/showcase/2.0.0/base/views/show_base", "./show_collection", "components/showcase/2.0.0/goods_list/views/show_goods_style", "tpl!../templates/show"], function (e) {
    var t = (e("underscore"), e("core/utils")), n = e("components/showcase/2.0.0/base/views/show_base"), i = e("./show_collection"), s = e("components/showcase/2.0.0/goods_list/views/show_goods_style");
    return n.extend({
        template: e("tpl!../templates/show"),
        regions: {collectionRegion: ".js-collection-region", goodsStyleRegion: ".js-goods-style-region"},
        onInit: function () {
            this.listenTo(this.model.get("sub_entry"), "reset add remove", this.render)
        },
        onRender: function () {
            this.collectionRegion.show(new i({collection: this.model.get("sub_entry")})), this.goodsStyleRegion.show(new s({model: this.model}))
        },
        templateHelpers: {isFenxiao: t.isFenxiao}
    })
}),define("tpl!components/showcase/2.0.0/notice/templates/show", [], function () {
    return function (obj) {
        var __t, __p = "";
        Array.prototype.join;
        with (obj || {})__p += '<div class="control-group">\n    <div class="custom-notice">\n        <div class="custom-notice-inner">\n            <div class="custom-notice-scroll">\n                <span>\n                    公告：' + (null == (__t = content ? _.escape(content).replace(/\s/g, "&nbsp;") : "请填写内容，如果过长，将会在手机上滚动显示") ? "" : __t) + '\n                </span>\n            </div>\n        </div>\n    </div>\n</div>\n<div class="actions">\n    <div class="actions-wrap"><span class="action edit">编辑</span><span class="action add">加内容</span><span class="action delete">删除</span></div>\n</div>\n<div class="sort">\n    <i class="sort-handler"></i>\n</div>\n';
        return __p
    }
}),define("components/showcase/2.0.0/notice/views/show", ["require", "components/showcase/2.0.0/base/views/show_base", "tpl!../templates/show"], function (e) {
    var t = e("components/showcase/2.0.0/base/views/show_base");
    return t.extend({template: e("tpl!../templates/show")})
}),define("components/showcase/2.0.0/config", ["require", "./rich_text/models/rich_text", "./goods/models/goods", "./goods_list/models/goods", "./goods_template_split/models/model", "./image_ad/models/model", "./nav/models/model", "./showcase/models/model", "./level/models/level", "./link/models/model", "./text_nav/models/model", "./tag_list/models/model", "./title/models/model", "./component/models/component", "./search/models/model", "./line/models/model", "./cube2/models/model", "./tpl_shop/models/model", "./tpl_weixin/models/model", "./tpl_fbb/models/model", "./tpl_course/models/model", "./tpl_wxd/models/model", "./tpl_11_11/models/model", "./category/models/model", "./white/models/model", "./store/models/model", "./recommend_goods/models/model", "./scroll/models/model", "./scroll_nav/models/model", "./image_text/models/model", "./advanced_news/models/model", "./audio/models/model", "./shop_banner/models/model", "./tags/models/model", "./notice/models/model", "./rich_text/views/edit", "./goods/views/edit", "./goods_list/views/edit", "./goods_template_split/views/edit", "./image_ad/views/edit", "./nav/views/edit", "./showcase/views/edit", "./level/views/edit", "./link/views/edit", "./text_nav/views/edit", "./tag_list/views/edit", "./title/views/edit", "./component/views/edit", "./search/views/edit", "./line/views/edit", "./cube2/views/edit", "./tpl_shop/views/edit", "./tpl_weixin/views/edit", "./tpl_fbb/views/edit", "./tpl_course/views/edit", "./tpl_wxd/views/edit", "./tpl_11_11/views/edit", "./category/views/edit", "./white/views/edit", "./store/views/edit", "./recommend_goods/views/edit", "./scroll/views/edit", "./scroll_nav/views/edit", "./image_text/views/edit", "./advanced_news/views/edit", "./audio/views/edit", "./shop_banner/views/edit", "./tags/views/edit", "./notice/views/edit", "./rich_text/views/show", "./goods/views/show", "./goods_list/views/show", "./goods_template_split/views/show", "./image_ad/views/show", "./nav/views/show", "./showcase/views/show", "./level/views/show", "./link/views/show", "./text_nav/views/show", "./tag_list/views/show", "./title/views/show", "./component/views/show", "./search/views/show", "./line/views/show", "./cube2/views/show", "./tpl_shop/views/show", "./tpl_weixin/views/show", "./tpl_fbb/views/show", "./tpl_course/views/show", "./tpl_wxd/views/show", "./tpl_11_11/views/show", "./category/views/show", "./white/views/show", "./store/views/show", "./recommend_goods/views/show", "./scroll/views/show", "./scroll_nav/views/show", "./image_text/views/show", "./advanced_news/views/show", "./audio/views/show", "./shop_banner/views/show", "./tags/views/show", "./notice/views/show"], function (e) {
    return {
        models: {
            rich_text: e("./rich_text/models/rich_text"),
            goods: e("./goods/models/goods"),
            goods_list: e("./goods_list/models/goods"),
            goods_template_split: e("./goods_template_split/models/model"),
            image_ad: e("./image_ad/models/model"),
            nav: e("./nav/models/model"),
            showcase: e("./showcase/models/model"),
            level: e("./level/models/level"),
            link: e("./link/models/model"),
            text_nav: e("./text_nav/models/model"),
            tag_list: e("./tag_list/models/model"),
            title: e("./title/models/model"),
            component: e("./component/models/component"),
            search: e("./search/models/model"),
            line: e("./line/models/model"),
            cube2: e("./cube2/models/model"),
            tpl_shop: e("./tpl_shop/models/model"),
            tpl_weixin: e("./tpl_weixin/models/model"),
            tpl_fbb: e("./tpl_fbb/models/model"),
            tpl_course: e("./tpl_course/models/model"),
            tpl_wxd: e("./tpl_wxd/models/model"),
            tpl_11_11: e("./tpl_11_11/models/model"),
            category: e("./category/models/model"),
            white: e("./white/models/model"),
            store: e("./store/models/model"),
            recommend_goods: e("./recommend_goods/models/model"),
            scroll: e("./scroll/models/model"),
            scroll_nav: e("./scroll_nav/models/model"),
            image_text: e("./image_text/models/model"),
            advanced_news: e("./advanced_news/models/model"),
            audio: e("./audio/models/model"),
            shop_banner: e("./shop_banner/models/model"),
            tags: e("./tags/models/model"),
            notice: e("./notice/models/model")
        },
        editViews: {
            rich_text: e("./rich_text/views/edit"),
            goods: e("./goods/views/edit"),
            goods_list: e("./goods_list/views/edit"),
            goods_template_split: e("./goods_template_split/views/edit"),
            image_ad: e("./image_ad/views/edit"),
            nav: e("./nav/views/edit"),
            showcase: e("./showcase/views/edit"),
            level: e("./level/views/edit"),
            link: e("./link/views/edit"),
            text_nav: e("./text_nav/views/edit"),
            tag_list: e("./tag_list/views/edit"),
            title: e("./title/views/edit"),
            component: e("./component/views/edit"),
            search: e("./search/views/edit"),
            line: e("./line/views/edit"),
            cube2: e("./cube2/views/edit"),
            tpl_shop: e("./tpl_shop/views/edit"),
            tpl_weixin: e("./tpl_weixin/views/edit"),
            tpl_fbb: e("./tpl_fbb/views/edit"),
            tpl_course: e("./tpl_course/views/edit"),
            tpl_wxd: e("./tpl_wxd/views/edit"),
            tpl_11_11: e("./tpl_11_11/views/edit"),
            category: e("./category/views/edit"),
            white: e("./white/views/edit"),
            store: e("./store/views/edit"),
            recommend_goods: e("./recommend_goods/views/edit"),
            scroll: e("./scroll/views/edit"),
            scroll_nav: e("./scroll_nav/views/edit"),
            image_text: e("./image_text/views/edit"),
            advanced_news: e("./advanced_news/views/edit"),
            audio: e("./audio/views/edit"),
            shop_banner: e("./shop_banner/views/edit"),
            tags: e("./tags/views/edit"),
            notice: e("./notice/views/edit")
        },
        showViews: {
            rich_text: e("./rich_text/views/show"),
            goods: e("./goods/views/show"),
            goods_list: e("./goods_list/views/show"),
            goods_template_split: e("./goods_template_split/views/show"),
            image_ad: e("./image_ad/views/show"),
            nav: e("./nav/views/show"),
            showcase: e("./showcase/views/show"),
            level: e("./level/views/show"),
            link: e("./link/views/show"),
            text_nav: e("./text_nav/views/show"),
            tag_list: e("./tag_list/views/show"),
            title: e("./title/views/show"),
            component: e("./component/views/show"),
            search: e("./search/views/show"),
            line: e("./line/views/show"),
            cube2: e("./cube2/views/show"),
            tpl_shop: e("./tpl_shop/views/show"),
            tpl_weixin: e("./tpl_weixin/views/show"),
            tpl_fbb: e("./tpl_fbb/views/show"),
            tpl_course: e("./tpl_course/views/show"),
            tpl_wxd: e("./tpl_wxd/views/show"),
            tpl_11_11: e("./tpl_11_11/views/show"),
            category: e("./category/views/show"),
            white: e("./white/views/show"),
            store: e("./store/views/show"),
            recommend_goods: e("./recommend_goods/views/show"),
            scroll: e("./scroll/views/show"),
            scroll_nav: e("./scroll_nav/views/show"),
            image_text: e("./image_text/views/show"),
            advanced_news: e("./advanced_news/views/show"),
            audio: e("./audio/views/show"),
            shop_banner: e("./shop_banner/views/show"),
            tags: e("./tags/views/show"),
            notice: e("./notice/views/show")
        }
    }
}),define("components/showcase/2.0.0/base/views/add", ["require", "underscore", "jquery", "components/showcase/2.0.0/base/views/edit_base", "text!templates/add_content.html", "core/utils"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("components/showcase/2.0.0/base/views/edit_base"), s = e("text!templates/add_content.html"), o = e("core/utils");
    return i.extend({
        template: t.template(s),
        events: {"click .js-new-field": "handleAddField"},
        handleAddField: function (e) {
            e.stopPropagation();
            var t = this.layout.collection.MAX_LENGTH || 50;
            if (this.layout.collection.length >= t)return void o.errorNotify("内容最多" + t + "个。");
            var i = n(e.target).data("field-type"), s = window.SHOWCASE_CONFIG.models[i].initialize();
            this.model.collection ? (this.layout.collection.add(s, {
                at: this.model.index() + 1,
                silent: !0
            }), this.layout.collection.trigger("reset")) : this.layout.collection.add(s), this.layout.displayEditView(s)
        }
    })
}),define("text!templates/config_edit.html", [], function () {
    return '<form class="form-horizontal" novalidate>\n    <div class="control-group">\n        <script class="js-editor" type="text/plain"></script>\n    </div>\n</form>\n'
}),define("views/config_edit", ["require", "underscore", "components/showcase/2.0.0/base/views/edit_base", "text!templates/config_edit.html"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/edit_base"), i = e("text!templates/config_edit.html"), s = window.UE;
    return n.extend({
        template: t.template(i), onShow: function () {
            this.renderEditor(), $(".js-goods-sidebar-sub-title").show()
        }, renderEditor: function () {
            var e = this, t = this._editor = new s.ui.Editor({
                toolbars: [["bold", "italic", "underline", "strikethrough", "forecolor", "backcolor", "justifyleft", "justifycenter", "justifyright", "|", "insertunorderedlist", "insertorderedlist", "blockquote"], ["emotion", "uploadimage", "insertvideo", "link", "removeformat", "|", "rowspacingtop", "rowspacingbottom", "lineheight", "paragraph", "fontsize"], ["inserttable", "deletetable", "insertparagraphbeforetable", "insertrow", "deleterow", "insertcol", "deletecol", "mergecells", "mergeright", "mergedown", "splittocells", "splittorows", "splittocols"]],
                autoClearinitialContent: !1,
                autoFloatEnabled: !0,
                wordCount: !0,
                elementPathEnabled: !1,
                maximumWords: 1e4,
                initialFrameWidth: 458,
                initialFrameHeight: 360
            });
            t.addListener("blur", function () {
                e.model.set("content", e._editor.getContent())
            }), t.addListener("contentChange", function () {
                e.model.set("content", e._editor.getContent())
            }), t.render(this.$(".js-editor")[0]), t.ready(function () {
                t.setContent(e.model.get("content"))
            })
        }, onClose: function () {
            this._editor && (this.model.set("content", this._editor.getContent()), $(".js-goods-sidebar-sub-title").hide())
        }
    })
}),define("text!templates/config_show.html", [], function () {
    return '<div class="control-group">\n    <% if(content) { %>\n        <div class="custom-richtext">\n            <%= content %>\n        </div>\n    <% } else { %>\n        <div class="goods-details-block" style="background: #fff;">\n            <h4>商品详情区</h4>\n            <p>点击进行编辑</p>\n        </div>\n    <% } %>\n</div>\n<div class="actions">\n    <div class="actions-wrap">\n        <span class="action edit">编辑</span>\n    </div>\n</div>\n'
}),define("views/config_show", ["require", "underscore", "components/showcase/2.0.0/base/views/show_base", "text!templates/config_show.html"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/show_base"), i = e("text!templates/config_show.html");
    return n.extend({template: t.template(i)})
}),define("components/showcase/2.0.0/base/views/design", ["require", "underscore", "jquery", "backbone", "marionette", "text!templates/design.html", "text!templates/add_content.html", "components/showcase/2.0.0/base/views/show_collection", "text!components/showcase/2.0.0/base/templates/stroagealert.html", "components/showcase/2.0.0/config", "components/showcase/2.0.0/base/views/add", "views/config_edit", "views/config_show"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("backbone"), s = e("marionette"), o = e("text!templates/design.html"), a = e("text!templates/add_content.html"), l = e("components/showcase/2.0.0/base/views/show_collection"), c = e("text!components/showcase/2.0.0/base/templates/stroagealert.html"), r = e("components/showcase/2.0.0/config"), d = e("components/showcase/2.0.0/base/views/add"), p = e("views/config_edit"), u = e("views/config_show");
    window.SHOWCASE_CONFIG = r;
    var m = s.Layout.extend({
        SHOWCASE_CONFIG: r, className: "app-design clearfix", template: t.template(o), regions: {
            configRegion: ".js-config-region",
            showRegion: ".js-fields-region",
            editRegion: ".js-sidebar-region",
            addRegion: ".js-add-region"
        }, templateHelpers: {
            showAddContent: function () {
                return a
            }
        }, collectionEvents: {sync: "fetched onShow"}, _fetched: !1, initialize: function (e) {
            this.options = e || {}, this.triggerMethod("init", e), this.options.isCreating && this.fetched(), this.options.localStorage && (this._storagedData = this.collection.localFetch(), this._initAutoLocalStroage(), this.options.isCreating && this.showStorageAlert(), this.listenTo(this.collection, "sync", this.showStorageAlert)), this.listenTo(this.collection, "add remove reset sort sync", this.toggleSidebar), this.listenTo(window.NC, "notify:show", this.onNotifyShow), this.listenTo(window.NC, "notify:close", this.onNotifyClose), this.bindKeybroad()
        }, fetched: function () {
            this._fetched = !0
        }, toggleAction: function () {
            this.$(".app-actions").toggle(this._fetched)
        }, onShow: function () {
            var e = this.collection.first();
            e && "config" === e.get("type") && this.configRegion.show(new u({
                model: e,
                layout: this
            })), this.showRegion.show(new l(t.extend({}, this.options, {
                collection: this.collection,
                layout: this
            }))), this.createAllEditView(), this.displayFirstEditView(), this.addRegion.show(new d({
                model: new i.Model,
                layout: this
            })), setTimeout(t.bind(this.toggleAddView, this), 10), this.toggleAction(), this.fixActionsPosition()
        }, toggleAddView: function () {
            this.collection.includeFullscreenModel() ? this.$el.addClass("without-add-region") : this.$el.removeClass("without-add-region")
        }, displayEditView: function (e, t) {
            t = t || {};
            var n = this.editRegion.currentView && this.editRegion.currentView.model;
            if (e = e || n) {
                var i = t.add ? d : this.getEditViewConstructor(e), s = this.getShowViewInstance(e), o = this;
                if (this.$(".app-sidebar").css("margin-top", s.position().top), this.trigger("editing", e), t.edit && this.scrollTop(s.offset().top - 10), n === e && !t.add && !t.edit)return void this._scorllToFirstError(this.editRegion.currentView);
                var a = new i({model: e, layout: this});
                t.error && a.once("show", function () {
                    this.model.checkValid(), o._scorllToFirstError(this)
                }), t.notShow || this.editRegion.show(a)
            }
        }, _scorllToFirstError: function (e) {
            var t = e.$(".control-group.error").first();
            t.length > 0 && this.scrollTop(t.offset().top - 10)
        }, createAllEditView: function () {
            for (var e = this, t = this.collection.models, n = t.length - 1; n >= 0; n--) {
                var i = t[n];
                e.displayEditView(i, {notShow: !0})
            }
        }, displayFirstEditView: function () {
            var e = this.collection.first();
            e && this.displayEditView(e)
        }, getEditViewConstructor: function (e) {
            var t = e.get("type");
            if ("config" === t)return p;
            if (t in this.SHOWCASE_CONFIG.editViews)return this.SHOWCASE_CONFIG.editViews[t];
            throw new Error("type not exist.")
        }, getShowViewInstance: function (e) {
            return "config" === e.get("type") ? this.configRegion.currentView : this.showRegion.currentView.children.findByModel(e)
        }, add: function () {
            return this.sync({is_display: 1})
        }, save: function () {
            return this.sync({is_display: 0})
        }, preview: function () {
            return this.sync()
        }, sync: function (e) {
            return this.collection.sync(e)
        }, bindKeybroad: function () {
            var e = this;
            n(window).off("keydown.design").on("keydown.design", function (t) {
                var n = t.target.nodeName.toLowerCase();
                if (-1 === ["input", "textarea", "select"].indexOf(n))switch (t.keyCode) {
                    case 74:
                        e._handleKeyDown(t);
                        break;
                    case 75:
                        e._handleKeyUp(t)
                }
            })
        }, _handleKeyUp: function (e) {
            var t, n = this.editRegion.currentView || {}, i = n.model;
            i && (t = i.index() - 1, t >= 0 && (this.displayEditView(this.collection.at(t), {edit: !0}), e.preventDefault()))
        }, _handleKeyDown: function (e) {
            var t, n = this.editRegion.currentView || {}, i = n.model;
            i && (t = i.index() + 1, t < this.collection.length && (this.displayEditView(this.collection.at(t), {edit: !0}), e.preventDefault()))
        }, _initAutoLocalStroage: function () {
            var e = function () {
                this.collection.localSync()
            };
            clearInterval(this._autoLocalStorageTimter), this._autoLocalStorageTimter = setInterval(t.bind(e, this), 3e4)
        }, showStorageAlert: function () {
            if (!t.isEmpty(this._storagedData) && JSON.stringify(this._storagedData) !== JSON.stringify(this.collection)) {
                var e = n(c);
                e.one("click", ".js-use-storage", t.bind(function () {
                    this.collection.reset(this._storagedData, {parse: !0, silent: !0}), this.onShow(), e.alert("close")
                }, this)), t.defer(t.bind(function () {
                    this.$el.prepend(e)
                }, this))
            }
        }, toggleSidebar: function () {
            this.collection.length ? this.$(".app-sidebar").show() : this.$(".app-sidebar").hide()
        }, scrollTop: function (e, t) {
            t = t || 200, n("html, body").animate({scrollTop: e}, t)
        }, fixActionsPosition: function () {
            this.$(".app-actions").css("bottom", n(".js-notify").height())
        }, onNotifyShow: function () {
            this.fixActionsPosition()
        }, onNotifyClose: function () {
            this.$(".app-actions").css("bottom", 0)
        }, onClose: function () {
            clearInterval(this._autoLocalStorageTimter)
        }
    });
    return m
}),define("components/fenxiao_sku_change/help", ["require", "core/utils"], function (e) {
    var t = e("core/utils");
    return {
        floor: function (e) {
            return parseInt(100 * e, 10) / 100
        }, getSuggestPrice: function (e) {
            e = parseFloat(e, 10);
            var n = this.floor(e / 1.05), i = 4 * n;
            return {
                fx_price: t.decimalFix(n, 2),
                min_retail_price: t.decimalFix(n, 2),
                max_retail_price: t.decimalFix(i, 2)
            }
        }
    }
}),define("components/fenxiao_sku_change/models/item", ["require", "underscore", "backbone", "../help", "core/utils"], function (e) {
    var t = (e("underscore"), e("backbone")), n = e("../help");
    e("core/utils");
    return t.Model.extend({
        idAttribute: "__id",
        defaults: {
            v1_id: null,
            v2_id: null,
            v3_id: null,
            price: "",
            fx_price: "",
            min_retail_price: "",
            max_retail_price: ""
        },
        validation: {
            fx_price: function (e, t, i) {
                var s = parseFloat(i.price, 10) || 0, o = parseFloat(i.fx_price, 10) || 0;
                if (window._global.is_in_profit_white_list) {
                    if (o > s)return "供货价必须小于等于微商城售价"
                } else if (1.05 * o > s)return "供货价必须小于等于" + n.floor(s / 1.05) + "元（供货价*105%必须小于等于微商城售价）";
                return o ? void 0 : "价格最低为 0.01"
            }, min_retail_price: function (e, t, n) {
                var i = parseFloat(n.price, 10) || 0, s = parseFloat(n.fx_price, 10) || 0, o = parseFloat(n.min_retail_price, 10) || 0;
                return s > o ? "最低建议零售价不能低于供货价" : o > i ? "最低建议零售价不能大于微商城售价" : e ? void 0 : "价格最低为 0.01"
            }, max_retail_price: function (e, t, n) {
                var i = (parseFloat(n.price, 10) || 0, parseFloat(n.fx_price, 10) || 0), s = parseFloat(n.min_retail_price, 10) || 0, o = parseFloat(n.max_retail_price, 10) || 0;
                return s > o ? "最高建议零售价不能小于最低建议零售价" : o > 4 * i ? "最高建议零售价不能高于供货价的4倍" : e ? void 0 : "价格最低为 0.01"
            }
        }
    })
}),define("components/fenxiao_sku_change/models/app", ["require", "underscore", "jquery", "backbone", "core/utils", "./item"], function (e) {
    var t = e("underscore"), n = (e("jquery"), e("backbone")), i = e("core/utils"), s = e("./item");
    return n.Model.extend({
        defaults: {show_notice: !0, fx_price: "", min_retail_price: "", max_retail_price: ""},
        validation: t.extend({}, s.prototype.validation),
        initialize: function () {
            this.calcRowNumber()
        },
        fetch: function () {
            return i.ajax({
                url: window._global.url.www + "/showcase/goods/FenXiaoSku.json",
                type: "GET",
                data: {goods_id: this.get("goods_id")}
            }).done(t.bind(this._fetchDone, this)).fail(t.bind(this._fetchFail, this))
        },
        _fetchDone: function (e) {
            var n, s = this.get("stock");
            0 === s.length ? (n = t.find(e, function (e) {
                return "1" === e.is_combined
            }), n && this.set({
                fx_price: i.decimalFix(n.fx_price, 2),
                min_retail_price: i.decimalFix(n.min_retail_price, 2),
                max_retail_price: i.decimalFix(n.max_retail_price, 2)
            }, {silent: !0})) : t.each(s, function (s) {
                n = t.find(e, function (e) {
                    return e.kdt_goods_sku_id === s.id && "0" === e.is_combined
                }), s.price = i.decimalFix(s.price, 2), n && (s.fx_price = i.decimalFix(n.fx_price, 2), s.min_retail_price = i.decimalFix(n.min_retail_price, 2), s.max_retail_price = i.decimalFix(n.max_retail_price, 2))
            }), this.trigger("sync")
        },
        _fetchFail: function (e) {
            this.trigger("error", e)
        },
        calcRowNumber: function () {
            var e = 0, n = 0, i = 0, s = this.get("stock");
            t.each(s, function (t, o) {
                t.v1_id === s[e].v1_id ? e !== o ? (s[e].row_1_num++, t.row_1_num = 0) : t.row_1_num = 1 : (t.row_1_num = 1, e = o), t.v2_id === s[n].v2_id ? n !== o ? (s[n].row_2_num++, t.row_2_num = 0) : t.row_2_num = 1 : (t.row_2_num = 1, n = o), t.v3_id === s[i].v3_id ? i !== o ? (s[i].row_3_num++, t.row_3_num = 0) : t.row_3_num = 1 : (t.row_3_num = 1, i = o)
            })
        }
    })
}),define("components/fenxiao_sku_change/collections/collection", ["require", "backbone", "../models/item"], function (e) {
    var t = e("backbone"), n = e("../models/item");
    return t.Collection.extend({
        model: n, validate: function () {
            var e = !1;
            return this.each(function (t) {
                t.validate() && (e = !0)
            }), e
        }
    })
}),define("tpl!components/fenxiao_sku_change/templates/item", [], function () {
    return function (obj) {
        var __t, __p = "";
        Array.prototype.join;
        with (obj || {})__p += "", v1_id && row_1_num > 0 && (__p += '\n    <td class="js-v1-row" rowspan="' + (null == (__t = row_1_num) ? "" : __t) + '">' + (null == (__t = v1) ? "" : __t) + "</td>\n"), __p += "\n", v2_id && row_2_num > 0 && (__p += '\n    <td class="js-v2-row" rowspan="' + (null == (__t = row_2_num) ? "" : __t) + '">' + (null == (__t = v2) ? "" : __t) + "</td>\n"), __p += "\n", v3_id && row_3_num > 0 && (__p += '\n    <td class="js-v3-row" rowspan="' + (null == (__t = row_3_num) ? "" : __t) + '">' + (null == (__t = v3) ? "" : __t) + "</td>\n"), __p += "\n<td>¥ " + (null == (__t = price) ? "" : __t) + '</td>\n<td>\n    <input type="text" class="input-mini" name="fx_price" value="' + (null == (__t = fx_price) ? "" : __t) + '">\n</td>\n<td class="min-retail-price">\n    <input type="text" class="input-mini" name="min_retail_price" value="' + (null == (__t = min_retail_price) ? "" : __t) + '" placeholder="最低">\n</td>\n<td class="max-retail-price">\n    <input type="text" class="input-mini" name="max_retail_price" value="' + (null == (__t = max_retail_price) ? "" : __t) + '" placeholder="最高">\n</td>\n';
        return __p
    }
}),define("components/fenxiao_sku_change/views/item", ["require", "underscore", "jquery", "backbone", "marionette", "core/utils", "tpl!../templates/item"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("backbone"), s = e("marionette"), o = e("core/utils");
    return s.ItemView.extend({
        tagName: "tr",
        template: e("tpl!../templates/item"),
        events: {'blur input[type="text"]': "updateModel"},
        modelEvents: {change: "render", "validated:invalid": "handleInvalid", "validated:valid": "handleValid"},
        initialize: function () {
            i.Validation.bind(this)
        },
        updateModel: function (e) {
            var t = n(e.target), i = t.attr("name"), s = t.val();
            if (s = o.decimalFix(s, 2), isNaN(s) && (s = ""), this.model.set(i, s, {validate: !1}), t.val(s), this.model.validate) {
                var a = {};
                a[i] = s, this.model.validate(a)
            }
            e.stopPropagation()
        },
        handleInvalid: function (e, t) {
            this.addErrorMessage(t), this.removeErrorMessage(t)
        },
        handleValid: function () {
            this.removeErrorMessage({})
        },
        addErrorMessage: function (e) {
            t.each(e, function (e, t) {
                var i = this.$('[name="' + t + '"]'), s = i.parent("td"), o = s.find(".error-message");
                s.addClass("manual-valid-error").addClass("error"), 0 === o.size() && (o = n("<div>").addClass("error-message"), s.append(o)), o.html(e)
            }, this)
        },
        removeErrorMessage: function (e) {
            var n = ["fx_price", "min_retail_price", "max_retail_price"];
            t.each(n, function (t) {
                if (!e[t]) {
                    var n = this.$('[name="' + t + '"]'), i = n.parent("td"), s = i.find(".error-message");
                    i.removeClass("manual-valid-error").removeClass("error"), s.remove()
                }
            }, this)
        }
    })
}),define("tpl!components/fenxiao_sku_change/templates/app", [], function () {
    return function (obj) {
        var __t, __p = "";
        Array.prototype.join;
        with (obj || {}) {
            if (__p += '<div class="modal-header">\n    <a class="close" data-dismiss="modal">×</a>\n    <h3 class="title">\n        ', __p += show_notice ? "\n            分销商品变更通知\n        " : "\n            编辑分销商品\n        ", __p += '\n    </h3>\n</div>\n<div class="modal-body">\n    ', show_notice)__p += '\n        <p style="padding: 12px 12px 0 12px;">您对商品所做的操作会造成分销商下架您的商品，请编辑分销信息确保分销商的同步。</p>\n    '; else if (0 === stock.length)__p += '\n        <form class="js-form form-horizontal" onSubmit="return false;">\n            <div class="control-group">\n                <label class="control-label">微商城售价：</label>\n                <div class="controls">\n                    <div class="input-prepend">\n                        <span class="add-on">￥</span>\n                        <input type="text" name="price" value="' + (null == (__t = price) ? "" : __t) + '" class="input-small" readonly disabled>\n                    </div>\n                </div>\n            </div>\n            <div class="control-group">\n                <label class="control-label">供货价格：</label>\n                <div class="controls">\n                    <div class="input-prepend">\n                        <span class="add-on">￥</span>\n                        <input type="text" name="fx_price" value="' + (null == (__t = fx_price) ? "" : __t) + '" class="input-small">\n                    </div>\n                </div>\n            </div>\n            <div class="control-group">\n                <label class="control-label">建议售价：</label>\n                <div class="controls">\n                    <div class="input-prepend">\n                        <span class="add-on">￥</span>\n                        <input type="text" name="min_retail_price" value="' + (null == (__t = min_retail_price) ? "" : __t) + '" class="input-small">\n                    </div>\n                    <span>-</span>\n                    <div class="input-prepend">\n                        <span class="add-on">￥</span>\n                        <input type="text" name="max_retail_price" value="' + (null == (__t = max_retail_price) ? "" : __t) + '" class="input-small">\n                    </div>\n                </div>\n            </div>\n        </form>\n    '; else {
                if (__p += '\n        <table class="table-sku-stock">\n            <thead>\n                <tr>\n                    ', stock[0].k1_id && (__p += "\n                        <th>" + (null == (__t = stock[0].k1) ? "" : __t) + "</th>\n                    "), __p += "\n                    ", stock[0].k2_id && (__p += "\n                        <th>" + (null == (__t = stock[0].k2) ? "" : __t) + "</th>\n                    "), __p += "\n                    ", stock[0].k3_id && (__p += "\n                        <th>" + (null == (__t = stock[0].k3) ? "" : __t) + "</th>\n                    "), __p += '\n                    <th>微商城售价</th>\n                    <th>供货价(元)</th>\n                    <th colspan="2">建议售价(元)</th>\n                </tr>\n            </thead>\n            <tbody class="js-list">\n\n            </tbody>\n            ', stock.length > 1) {
                    __p += "\n                <tfoot>\n                    <tr>\n                        ";
                    var colspan = 5;
                    stock[0].k3_id ? colspan = 7 : stock[0].k2_id && (colspan = 6), __p += '\n                        <td colspan="' + (null == (__t = colspan) ? "" : __t) + '">\n                            <div class="batch-opts">\n                                批量设置：\n                                <span class="js-batch-type" style="display: inline;">\n                                    <a data-attr="fx_price" href="javascript:;">供货价格</a>\n                                    &nbsp;&nbsp;\n                                    <a data-attr="min_retail_price" href="javascript:;">最低建议零售价</a>\n                                    &nbsp;&nbsp;\n                                    <a data-attr="max_retail_price" href="javascript:;">最高建议零售价</a>\n                                </span>\n                                <span class="js-batch-form" style="display: none;">\n                                    <input type="text" class="js-batch-txt input-small" placeholder="请输入价格">\n                                    <a class="js-batch-save" href="javascript:;">保存</a>\n                                    <a class="js-batch-cancel" href="javascript:;">取消</a>\n                                </span>\n                            </div>\n                        </td>\n                    </tr>\n                </tfoot>\n            '
                }
                __p += "\n        </table>\n    "
            }
            __p += '\n    <div class="buttons">\n        <button class="ui-btn ui-btn-primary js-confirm">确定</button>\n        <button class="ui-btn js-close">取消</button>\n    </div>\n</div>\n'
        }
        return __p
    }
}),define("components/fenxiao_sku_change/app", ["require", "jquery", "backbone", "marionette", "core/utils", "./models/app", "./collections/collection", "./views/item", "tpl!./templates/app"], function (e) {
    var t = e("jquery"), n = e("backbone"), i = e("marionette"), s = e("core/utils"), o = e("./models/app"), a = e("./collections/collection"), l = e("./views/item");
    return i.CompositeView.extend({
        className: "widget-fenxiao-sku-change modal fade in",
        template: e("tpl!./templates/app"),
        events: {
            hidden: "hidden",
            'blur .js-form input[type="text"]': "updateModel",
            "click .js-confirm": "handleConfirm",
            "click .js-close": "hide",
            "click .js-batch-type a": "handleBatchTypeClick",
            "click .js-batch-save": "handleBatchSaveClick",
            "click .js-batch-cancel": "handleBatchCancelClick",
            "keypress .js-batch-txt": "handleBatchTxtKeypress"
        },
        itemView: l,
        updateModel: l.prototype.updateModel,
        initialize: function (e) {
            this.options = e || {};
            var t = JSON.parse(JSON.stringify(this.options.data));
            this.model = new o(t), this.collection = new a(this.model.get("stock")), this.once("render", this.show), this.listenTo(this.model, "sync", this.onSync), this.model.fetch(), n.Validation.bind(this), this.render()
        },
        onSync: function () {
            this.collection.reset(this.model.get("stock")), this.render()
        },
        onCompositeModelRendered: function () {
            this.$itemViewContainer = this.$(".js-list")
        },
        onRender: function () {
            this.$el.css(this.model.get("show_notice") || 0 === this.collection.size() ? {
                width: "440px",
                marginLeft: "-220px"
            } : {width: "640px", marginLeft: "-320px"})
        },
        handleConfirm: function () {
            var e = null;
            if (this.model.get("show_notice"))this.model.set("show_notice", !1, {silent: !0}), this.render(); else {
                if (this.validate())return;
                e = this.collection.size() > 0 ? {cancel: !1, stock: this.collection.toJSON()} : {
                    cancel: !1,
                    price: this.model.get("price"),
                    fx_price: this.model.get("fx_price"),
                    min_retail_price: this.model.get("min_retail_price"),
                    max_retail_price: this.model.get("max_retail_price"),
                    stock: []
                }, this.callback(e), this.hide()
            }
        },
        validate: function () {
            var e;
            return e = this.collection.size() > 0 ? this.collection.validate() : this.model.validate(), e && this.scrollToError(), e
        },
        scrollToError: function () {
            var e = t(".error").offset();
            e && t(window).scrollTop(e.top)
        },
        handleBatchTypeClick: function (e) {
            this.currentBatchAttr = t(e.target).data("attr"), this.$(".js-batch-type").hide(), this.$(".js-batch-form").show()
        },
        handleBatchSaveClick: function () {
            var e = t.trim(this.$(".js-batch-txt").val());
            if (!e)return this.handleBatchCancelClick();
            e = parseFloat(e, 10), e = parseInt(100 * e) / 100, e = s.decimalFix(e, 2);
            var n = this.currentBatchAttr;
            this.collection.each(function (t) {
                t.set(n, e, {validate: !1, silent: !0}), t.trigger("change"), t.validate()
            }), this.handleBatchCancelClick()
        },
        handleBatchCancelClick: function () {
            this.$(".js-batch-txt").val(""), this.$(".js-batch-type").show(), this.$(".js-batch-form").hide()
        },
        handleBatchTxtKeypress: function (e) {
            13 === e.keyCode && this.handleBatchSaveClick()
        },
        show: function () {
            this.$el.modal("show")
        },
        hide: function () {
            this.$el.modal("hide")
        },
        hidden: function () {
            this.callback({cancel: !0}), this.close()
        },
        callback: function (e) {
            this.options.callback && (this.options.callback(JSON.stringify(e)), this.options.callback = null)
        }
    })
}),define("views/step3", ["require", "underscore", "components/showcase/2.0.0/base/views/design", "core/reqres", "core/utils", "components/fenxiao_sku_change/app"], function (e) {
    var t = e("underscore"), n = e("components/showcase/2.0.0/base/views/design"), i = e("core/reqres"), s = e("core/utils"), o = e("components/fenxiao_sku_change/app"), a = n.extend({
        ui: {
            load: ".js-btn-load",
            unload: ".js-btn-unload",
            preview: ".js-btn-preview"
        },
        events: {
            "click @ui.load": "handleLoad",
            "click @ui.unload": "handleUnload",
            "click @ui.preview": "handlePreview",
            "change .js-sub-title": "onSubTitleChange",
            "change .js-goods-template": "onGoodsTemplateChange"
        },
        regions: t.extend({}, n.prototype.regions, {modalRegion: ".js-modal-region"}),
        onInit: function (e) {
            var t = this;
            t.collection = e.collection, window.fieldCollection = t.collection, window.design = t, t.goodsModel = t.collection.at(0), t.setupValidationResp(), t.fetched()
        },
        onShow: function () {
            n.prototype.onShow.apply(this, arguments), this.renderChosen()
        },
        renderChosen: function () {
            var e = this, n = this.$(".js-goods-template"), i = n.chosen({no_results_text: "木有找到这个模版："});
            this.$(".js-refresh-goods-template").on("click", function (o) {
                var a = e.goodsModel.get("components_extra_id");
                s.ajax({url: window._global.url.www + "/showcase/goodstemplate/listsimple.json"}).done(function (e) {
                    var s = [], o = t.template('<option value="<%= id %>" <%= selected %>><%= title %></option>');
                    s.push(o({id: "-1", title: "普通版", selected: "-1" == a ? "selected" : ""})), s.push(o({
                        id: "-2",
                        title: "简洁流畅版",
                        selected: "-2" == a ? "selected" : ""
                    })), t.each(e, function (e) {
                        e.selected = e.id == a ? "selected" : "", s.push(o(e))
                    }), n.html(s.join("")), i.trigger("chosen:updated")
                })
            }).trigger("click")
        },
        setupValidationResp: function () {
            var e = this;
            i.setHandler("step3:validate", function () {
                var t = e.collection.validate();
                return t
            })
        },
        onSubTitleChange: function () {
            var e = this.$(".js-sub-title");
            this.goodsModel.set("sub_title", e.val())
        },
        onGoodsTemplateChange: function (e) {
            this.goodsModel.set("components_extra_id", e.target.value)
        },
        getConfigModel: function () {
            return this.collection.at(0)
        },
        checkFenxiaoBeforeSync: function (e) {
            var t = this.getConfigModel();
            t.needToSetFenxiaoPrice() ? new o({
                data: t.toJSON(), callback: function (t) {
                    e(t)
                }
            }) : e()
        },
        handleLoad: function () {
            this.collection.validate() || this.checkFenxiaoBeforeSync(t.bind(this._load, this))
        },
        _load: function (e) {
            var t = this;
            t.ui.load.button("loading"), t.sync({is_display: 1, fenxiao_sku: e}).done(function () {
                s.successNotify("上架成功。", function () {
                    window.location.href = window._global.url.www + "/showcase/goods"
                })
            }).fail(function () {
                t.ui.load.button("reset")
            })
        },
        handleUnload: function () {
            this.collection.validate() || this.checkFenxiaoBeforeSync(t.bind(this._unload, this))
        },
        _unload: function (e) {
            var t = this;
            t.ui.unload.button("loading"), t.sync({is_display: 0, fenxiao_sku: e}).done(function () {
                s.successNotify("下架成功。", function () {
                    window.location.href = window._global.url.www + "/showcase/goods#list&is_display=0"
                })
            }).fail(function () {
                t.ui.unload.button("reset")
            })
        },
        handlePreview: function () {
            this.collection.validate() || this.checkFenxiaoBeforeSync(t.bind(this._preview, this))
        },
        _preview: function (e) {
            if (!this.collection.validate()) {
                var t = this;
                t.ui.preview.button("loading"), t.sync({fenxiao_sku: e}).done(function (e) {
                    s.successNotify("保存成功，正在重定向到 预览页面。", function () {
                        var n = t.collection.alias || e.alias;
                        window.location.href = window._global.url.wap + "/showcase/goods?alias=" + n
                    })
                }).fail(function () {
                    t.ui.preview.button("reset")
                })
            }
        }
    });
    return a
}),define("tpl!templates/app", [], function () {
    return function (obj) {
        var __p = "";
        Array.prototype.join;
        with (obj || {})__p += '<ul class="ui-nav-tab">\n    <li data-next-step="1" class="js-switch-step js-step-1"><a href="javascript:;">1.选择商品品类</a></li>\n    <li data-next-step="2" class="js-switch-step js-step-2"><a href="javascript:;">2.编辑基本信息</a></li>\n    <li data-next-step="3" class="js-switch-step js-step-3"><a href="javascript:;">3.编辑商品详情</a></li>\n</ul>\n<div id="step-content-region">\n</div>\n';
        return __p
    }
}),define("views/app", ["require", "underscore", "jquery", "backbone", "marionette", "vendor/nprogress", "core/reqres", "core/event", "core/utils", "commons/utils", "models/config", "collections/field", "views/step1", "views/step2", "views/step3", "tpl!templates/app"], function (e) {
    var t = e("underscore"), n = e("jquery"), i = e("backbone"), s = e("marionette"), o = e("vendor/nprogress"), a = e("core/reqres"), l = e("core/event"), c = e("core/utils"), r = e("commons/utils"), d = e("models/config"), p = e("collections/field"), u = e("views/step1"), m = e("views/step2"), h = e("views/step3"), _ = s.Layout.extend({
        className: "goods-edit-area",
        template: e("tpl!templates/app"),
        regions: {stepContentRegion: "#step-content-region"},
        ui: {switchTabs: "li.js-switch-step", switchBtn: "button.js-switch-step", switchLink: "a.js-switch-step"},
        events: {
            "click @ui.switchTabs": "switchStep",
            "click @ui.switchBtn": "switchStep",
            "click @ui.switchLink": "switchStep"
        },
        modelEvents: {},
        initialize: function () {
            var e = this;
            e.setServerUrl(), e.ajaxFlag = !1, e.listenTo(l, "goods:create", e.openCreateView), e.listenTo(l, "goods:edit", e.openEditView)
        },
        init: function () {
        },
        onRender: function () {
            this.bindUIElements()
        },
        setServerUrl: function () {
            var e = this, t = window._global.url.www;
            t += "goods" === window._global.goods_type ? "/showcase/goods/item.json" : "/showcase/material/item.json", e.goodsUrl = t
        },
        updateCurrentStep: function (e) {
            this.currentStep = e
        },
        openCreateView: function (e) {
            var t = this;
            o.done(), t.collection = new p([], {url: t.goodsUrl, isCreating: !0, localStorage: !1});
            var n = t.model = new d;
            t.collection.add(n), (!e || e > 2) && (e = 1), t.initBaseModules(), t.updateCurrentStep(e), t["showStep" + t.currentStep + "View"]()
        },
        openEditView: function (e, t) {
            var n = this;
            return e ? (n.collection = new p([], {
                url: n.goodsUrl,
                id: e,
                isCreating: !1,
                localStorage: !1
            }), t = t || 2, n.updateCurrentStep(t), void n.fetchCollectionData()) : (c.errorNotify("请输入一个正确的商品ID。"), !1)
        },
        initBaseModules: function () {
            this._initFlag || (this.setAttrsResp(), this.setupValidation(), this._initFlag = !0)
        },
        setupValidation: function () {
            var e = this;
            i.Validation.bind(e), e.listenTo(e.model, "change", e.validateModel)
        },
        setAttrsResp: function () {
            var e = this.model;
            a.setHandler("goods_attr:get", function (t) {
                var n = e.get(t);
                return n
            })
        },
        validateModel: function (e) {
            e.validate(e.changed)
        },
        fetchCollectionData: function () {
            c.clearNotify(), this.collection.fetch().done(t.bind(this.fetchSuccess.bind(this))).fail(t.bind(this.fetchError.bind(this)))
        },
        fetchSuccess: function () {
            o.done(), this.model = this.collection.at(0), this.initBaseModules(), this["showStep" + this.currentStep + "View"]()
        },
        fetchError: function () {
            c.errorNotify("获取商品数据失败。")
        },
        switchNavTab: function (e) {
            var t = this;
            t.ui.switchTabs.removeClass("active");
            var n = t.ui.switchTabs.filter(".js-step-" + e);
            n.addClass("active")
        },
        showStep1View: function () {
            this.step1View = new u({model: this.model}), this.switchNavTab(1), this.stepContentRegion.show(this.step1View)
        },
        showStep2View: function () {
            var e = this;
            e.step2View = new m({model: e.model}), e.switchNavTab(2), e.stepContentRegion.show(e.step2View)
        },
        showStep3View: function () {
            var e = this;
            e.step3View = new h({collection: e.collection}), e.switchNavTab(3), e.stepContentRegion.show(e.step3View)
        },
        toStep1: function () {
            this.prepareToStep1()
        },
        toStep2: function () {
            var e = this, t = e.currentStep, n = a.request("step" + t + ":validate");
            return n ? (e.errorHandler(2), !1) : void e.prepareToStep2()
        },
        toStep3: function () {
            this.model.validate();
            var e = a.request("attrs:validate"), t = a.request("stock:validate");
            return e || t > 0 || !this.model.isValid() ? (this.errorHandler(3), !1) : void this.prepareToStep3()
        },
        prepareToStep1: function () {
            this.showStep1View(), this.appNavigate(1)
        },
        prepareToStep2: function () {
            var e = this, t = a.request("class_info:has_changed");
            t && e.updateGoodsModel(), e.showStep2View(), e.appNavigate(2)
        },
        prepareToStep3: function () {
            this.showStep3View(), this.appNavigate(3)
        },
        collectStep2Data: function () {
            var e = this, t = e.getBaseData();
            return t.data[0] = e.model.toJSON(), t.data = JSON.stringify(t.data), t
        },
        getBaseData: function () {
            var e = this, t = e.collection.toJSON();
            return t
        },
        saveStep2Data: function (e) {
            var t = this, i = t.$("button.js-switch-step");
            n.ajax({
                url: t.goodsUrl,
                type: "POST",
                dataType: "json",
                timeout: 8e3,
                cache: !1,
                data: e,
                beforeSend: function () {
                    t.ajaxFlag = !0, r.button(i, "保存中...", !0)
                }
            }).done(function (e) {
                0 === e.code ? t.prepareToStep3(e.data) : (c.errorNotify(e.msg), r.button(i, "下一步", !1))
            }).fail(function () {
                r.button(i, "下一步", !1)
            }).always(function () {
                t.ajaxFlag = !1
            })
        },
        switchStep: function (e) {
            var t = this;
            if (e.preventDefault(), t.ajaxFlag)return !1;
            var i = n(e.currentTarget), s = i.data("next-step");
            t["toStep" + s]()
        },
        appNavigate: function (e, t) {
            var n = this;
            n.updateCurrentStep(e);
            var s = n.processHash(e);
            t = "undefined" == typeof t ? !1 : t, i.history.navigate(s, {trigger: t})
        },
        processHash: function (e) {
            var t = i.history.fragment, s = c.deparam(t);
            return s.step = e, t = n.param(s)
        },
        errorHandler: function (e) {
            var t = this;
            return e - t.currentStep > 1 ? (c.errorNotify("请一步步填写页面所需的信息。"), !1) : void t.focusFirstError()
        },
        focusFirstError: function () {
            var e = n(".error-message:eq(0)").parents(".control-group");
            if (0 === e.length)return !1;
            var t = e.offset(), i = t.top - 10;
            n(window).scrollTop(i)
        },
        updateGoodsModel: function () {
            var e = this, n = {}, i = a.request("class_info:get");
            t(n).extend(i), e.model.set(n)
        }
    });
    return _
}),define("app", ["require", "marionette", "core/utils", "views/app"], function (e) {
    var t = e("marionette"), n = e("core/utils"), i = e("views/app"), s = new t.Application;
    return window.Utils = n, s.addRegions({appRegion: "#app-region"}), s.addInitializer(function (e) {
        var t = new i(e);
        s.appRegion.show(t)
    }), s
}),define("routers/router", ["require", "common", "underscore", "components/page_help/help", "backbone", "core/event"], function (e) {
    var t = (e("common"), e("underscore"), e("components/page_help/help")), n = e("backbone"), i = e("core/event");
    return t("showcase_goods_create"), n.Router.extend({
        routes: {
            "": "createGoods",
            "id=:id&step=:step": "editGoods",
            "id=:id": "editGoods",
            "step=:step": "createGoods"
        }, createGoods: function (e) {
            e = e ? Number(e) : "", i.trigger("goods:create", e)
        }, editGoods: function (e, t) {
            t = t ? Number(t) : "", i.trigger("goods:edit", e, t)
        }
    })
}),define("main", ["require", "backbone", "vendor/nprogress", "common", "bootstrap", "chosen", "select2", "backbone.modelbinder", "components/help_notes/com", "components/message/message_bot_lite", "app", "routers/router"], function (e) {
    var t = e("backbone"), n = e("vendor/nprogress");
    e("common"), e("bootstrap"), e("chosen"), e("select2"), e("backbone.modelbinder"), e("components/help_notes/com");
    var i = e("components/message/message_bot_lite"), s = e("app"), o = e("routers/router");
    return {
        initialize: function (e) {
            i.init(), n.start(), s.start(e), window.router = new o, t.history.start()
        }
    }
});