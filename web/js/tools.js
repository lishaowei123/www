/*****************************底部总计计算begin****************************************/
// 数值计算，解决js中float运算bug
var accMul = function (arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length
    } catch (e) {
    }
    try {
        m += s2.split(".")[1].length
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
};
var accAdd = function (arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m
};
var accSub = function (arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m - arg2 * m) / m
};
/*编码转换*/
var urldecode = function (url) {
    if (isChinese(url)) {
        return url;
    } else {
        try {
            return decodeURIComponent(url.replace(/\+/g, ' '));
        } catch (e) {
            console.log(e);
            return '';
        }
    }

};
/*encode编码转换*/
var urlencode = function (url) {
    return encodeURIComponent(url);
};
/*decode编码转换*/
var Contdecode = function (url) {
    return decodeURIComponent(url);
};


/*UTF8长度计算*/
function getStrLeng(str) {
    var realLength = 0;
    var len = str.length;
    var charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        realLength += 1;
    }
    return realLength;
}
/*计算字符串占用多少字节*/
function getBt(str) {
    var char = str.match(/[^\x00-\xff]/ig);
    return str.length + (char == null ? 0 : char.length);
}
/*链接参数*/
var getRequest = function () {
    var url = location.search;
    var theRequest = {};
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0, len = strs.length; i < len; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
        }
    }
    return theRequest;
};
var request = getRequest();
/*判断当前设备*/
var isiOS = navigator.userAgent.match('iPad')
    || navigator.userAgent.match('iPhone')
    || navigator.userAgent.match('iPod'), isAndroid = navigator.userAgent
    .match('Android'), isDesktop = !isiOS && !isAndroid;
var uainfo = navigator.userAgent.toLowerCase();
/*触摸和鼠标事件*/
var touchEvents = {
    touchstart: "touchstart",
    touchmove: "touchmove",
    touchend: "touchend",

    /**
     * @desc:判断是否pc设备，若是pc，需要更改touch事件为鼠标事件，否则默认触摸事件
     */
    initTouchEvents: function () {
        if (isDesktop) {
            this.touchstart = "mousedown";
            this.touchmove = "mousemove";
            this.touchend = "mouseup";
        }
    }

};
touchEvents.initTouchEvents();

/*非法字符校验*/
var consigneeLen = 15;
var nameLen = 15;
var pwdMinLen = 6;
var pwdMaxLen = 18;
var shopLen = 32;
var addressLen = 40;
var tip = {

    emptyConsignee: "姓名",
    tipConsignee: "请输入收货人姓名",
    emptyPersonalNum: "身份证号码",
    tipPersonalNum: "请输入身份证号码",
    rightPersonalNum: "请输入正确的身份证号码",
    lenTipConsignee: "字符个数不能超过" + consigneeLen + "个",
    emptyPhone: "手机号码",
    emptyMobile: "请输入联系电话",
    tipMobile: '请输入手机号',
    tipPhone: "请输入11位手机号码",
    rightPhone: "请输入正确的手机号码",
    emptyArea: "市辖区",
    emptyCity: "市辖县",
    emptyAddress: "请输入详细地址",
    tipAddress: "请输入地址",
    lenTipAddress: "字符个数不能超过" + addressLen + "个",

    emptyOutlet: '请输入门店兑换码',

    emptyName: "姓名",
    tipName: "请输入姓名",
    lenTipName: "字符个数不能超过" + nameLen + "个",

    commentTip: "我也说一句",
    emptyComment: "请输入评论内容",
    emptyThink: '请输入心得',
    emptyWeixin: '微信号',
    tipWeixin: '请输入微信号',
    tipCont: '请输入您的需求',

    emptyChooseOrder: '请选择订单',

    emptyChooseDate: '请选择时间',

    emptyWlNo: '请输入物流单号',
    tipNumber: '请输入数字',

    tipFinishOrder: '确认完成订单？',
    tipCancelOrder: '确定取消订单？',
    tipCancelPay: '确定已经退款？',
    tipDelete: '确定要删除吗？',
    tipAble: '确定要上架吗？',
    tipEnable: '确定要下架吗？',
    tipMoveCate: '确定要移除该分类吗？',
    tipOpen: '确定要启用吗？',
    tipStop: '确定要停用吗？',

    emptyProductName: '请输入商品名称',
    emptyProductPrice: '请输入商品价格',
    emptyAttr: '请选择属性',
    tipMaxAttr: '最多只能添加两个属性',

    tipInputPhone: '请填写您的手机号码',
    tipRegisterAccount: '注册哪吒账号',
    tipExitAccount: '该号码注册过，请直接登录',
    tipFindPwd: '找回账户密码',
    tipSetPwd: '设置登录密码，下次登录使用',
    tipInputPwd: '请输入登录密码',
    tipSetNewPwd: '设置一个新的登录密码',
    tipSetShop: '创建我的微小店',
    emptyCode: '输入短信验证码',
    tipCode: '请填写4位短信验证码',
    rightCode: '请输入右侧验证码',
    lenTipPwd: '密码长度' + pwdMinLen + '~' + pwdMaxLen + '个字符',
    lenNotPwd: '确认密码和第一次不相同',
    emptyShop: '请填写正确的店铺名称',
    lenTipShop: '店铺名称长度不能超过' + shopLen + '位',
    tipHasMall: '您已经创建过微小店啦',
    tipMallSuccess: '店铺创建成功',
    tip: '提示',
    manageMyMall: '请在电脑端管理店铺，点击关闭页面',
    manageYourMall: '请在电脑端管理店铺，点击关闭页面',
    emptyNickName: '昵称不能为空',
    purposeResult: '您的信息已收集，稍后将有专员联系您',
    emptyFlow: '暂无流水记录',
    emptyData: '暂无数据',
    emptyOrder: '暂无订单',
    maxImage: '最多上传1张图片',
    emptyImage: '请上传图片',
    sendSuccess: '发布成功',
    sendFail: '发布失败',
    tipRightUrl: '请输入正确链接',
    saveSuccess: '保存成功',
    saveFail: '保存失败',

    tipAward1: '返现可以提现，确定奖励',
    tipAward2: '元返现么？',
    emptyPraiseList: '暂无点赞',
    emptyCommentList: '暂无评论',
    tipHasAward: '已经奖励该单',
    allowSingle: '全局可发表晒单',
    blockSingle: '全局禁止用户发表新晒单',
    allowComment: '全局可发表评论',
    blockComment: '全局禁止评论',
    allowRead: '全局评论可见',
    blockRead: '全局评论不可见',
    tipBlockSingle: '禁止所有用户发表新晒单',
    tipBlockComment: '禁止所有用户对晒单发表评论',
    tipBlockRead: '隐藏所有晒单评论',

    tipContact: '请输入称呼',
    tipNeed: '请输入需要',
    tipDeleteImg: '确定删除所选图片吗？',
    tipPraiseSuccess: '您已经帮他邀请到财神一位',
    tipInviteSuccess: '德江南已经帮你请到10名财神<br/>快去财神商城兑换礼品',
    tipInviteTxt: '邀请你的朋友们帮忙请财神把！<br/>财神好礼等你来抢  '
};
/*获取当前域名*/
var host = window.location.host;
var registerPageUrl = '/portal/center/register2';
var modifyPageUrl = '/portal/center/modify2';
var emptyPersonalNum = function (str) {
    var t = /\d{17}[\d|x]|\d{15}/;
    return t.test(str);
};
var isNumber = function (str) {
    var t = /^-?[0-9]\d*$/;
    return t.test(str);
};
var isAmount = function (str) {
    var t = /^([+-]?)\d*\.?\d+$/;
    return t.test(str);
};
var isPersonalNum = function (str) {
    var t = /\d{17}[\d|x]|\d{15}/;
    return t.test(str);
};
var isPhone = function (str) {
    var t = /[0-9-()（）]{7,18}/;
    return t.test(str);
};
var isMobile = function (str) {
    var t = /0?(13|14|15|17|18)[0-9]{9}/;
    return t.test(str);
};
var isTel = function (str) {
    var t = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
    return t.test(str);
};
var isMobile2 = function (str) {
    var t = /^1\d{10}$/;
    return t.test(str);
};
var isURL = function (URL) {
    var str = URL;
    //判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
    //下面的代码中应用了转义字符"\"输出一个字符"/"
    var Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
    var objExp = new RegExp(Expression);
    if (objExp.test(str) == true) {
        return true;
    } else {
        return false;
    }
};
/*仅中文*/
var isChinese = function (str) {
    var t = /^[\u4e00-\u9fa5]+$/;
    return t.test(str);
};
var isEmail = function (str) {
    var t = /\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/;
    return t.test(str);
};
/*email*/

/*ajax请求*/
var get = function (reqUrl, params, callback) {
    $.ajax({
        url: reqUrl,
        async: false,
        type: 'GET',
        data: params,
        success: function (data) {
            callback(data);
        }
    });
};
var post = function (reqUrl, params, callback) {
    $.ajax({
        url: reqUrl,
        async: false,
        type: 'POST',
        data: params,
        success: function (data) {
            callback(data);
        }
    });
};
var ajaxGet = function (reqUrl, params, callback) {
    $.ajax({
        url: reqUrl,
        type: 'GET',
        data: params,
        success: function (data) {
            callback(data);
        }/*, error: function (XMLHttpRequest, textStatus, errorThrown) {
         console.log(XMLHttpRequest.status);
         console.log(XMLHttpRequest.readyState);
         console.log(textStatus);
         }*/
    });
};
var ajaxPost = function (reqUrl, params, callback) {
    $.ajax({
        url: reqUrl,
        type: 'POST',
        data: params,
        success: function (data) {
            callback(data);
        }/*, error: function (XMLHttpRequest, textStatus, errorThrown) {
         console.log(XMLHttpRequest.status);
         console.log(XMLHttpRequest.readyState);
         console.log(textStatus);
         }*/
    });
};
/*时间戳转换成日期*/
var timeToDate = function (timestamp, i) {
    format = 'yyyy-MM-dd hh:mm:ss';
    var i = i || 1000;
    var date = new Date(parseInt(timestamp * i, 10)),
        o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds()
        };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};
// 无时、分、秒
var timeToDay = function (timestamp, i) {
    format = 'yyyy-MM-dd';
    var i = i || 1000;
    var date = new Date(parseInt(timestamp * i, 10)),
        o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds()
        };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};
// yyyy.mm.dd
var timeToDay2 = function (timestamp, i) {
    format = 'yyyy.MM.dd';
    var i = i || 1000;
    var date = new Date(parseInt(timestamp * i, 10)),
        o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds()
        };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};
var getTimeStr = function (time) {
    if (!time) {
        return '';
    }
    var date = new Date(parseInt(time) * 1000);
    //return date.toLocaleString()
    var year = date.getFullYear();
    var moth = (date.getMonth() + 1 < 10) ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    var minutes = date.getMinutes() + 1 < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return year + '-' + moth + '-' + day + ' ' + hour + ':' + minutes + ':' + second;
};
/*获取当天时间*/
var getTodayStr = function () {
    var date = new Date();
    var year = date.getFullYear();
    var moth = (date.getMonth() + 1 < 10) ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return year + '-' + moth + '-' + day;
};
var show_tip = function (content, params, func) {
    var record_alert_dialog = document.getElementById('record_alert_dialog');
    if (!record_alert_dialog) {
        record_alert_dialog = document.createElement('div');
        record_alert_dialog.className = 'record_alert';
        record_alert_dialog.setAttribute('id', 'record_alert_dialog');
        record_alert_dialog.innerHTML = ' <div class="alert-body"></div><div class="alert-footer">停止 录音</div>';
        document.body.appendChild(record_alert_dialog);
        record_alert_dialog.children[1].onclick = function () {
            func(params);
        }
    }
    record_alert_dialog.style.display = 'block';
    record_alert_dialog.children[0].innerHTML = '<i class="icon_voice"></i>  ' + content;
};
/*保留小数点后两位*/
var fmtNumber = function (number) {
    number = number + "";
    if (number.indexOf(".") == -1) {
        number = number + ".00";
    } else {
        var endStr = number.substr(number.indexOf(".") + 1, number.length);
        var befStr = number.substr(0, number.indexOf("."));

        if (endStr.length == 1) {
            number = befStr + "." + endStr + "0";
        } else if (endStr.length == 2) {
            number = befStr + "." + endStr;
        } else if (endStr.length > 2) {
            endStr = number.substr(number.indexOf(".") + 1, 2);
            number = parseFloat(number).toFixed(2) + "";
        }
    }
    return number;
};
/*重写确认框*/
confirm2 = function (title, param, func, cancel, content1, content2) {
    var alertModal = document.createElement('div');
    alertModal.className = 'modal-backdrop';
    alertModal.setAttribute('id', 'confirmModal');
    document.body.appendChild(alertModal);
    alertModal.style.display = 'block';
    var alertDialog = document.createElement('div');
    alertDialog.className = 'dialog alert confirm';
    alertDialog.setAttribute('id', 'confirmDialog');
    alertDialog.innerHTML = ' <div class="alert-body"></div><div class="alert-footer">' + '<button type="button" class="ui button orange btn-alert btn-confirm">' + (param.buttons ? param.buttons[1] : content2) + '</button><button type="button" class="ui button gray btn-alert btn-cancel">' + (param.buttons ? param.buttons[0] : content1) + '</button>' + '</div>';
    document.body.appendChild(alertDialog);
    var cancel1 = alertDialog.children[1].children[1];
    var commit1 = alertDialog.children[1].children[0];
    cancel1.onclick = function () {
        var confirmModal = document.getElementById('confirmModal');
        confirmModal.parentNode.removeChild(confirmModal);
        var confirmDialog = document.getElementById('confirmDialog');
        confirmDialog.parentNode.removeChild(confirmDialog);
        if (cancel) {
            cancel();
        }
    };
    if (param && param.isShowCancel) {
        cancel1.parentNode.removeChild(cancel1);
        commit1.style.width = '90%';
    }
    commit1.onclick = function () {
        if (!param || !param.isRemove) {
            var confirmModal = document.getElementById('confirmModal');
            confirmModal.parentNode.removeChild(confirmModal);
            var confirmDialog = document.getElementById('confirmDialog');
            confirmDialog.parentNode.removeChild(confirmDialog);
        }
        func(param);
    };
    alertDialog.style.display = 'block';
    alertDialog.children[0].innerHTML = title;
};
/*加载中*/
var showLoading = function () {
    var alertModal = document.getElementById('alertModal');
    if (!alertModal) {
        alertModal = document.createElement('div');
        alertModal.className = 'modal-backdrop';
        alertModal.setAttribute('id', 'alertModal');
        document.body.appendChild(alertModal);
    }
    alertModal.style.display = 'block';
    var loadingDialog = document.getElementById('loadingDialog');
    if (!loadingDialog) {
        loadingDialog = document.createElement('div');
        loadingDialog.className = 'float-loading';
        loadingDialog.setAttribute('id', 'loadingDialog');
        loadingDialog.innerHTML = '<img src="/images/portal/common/loading.gif"/>';
        document.body.appendChild(loadingDialog);
    }
    loadingDialog.style.display = 'block';
};
var hideLoading = function () {
    var alertModal = document.getElementById('alertModal');
    if (alertModal) {
        setTimeout(function () {
            alertModal.style.display = 'none';
        }, 500);

    }
    var loadingDialog = document.getElementById('loadingDialog');
    if (loadingDialog) {
        setTimeout(function () {
            loadingDialog.style.display = 'none';
        }, 500);

    }
};
/*微信关闭当前窗口*/
var close_time = null;
var wx_close_window = function () {

    if (typeof WeixinJSBridge == 'undefined') {
        if (close_time)clearTimeout(close_time);
        close_time = setTimeout(function () {
            wx_close_window();
        }, 100);
    } else {
        WeixinJSBridge.call('closeWindow');
    }
};

var urlHasMallId = function (url) {
    return url;
};
var changeEmotion = function (str) {
    str = str.replace(/\</g, '&lt;');
    str = str.replace(/\>/g, '&gt;');
    str = str.replace(/\n/g, '<br/>');
    str = str.replace(/\[em_(\d+)\]/g, '<img src="/images/wei_face/[em_$1].gif" border="0"/>');
    return str;
};

/*消息提示框*/
var messageBox = function (msg, state, reload) {
    /*成功提示*/
    var message_box_success_obj = $('#message-box-success');
    var mb_span_obj = $('.message-box-success .mb-span');
    var mb_p_obj = $('.message-box-success .mb-p');
    /*错误提示*/
    var message_box_danger_obj = $('#message-box-danger');
    var mb_danger_span_obj = $('.message-box-danger .mb-span');
    var mb_danger_p_obj = $('.message-box-danger .mb-p');

    var mb_control_close_obj = $('.mb-control-close');
    var success_timeout = null;
    var danger_timeout = null;

    if (state == 1) {
        /*成功的情况*/
        message_box_success_obj.addClass('open');
        mb_span_obj.html(msg);
        success_timeout = setTimeout(function () {
            message_box_success_obj.removeClass('open');
            if (reload == 1) {
                /*刷新的情况*/
                location.reload();
            } else {

            }
        }, 1500);
    } else if (state == 0) {
        /*失败的情况*/
        message_box_danger_obj.addClass('open');
        mb_danger_span_obj.html(msg);
        danger_timeout = setTimeout(function () {
            message_box_danger_obj.removeClass('open');
            if (reload == 1) {
                location.reload();
            } else {

            }
        }, 1500);
    }

    mb_control_close_obj.click(function () {
        //message_box_success_obj.removeClass('open');
        //message_box_danger_obj.removeClass('open');
    });

};

/*确认框*/
var confirmBox = function (title) {

    var mask_obj = $('.mask');
    var confirm_dialog_obj = $('.confirm-dialog');
    var confirm_title_obj = $('.confirm-title');
    var toCancel_obj = $('.toCancel');
    var pop_closed_obj = $(".pop_closed");
    confirm_dialog_obj.fadeIn();
    mask_obj.fadeIn();
    confirm_title_obj.html(title);
    toCancel_obj.click(function () {
        confirm_dialog_obj.fadeOut();
        mask_obj.fadeOut();

    });

    pop_closed_obj.click(function () {
        confirm_dialog_obj.fadeOut();
        mask_obj.fadeOut();

    });

};

var getMallId = function () {

    var url = location.host;
    var urlArray = url.split('.');
    return urlArray[0];


};

var inputObj = $('input');
var textAreaObj = $('textarea');

function trim(s) {
    return trimRight(trimLeft(s));
}
//去掉左边的空白
function trimLeft(s) {
    if (s == null) {
        return "";
    }
    var whitespace = String(" \t\n\r");
    var str = String(s);
    if (whitespace.indexOf(str.charAt(0)) != -1) {
        var j = 0, i = str.length;
        while (j < i && whitespace.indexOf(str.charAt(j)) != -1) {
            j++;
        }
        str = str.substring(j, i);
    }
    return str;
}
//去掉右边的空白
function trimRight(s) {
    if (s == null) return "";
    var whitespace = String(" \t\n\r");
    var str = String(s);
    if (whitespace.indexOf(str.charAt(str.length - 1)) != -1) {
        var i = str.length - 1;
        while (i >= 0 && whitespace.indexOf(str.charAt(i)) != -1) {
            i--;
        }
        str = str.substring(0, i + 1);
    }
    return str;
}
function uniencode(text) {
    text = escape(text.toString()).replace(/\+/g, "%2B");
    var matches = text.match(/(%([0-9A-F]{2}))/gi);
    if (matches) {
        for (var matchid = 0; matchid < matches.length; matchid++) {
            var code = matches[matchid].substring(1, 3);
            if (parseInt(code, 16) >= 128) {
                text = text.replace(matches[matchid], '%u00' + code);
            }
        }
    }
    text = text.replace('%25', '%u0025');
    return text;
}
var time = null;
var hideMenu = function () {
    if (typeof WeixinJSBridge == 'undefined') {
        if (time)clearTimeout(time);
        time = setTimeout(function () {
            hideMenu();
        }, 100);
    } else {
        WeixinJSBridge.call('hideOptionMenu');
        WeixinJSBridge.call('hideToolbar');
    }
};
var showMenu = function () {
    var time = null;
    var show = function () {
        if (typeof WeixinJSBridge == 'undefined') {
            if (time)clearTimeout(time);
            time = setTimeout(function () {
                show();
            }, 100);
        } else {
            WeixinJSBridge.call('showOptionMenu');
        }
    };
    show();
};

hideMenu();

var isIe = function () {
    return window.ActiveXObject ? true : false;
};

/*返回顶部*/
var goTop = function () {

    var goTopObj = $('.goTop');
    /*返回顶部*/
    $(document).scroll(function () {
        if ($(window).scrollTop() <= 400) {
            goTopObj.fadeOut();
        } else {
            goTopObj.fadeIn();
        }
    });

    goTopObj.click(function () {
        $(window).scrollTop(0);
        goTopObj.fadeOut();
    });

};

var menu = function () {
    /*底部菜单点击*/
    $('.menu .item').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
    });
    /*底部菜单点击*/
};
function isDate(obj) {
    var strDate = obj.value;
    var re = /^(\d{4})(\d{2})(\d{2})$/g
    if (re.test(strDate))//判断日期格式符合YYYY-MM-DD
    {
        return true;
    } else {
        return false;
    }
}

var toGetDay = function (str) {
    var dayStr = '';
    switch (new Date(str).getDay()) {
        case 0:
            dayStr = '星期日';
            break;
        case 1:
            dayStr = '星期一';
            break;
        case 2:
            dayStr = '星期二';
            break;
        case 3:
            dayStr = '星期三';
            break;
        case 4:
            dayStr = '星期四';
            break;
        case 5:
            dayStr = '星期五';
            break;
        case 6:
            dayStr = '星期六';
            break;
        default:
            break;

    }
    return dayStr;
};
var stripLeadingZeroes = function (input) {
    if ((input.length > 1) && (input.substr(0, 1) == "0")) {
        return input.substr(1);
    } else {
        return input;
    }
};
var human2unix = function () {
    var humanDate = new Date(Date.UTC(2015, (stripLeadingZeroes('9') - 1), stripLeadingZeroes('15'), stripLeadingZeroes('0'), stripLeadingZeroes('0'), stripLeadingZeroes('0')));
    return (humanDate.getTime() / 1000 - 8 * 60 * 60);
};
var dateToTime = function (dateStr) {
    if (dateStr) {
        return new Date(dateStr).getTime() / 1000;
    }
};
var dateToTimeS = function (dateStr) {
    if (dateStr) {
        return new Date(dateStr).getTime();
    }
};

function ages(str) {
    var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if (r == null)return false;
    var d = new Date(r[1], r[3] - 1, r[4]);
    if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
        var Y = new Date().getFullYear();
        return (Y - r[1]);
    }
    return ("输入的日期格式错误！");
}

extend = function (a, b) { //合并对象
    if (typeof a !== "object" || typeof b !== "object") {
        return;
    }
    for (key in b) {
        a[key] = b[key];
    }
    return a;
};

extend(Date.prototype, {
    /***********格式化日期[YYYY|YY]-MM-DD hh:mm:ss*************/
    format: function (format) {
        var self = this;
        return format.replace(/([a-z]+)/ig, function (a, b, c, d) {
            if (/Y{2,}/.test(b)) {
                return b.length === 4 ? self.getFullYear() : ('' + self.getFullYear()).substr(2);
            } else if (/M{2}/.test(b)) {
                return (self.getMonth() + 1) < 10 ? '0' + (self.getMonth() + 1) : self.getMonth() + 1;
            } else if (/D{2}/.test(b)) {
                return (self.getDate()) < 10 ? '0' + self.getDate() : self.getDate();
            } else if (/h{2}/.test(b)) {
                return self.getHours() < 10 ? '0' + self.getHours() : self.getHours();
            } else if (/m{2}/.test(b)) {
                return self.getMinutes() < 10 ? '0' + self.getMinutes() : self.getMinutes();
            } else if (/s{2}/.test(b)) {
                return self.getSeconds() < 10 ? '0' + self.getSeconds() : self.getSeconds();
            } else {
                return 0;
            }
        })
    }
});

function setDayVal(val) {
    var now = new Date();
    if (!/-?\d+/.test(val)) {
        return now;
    }
    now.setDate(now.getDate() + parseInt(val));
    return now;
}
/*当前时间的前n天*/
var currentTime = function (n) {
    var now = new Date;
    now.setDate(now.getDate() - n);
    return objToDay(now);
};
var currentTime2 = function (str, n) {
    var now = new Date(str);
    now.setDate(now.getDate() - n);
    return objToDay(now);
};
var objToDay = function (obj) {
    return new Date(obj).getFullYear() + '-' + (new Date(obj).getMonth() + 1) + '-' + new Date(obj).getDate();
};

/*判断某年某月有多少天*/
function getDaysInMonth(year, month) {
    var day;
    switch (parseInt(month)) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            day = 31;
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            day = 30;
            break;
        case 2:
            if (parseInt(year) % 4 == 0 && parseInt(year) % 100 != 0 || parseInt(year) % 400 == 0)
                day = 29;
            else
                day = 28;
            break;
        default:
            break;
    }
    return day;
}
