/*!
 * Check browser
 * Author: zhugao
 * Date: 2013-7-23
 */

var checkBrowser = {
    ua: navigator.userAgent,
    help: function () {
        location.href = window._global.url.www + '/index/browser';
    },
    goIndex: function () {
        location.href = window._global.url.www + '/dashboard/index';
    },
    subtitleEnabled: function () {
        return "track" in document.createElement("track");
    },
    scopedEnabled: function () {
        return "scoped" in document.createElement("style");
    },
    isChrome: function () {
        if (this.ua.indexOf("Chrome") !== -1) return true;
        return false;
    },
    isIOS: function () {
        if (/(iPhone|iPad|iPod)/i.test(this.ua)) return true;
        return false;
    },
    isAndroid: function () {
        if (/Android/i.test(this.ua)) return true;
        return false;
    },
    isMac: function () {
        return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    },
    isSafari: function () {
        if (this.ua.indexOf("Safari") != -1) return true;
        return false;
    },
    isSougou: function () {
        if (navigator.userAgent.toLowerCase().indexOf('se 2.x') != -1) return true;
        return false;
    },
    is360: function () {
        if (this.subtitleEnabled() && this.scopedEnabled()) return true;
        return false;
    },

    // 检查所有页面
    checkAllPage: function () {

        if (this.isIOS() || this.isAndroid()) {
            return;
        }

        if (!this.isChrome()) {
            if ((this.isMac() || this.isIOS()) && this.isSafari()) {
                // 在IOS上使用safari
            } else {
                this.help();
            }
        }
    },

    // 检查chrome下载页面
    checkHelpPage: function () {
        if (this.isChrome()) {
            this.goIndex();
        }
    }
};


if (window._isDownloadChromePage) {
    checkBrowser.checkHelpPage();
} else {
    checkBrowser.checkAllPage();
}