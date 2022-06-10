(function ($) {
    $.fn.usPhoneFormat = function (options) {
        var params = $.extend({
            format: 'xxx-xxx-xxxx',
            international: false,

        }, options);

        if (params.format === 'xxx-xxx-xxxx') {
            $(this).bind('paste', function (e) {
                var pastedText;
                if (window.clipboardData && window.clipboardData.getData) { // IE
                    pastedText = window.clipboardData.getData('Text');
                } else if (e.originalEvent.clipboardData && e.originalEvent.clipboardData.getData) { // other browsers
                    pastedText = e.originalEvent.clipboardData.getData('Text');
                }
                pastedText = pastedText.replace(/[^a-zA-Z0-9]/g, '');
                if (pastedText.match(/[^\d]/) || isNaN(pastedText)) {
                    e.preventDefault();
                } else {
                    e.preventDefault();
                    var inputValue = pastedText;
                    var res1 = inputValue.substring(0, 3);
                    var res2 = inputValue.substring(3, 6);
                    var res3 = inputValue.substring(6, 10);
                    var displayval1 = '(' + res1 + ')' + " ";
                    var displayval2 = displayval1 + res2 + "-" + res3;
                    $(this).val(displayval2);
                    $(this).change();
                }
            });
            $(this).on('keypress', function (e) {
                if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                    return false;
                }
                var curchr = this.value.length;
                var curval = $(this).val();
                if (curchr == 3) {
                    $(this).val(curval + "-");
                } else if (curchr == 7) {
                    $(this).val(curval + "-");
                }
                $(this).attr('maxlength', '12');
            });

        } else if (params.format === '(xxx) xxx-xxxx') {
            $(this).on('keypress', function (e) {
                if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                    return false;
                }
                var curchr = this.value.length;
                var curval = $(this).val();
                if (curchr == 3) {
                    $(this).val('(' + curval + ')' + " ");
                } else if (curchr == 9) {
                    $(this).val(curval + "-");
                }
                $(this).attr('maxlength', '14');
            });
            $(this).bind('paste', function (e) {

                var pastedText;
                if (window.clipboardData && window.clipboardData.getData) { // IE
                    pastedText = window.clipboardData.getData('Text');
                } else if (e.originalEvent.clipboardData && e.originalEvent.clipboardData.getData) { // other browsers
                    pastedText = e.originalEvent.clipboardData.getData('Text');
                }
                pastedText = pastedText.replace(/[^a-zA-Z0-9]/g, '');
                if (pastedText.match(/[^\d]/) || isNaN(pastedText)) {
                    e.preventDefault();
                } else {
                    e.preventDefault();
                    var inputValue = pastedText;
                    var res1 = inputValue.substring(0, 3);
                    var res2 = inputValue.substring(3, 6);
                    var res3 = inputValue.substring(6, 10);
                    var displayval1 = '(' + res1 + ')' + " ";
                    var displayval2 = displayval1 + res2 + "-" + res3;
                    $(this).val(displayval2);
                    $(this).change();
                }
            });

        }
    }
    $.fn.usPhoneFormatforsearch = function (options) {
        var params = $.extend({
            format: 'xxx-xxx-xxxx',
            international: false,

        }, options);

        if (params.format === 'xxx-xxx-xxxx') {
            $(this).bind('paste', function (e) {
                var pastedText;
                if (window.clipboardData && window.clipboardData.getData) { // IE
                    pastedText = window.clipboardData.getData('Text');
                } else if (e.originalEvent.clipboardData && e.originalEvent.clipboardData.getData) { // other browsers
                    pastedText = e.originalEvent.clipboardData.getData('Text');
                }
                pastedText = pastedText.replace(/[^a-zA-Z0-9]/g, '');
                if (pastedText.match(/[^\d]/) || isNaN(pastedText)) {
                    e.preventDefault();
                } else {
                    e.preventDefault();
                    var inputValue = pastedText;
                    var res1 = inputValue.substring(0, 3);
                    var res2 = inputValue.substring(3, 6);
                    var res3 = inputValue.substring(6, 10);
                    var displayval1 = '(' + res1 + ')' + " ";
                    var displayval2 = displayval1 + res2 + "-" + res3;
                    $(this).val(displayval2);
                    $(this).change();
                }
            });
            $(this).on('keypress', function (e) {
                if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                    return false;
                }
                var curchr = this.value.length;
                var curval = $(this).val();
                if (curchr == 3) {
                    $(this).val(curval + "-");
                } else if (curchr == 7) {
                    $(this).val(curval + "-");
                }
                $(this).attr('maxlength', '12');
            });

        } else if (params.format === '(xxx) xxx-xxxx') {
            $(this).on('keypress', function (e) {
                if (e.which != 8 && e.which != 0 && e.which != 13 && (e.which < 48 || e.which > 57)) {
                    return false;
                }
                var curchr = this.value.length;
                var curval = $(this).val();
                if (curchr == 3) {
                    $(this).val('(' + curval + ')' + " ");
                } else if (curchr == 9) {
                    $(this).val(curval + "-");
                }
                $(this).attr('maxlength', '14');
            });
            $(this).bind('paste', function (e) {
                var pastedText;
                if (window.clipboardData && window.clipboardData.getData) { // IE
                    pastedText = window.clipboardData.getData('Text');
                } else if (e.originalEvent.clipboardData && e.originalEvent.clipboardData.getData) { // other browsers
                    pastedText = e.originalEvent.clipboardData.getData('Text');
                }
                pastedText = pastedText.replace(/[^a-zA-Z0-9]/g, '');
                if (pastedText.match(/[^\d]/) || isNaN(pastedText)) {
                    e.preventDefault();
                } else {
                    e.preventDefault();
                    var inputValue = pastedText;
                    var res1 = inputValue.substring(0, 3);
                    var res2 = inputValue.substring(3, 6);
                    var res3 = inputValue.substring(6, 10);
                    var displayval1 = '(' + res1 + ')' + " ";
                    var displayval2 = displayval1 + res2 + "-" + res3;
                    $(this).val(displayval2);
                    $(this).change();
                }
            });

        }
    }
}(jQuery));

/*
Code End
*/
