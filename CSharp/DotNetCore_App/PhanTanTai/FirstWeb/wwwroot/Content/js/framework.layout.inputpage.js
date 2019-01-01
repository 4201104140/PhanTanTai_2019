var framework = window.framework || {};
$.extend(framework.layout || {}, {
    inputpageLayout: function (header, content) {
        var layout = widget.setting.panel();
        layout
            .addItem(header, 'box box-inverse')
            .addItem(content, 'box box-transparent');
        return layout.end();
    }
});