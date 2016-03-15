window.onload = function () {
    if ($("img.guide").length > 0) {
        var _nTimer = 0,
            _oGuide$ = $(".guide"),
            _oGuideTrigger$ = $("#guideTrigger, #tipTrigger"),
            _oMask$ = $(".mask");

        function _back() {
            _nTimer = setTimeout(function () {
                _oMask$.stop().animate({opacity: 0}, function () {
                    $(".mask").hide()
                });
                _oGuide$.stop().animate({marginLeft: "-120px", opacity: 0}, "400", "swing", function () {
                    _oGuide$.hide();
                });
            }, 100);
        }

        /*guide*/
        _oGuide$.css({"left": "50%", "opacity": 0});
        _oGuideTrigger$.css({"backgroundColor": "white", "opacity": "0"});
        _oGuideTrigger$.mouseover(function () {
            clearTimeout(_nTimer);
            _oMask$.show().stop().animate({"opacity": 0.2});
            _oGuide$.css("display", "block").stop().animate({
                marginLeft: "+168px",
                opacity: 1
            }, 900, "swing", function () {
                _oGuide$.animate({marginLeft: "+153px"}, 300);
            });
            _ossLog();
        }).mouseout(_back);

        _oGuide$.mouseover(function () {
            clearTimeout(_nTimer);
        }).mouseout(_back);
    }
};
