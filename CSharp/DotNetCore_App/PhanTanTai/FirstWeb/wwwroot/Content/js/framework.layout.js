var framework = window.framework || {};
framework.layout = (function () {
    var _header = widget.setting.header();
    var _content = widget.setting.content();
    var _footer = widget.setting.footer();
    var _layout = widget.setting.panel();


    layout.addClass('box box-inverse')
        .addItem(header.end(), 'box-title')
        .addItem(content.end(), 'box-content no-padding')
        .addItem(footer.end(), 'box-footer');

    

    var tmp = parent.split('.');
    var widgetName = tmp[tmp.length - 1];

    $("#page").panel(framework.layout[widgetName + 'Layout'](header, content, footer));

    return {
        "properties": {
            header: _header,
            footer: _footer
        },
        "create": function(){

        }
    };
})();