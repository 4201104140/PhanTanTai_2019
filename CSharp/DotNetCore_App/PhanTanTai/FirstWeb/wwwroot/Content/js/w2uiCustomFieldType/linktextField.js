$().w2field('addType', 'popupLinkText', function (options) {
    options.click && $(this.el).click(options.click);
    options.text && $(this.el).val(options.text);
    $(this.el).css({
        'text-decoration': 'underline',
        'color': 'blue',
        'cursor': 'pointer',
    });
    $(this.el).attr('readonly', true);
});

$().w2field('addType', 'popupMultiLinkText', function (options) {
    $(this.el).css({ display: 'none' });
    var self = this;
    $.each(options.links, function (k, v) {
        var t = $("<a>").html(v.text);
        $(self.el).parent().append(t);
        v.click && t.click(v.click);
        t.css({
            'text-decoration': 'underline',
            'color': 'blue',
            'cursor': 'pointer',
            'margin-right': '20px'
        });
    });

    $(this.el).attr('readonly', true);
});
