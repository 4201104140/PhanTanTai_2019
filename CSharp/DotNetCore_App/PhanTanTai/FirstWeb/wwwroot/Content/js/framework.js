var framework = window.framework || {};
$.extend(framework, {
    createNamespace: function (baseName, scope) {
        var ns = baseName.split('.');
        var o = scope || window;
        for (var i = 0, l = ns.length; i < l; i++) {
            o = o[ns[i]] = o[ns[i]] || {};
        }
        return o;
    },
    lazyLoad: function (url, callback) {
        var url = url || url.url;
        var callback = callback || url.callback;
        $.ajax({
            url: url,
            dataType: 'script',
            success: callback,
            async: true
        });
    },
    factory: function (pageName, options) {
        //luu lai option de chay version cu
        var pureOptions = $.extend(true, {}, options);
        framework.global.registerPurePageOptions(pageName, pureOptions);
        require(['layout', 'panel'], function () {
            //Trước khi vẽ page 
            //-----------------------------------------------------------------------------------


            //gán ParentId và ViewBag
            options.parentData = {};
            options.parentId = ViewBag.ParentId || null;
            options.parentPageName = options.parentId ? ViewBag.ParentId.split('_')[0] : null;
            options.onInitViewBag && options.onInitViewBag(ViewBag);
            options.ViewBag = ViewBag;
            options.isPopup = function () {
                return options.ViewBag.ParentId ? true : false;
            };

            ViewBag = null;
            delete window.ViewBag;

            options.pageName = pageName;
            var pageOptions = {
                dataIn: options
            };

            //child function
            if (pageOptions.dataIn.parentId) {
                $.extend(options, {
                    sendMessage: function (message) {
                        var parentPage = framework.global.findPage(pageOptions.dataIn.parentId);
                        parentPage.onMessageReceive && parentPage.onMessageReceive(options, message)
                        $.each(w2ui, function (key, form) {
                            if (form._type == 'form') {
                                if (key.startsWith(pageOptions.dataIn.parentId)) {
                                    $.each(form.fields, function (fieldKey, field) {
                                        var data = $(field.el).data('w2field');
                                        if (data != null && data.openedPageOptions && pageOptions.dataIn.pageId == data.openedPageOptions.dataIn.pageId) {
                                            data.onMessageReceive && data.onMessageReceive(options, message);
                                        }
                                    });
                                }
                            }
                        });
                    },
                });
            }

            //default function
            if (options.onMessageReceive) {
                pageOptions.onMessageReceive = function (sender, message) {
                    options.onMessageReceive(sender, message);
                }
            }

            //page init
            $('#page').parent().trigger('onPageInit', options);


            //-----------------------------------------------------------------------------------

            //create layout
            var layoutSetting = layout.setting.page(pageName, options);

            //create page
            var page = $('#page').panel(layoutSetting);

            //thêm dataOut
            $.extend(pageOptions, { dataOut: $(page).data("widget-panel").options });

            //register page
            framework.global.registerPage(pageOptions.dataOut._pageId, pageOptions);

            //đổi id của thẻ page
            page.attr('id', pageOptions.dataOut._pageId);



            $.extend(pageOptions.dataIn, {
                isPopup: function () {
                    return pageOptions.dataIn.ParentId ? true : false;
                },
                openPopup: function (options, params, openedPageOptions) {
                    framework.common.openPopup(pageOptions.dataOut._pageId, options, params, openedPageOptions);
                },
                findElement: function (name, findAll) {
                    return framework.global.findElementByPageId(pageOptions.dataOut._pageId, name, findAll);
                },
                $el: layoutSetting.template,
                pageId: pageOptions.dataOut._pageId,
                pageName: pageName,

                //rootPageId: framework.global.getRootPageId(),
                //$contentEl: layoutSetting.items[0].template,
                //$headerEl: layoutSetting.items[1].template,
                //$footerEl: layoutSetting.items[2].template,
                //getPage: function (pageId) {
                //    return {
                //        getElement: function (name) {
                //            console.log(pageId);
                //            framework.global.findWidgetByPageId(pageId, name);
                //        }
                //    };
                //}
            });

            //thêm data vào el sau khi vẽ xong 
            page.data('pageOptions', pageOptions);
            //trigger pageLoadComplete để sử dụng popup
            if (pageOptions.dataIn.parentId) {
                $(page.parent()).trigger('pageLoadComplete');
                $(page.parent()).on('remove', function () {
                    //su kien xay ra khi close 1 page mo duoi dang popup

                    //remove data chua trong w2ui
                });
            }


            if (options.onLoadComplete) {
                require(['domReady'], function () {
                    framework.common.tryFunc(options.onLoadComplete.bind(options));
                });
            }
        });
    },
});