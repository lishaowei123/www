/**
 * Created by Administrator on 2015/6/18.
 */

var OpenImageDepotPosition = 0;

var OpenImageDepotState = 0;
function OpenImageDepot() {
    getImageData();

    if (OpenImageDepotState == 0) {
        getImageGroup();
    }
    OpenImageDepotPosition = 1;
    $(".img_dialog_wrp").show();
    //$(".fix-bg").show();
    $(".mask").show();
}


function getImageGroup() {
    ajaxGet('/manage/api/images/image_group/list', {}, function (data) {
        var json = eval(data)["data"];
        var str = '';

        $.each(json, function (k, v) {
            str += '<dd id="js_group' + v.id + '" class="inner_menu_item js_groupitem" data-id="' + v.id + '">';
            str += '<a href="javascript:;" class="inner_menu_link" title="' + v.name + '" onclick="return false">';
            str += '<strong>' + v.name + '</strong><em class="num">(<span>' + v.total + '</span>)</em>';
            str += '</a>';
            str += '</dd>';
            str += '';
        });

        $(".js_group").html(str);
        $(".js_group > dd").eq(0).addClass("selected");
        OpenImageDepotState = 1;
    });
}

// 获取图片信息列表
var imgLoadState = 0;
var imgParam = {};
var imgPage = 1;
var imgPageCount = 0;
var imgArr = [];
var imgObj = {};
var imgGroup = -1;
function getImageData() {
    var str = '';
    var $list = $(".img_list");
    var $page_num = $(".img_dialog_wrp .page_num");
    imgParam.page = imgPage;
    if (imgGroup != -1) {
        imgParam.group_id = imgGroup;
    } else {
        delete imgParam.group_id;
    }
    ajaxGet('/manage/api/images/list', imgParam, function (data) {
        var json = eval(data);
        var obj = json["data"].list;
        imgPageCount = Math.ceil(json["data"].count / 12);
        str = '';
        $.each(obj, function (k, v) {
            str += '<li class="img_item js_imageitem" data-id="' + v.id + '" data-url="" data-format="">';
            str += '<label class="frm_checkbox_label img_item_bd">';
            str += '<img src="' + v.image + '" alt="" class="pic">';
            //str += '<span class="lbl_content">' + v.name + '</span>';
            str += '<div class="selected_mask">';
            str += '<div class="selected_mask_inner"></div>';
            str += '<div class="selected_mask_icon"></div>';
            str += '</div>';
            str += '</label>';
            str += '</li>';
            str += '';

        });
        imgArr[imgPage] = obj;
        $page_num.children("label").eq(0).text(imgPage);
        $page_num.children("label").eq(1).text(imgPageCount);

        $list.html(str);
    });
    if (imgArr[imgPage] == undefined) {

    } else {
        str = '';
        $.each(imgArr[imgPage], function (k, v) {
            str += '<li class="img_item js_imageitem" data-id="' + v.id + '" data-url="" data-format="">';
            str += '<label class="frm_checkbox_label img_item_bd">';
            str += '<img src="' + v.image + '" alt="" class="pic">';
            //str += '<span class="lbl_content">' + v.name + '</span>';
            str += '<div class="selected_mask">';
            str += '<div class="selected_mask_inner"></div>';
            str += '<div class="selected_mask_icon"></div>';
            str += '</div>';
            str += '</label>';
            str += '</li>';
            str += '';

        });
        $page_num.children("label").eq(0).text(imgPage);
        $page_num.children("label").eq(1).text(imgPageCount);

        $list.html(str);

    }


}