window.onload = function () {
    $(".item_error").each(function () {
        if ($(this).find('.cont').text().length > 0) {
            $(this).parent().addClass('has-error');
        }
    });
};