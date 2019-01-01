var framework = window.framework || {};
framework.layout = framework.layout || {};
$.extend(framework.layout, {
    listpageLayout: function (header, content, footer) {
        //options.onInitHeader && options.onInitHeader(header);
        //options.onInitContent && options.onInitContent(content);
        //options.onInitFooter && options.onInitFooter(footer);

        var layout = widget.setting.panel();


        layout.addClass('box box-inverse')
            .addItem(header.end(), 'box-title')
            .addItem(content.end(), 'box-content no-padding')
            .addItem(footer.end(), 'box-footer');

        return layout.end();
    },
    createHeader: function($parrent) {

    }
});