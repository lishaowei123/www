/**
 * Created by Administrator on 2015/9/10.
 */
var fn = {};
var bodyObj = $('body');
/*弹框*/
var maskObj = $('.mask');
var maskObj2 = $('.mask2');
var containerObj = $('.container');
var containerObj2 = $('.container2');
var closeContainerObj = $('.close-container');
var closeContainerObj2 = $('.close-container2');
$(function () {

    /*****************************变量声明***************************/

    /*确认框*/
    var confirmDialogObj = $('.confirm-dialog');
    var confirmTitleObj = $('.confirm-title');
    var toConfirmObj = $('.to-confirm');


    var inputObj = $('input');
    var textareaObj = $('textarea');
    var selectObj = $('select.select');

    /*****************************变量声明***************************/

    /*****************************功能模块***************************/

    fn['confirmDialog'] = function (title, action) {
        confirmTitleObj.html(title);
        toConfirmObj.attr('data-action', action);
        confirmDialogObj.fadeIn();
        maskObj.fadeIn();

    };

    fn['removeBorder'] = function (obj) {
        if (obj.hasClass('border-red') || obj.hasClass('error')) {
            obj.removeClass('border-red');
            obj.removeClass('error');
            obj.val('');
        }
    };

    fn['showVideoContainer'] = function () {
        $('.video-container').fadeIn();
        maskObj.fadeIn();
    };
    fn['hideVideoContainer'] = function () {
        $('.video-container').fadeOut();
        maskObj.fadeOut();
    };

    /*****************************功能模块***************************/

    /*****************************事件绑定***************************/

    fn['pageBind'] = function () {

        /*关闭弹框*/
        closeContainerObj.bind(touchEvents.touchstart, function () {
            containerObj.fadeOut();
            maskObj.fadeOut();
        });
        closeContainerObj2.bind(touchEvents.touchstart, function () {
            containerObj2.fadeOut();
            maskObj2.fadeOut();
        });

        inputObj.bind(touchEvents.touchstart, function () {
            fn['removeBorder']($(this));
        });
        $('div').bind(touchEvents.touchstart, function () {
            fn['removeBorder']($(this));
        });
        textareaObj.bind(touchEvents.touchstart, function () {
            fn['removeBorder']($(this));
        });

        selectObj.siblings('.select').bind(touchEvents.touchstart, function () {
            if ($(this).hasClass('border-red')) {
                $(this).removeClass('border-red');
            }
        });
        selectObj.parents('.form-group').find('button').bind(touchEvents.touchstart, function () {
            if ($(this).hasClass('border-red') || $(this).hasClass('error')) {
                $(this).removeClass('border-red');
                $(this).removeClass('error');
            }
        });

        $('.error').bind(touchEvents.touchstart, function () {
            if ($(this).hasClass('error')) {
                $(this).removeClass('error');
            }
        });

        $('.simditor-toolbar li').bind(touchEvents.touchstart, function () {
            /*if($(this).find('a').hasClass('toolbar-item-ol') || $(this).find('a').hasClass('toolbar-item-ul')){

             }else{
             $('.simditor-body').focus();
             }*/

        });
        if (document.getElementById('links')) {
            document.getElementById('links').onclick = function (event) {
                event = event || window.event;
                var target = event.target || event.srcElement;
                var link = target.src ? target.parentNode : target;
                var options = {
                    index: link, event: event, onclosed: function () {
                        setTimeout(function () {
                            $("body").css("overflow", "");
                        }, 200);
                    }
                };
                var links = this.getElementsByTagName('a');
                blueimp.Gallery(links, options);
            };

        }

    };

    /*****************************事件绑定***************************/

    /*****************************初始化***************************/

    fn['pageInit'] = function () {
        fn['pageBind']();

    };
    fn['pageInit']();

    /*****************************初始化***************************/

});