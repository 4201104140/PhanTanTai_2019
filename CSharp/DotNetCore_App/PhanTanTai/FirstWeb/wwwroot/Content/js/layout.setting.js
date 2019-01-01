var layout = window.layout || {};
layout.setting = function () {
    return {
        page: function (pageId, options) {
            options.pageId = framework.global.makeId(pageId);
            var createPanel = function () {
                var _panel = widget.setting.panel();
                return _panel;
            }
            var createHeader = function (options) {
                var _header = widget.setting.header();
                return _header;
            };
            var createContent = function (options) {
                var _content = widget.setting.content();
                return _content;
            };
            var createFooter = function () {
                var _footer = widget.setting.footer();
                return _footer;
            };

            var _page = createPanel();
            var _header = createHeader();
            var _content = createContent();
            var _footer = createFooter();

            if (options.onInitHeader) {
                _page.addItem(_header);
                $.extend(options, {
                    $headerEl: _header.getTemplateEl()
                });
            }
            if (options.onInitContent) {
                _page.addItem(_content);
                $.extend(options, {
                    $contentEl: _content.getTemplateEl()
                });
            }
            if (options.onInitFooter) {
                _page.addItem(_footer);
                $.extend(options, {
                    $footerEl: _footer.getTemplateEl()
                });
            }
            if (!options.parentId) {
                _page.css({
                    'overflow': 'auto',
                    height: 'auto'
                });
            }
            else {
                _page.css({
                    'overflow': 'auto',
                });
            }
            options.onInitPage && options.onInitPage(options);
            options.onInitHeader && options.onInitHeader(_header);
            options.onInitContent && options.onInitContent(_content);
            options.onInitFooter && options.onInitFooter(_footer);

            var _end = _page.end();

            $.extend(_end, { _pageId: options.pageId });


            return _end;
        },

    }
}();