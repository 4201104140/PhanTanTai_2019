var framework = window.framework || {};
framework.common = framework.common || {};
$.extend(framework.common, {

    /*
    Example
    var option = {
        url : 'UIFile/FileMgt/File/FileDownload
        data : myData
    }

    var sampleObject = {
        CommandAction:'data'
    }
    */
    //normalizePopupSize:function(options){
    //    if(options.)
    //},
    downloadFile: function (option, sampleObject) {
        if (sampleObject) {
            var prefixName = '';
            (function createPrefixName(object) {
                $.each(object, function (k, v) {
                    prefixName += k + '.';
                    //kiem tra, neu gap string thi dung;
                    if (typeof v != 'string')
                        createPrefixName(v);
                });
            })(sampleObject);
        }
        var form = $('<form>');
        for (var nameOfProperties in option.data) {
            var valueOfProperties = option.data[nameOfProperties];
            var name = '';
            if (sampleObject)
                name = prefixName + nameOfProperties;
            else
                name = nameOfProperties;
            var element = $('<input>').attr({
                'type': 'text',
                'name': name,
                'value': valueOfProperties,
            });
            form.append(element);

        }
        form.attr({
            'method': 'POST',
            'action': option.url
        });

        $(document.body).append(form);
        form.submit();
        form.remove();

    },
    formSubmit: function (parameters, sampleObject) {
        if (sampleObject) {
            var prefixName = '';
            (function createPrefixName(object) {
                $.each(object, function (k, v) {
                    prefixName += k + '.';
                    //kiem tra, neu gap string thi dung;
                    if (typeof v != 'string')
                        createPrefixName(v);
                });
            })(sampleObject);
        }
        if (document.getElementById("submitFrame")) {
            $('#submitFrame').remove();
        }

        var iFrame = document.createElement('iframe');
        iFrame.src = "about:blank";
        iFrame.id = "submitFrame";
        iFrame.name = "submitFrame";
        iFrame.style.visibility = "hidden";
        iFrame.height = "0";
        iFrame.width = "0";
        iFrame.style.border = 0;

        document.body.appendChild(iFrame);
        var idocument = iFrame.contentWindow.document;

        submitForm = idocument.createElement("form");
        submitForm.setAttribute("target", "submitFrame");
        submitForm.setAttribute("method", "Post");
        submitForm.setAttribute("action", parameters.url);

        for (var nameOfProperties in parameters.data) {
            var valueOfProperties = parameters.data[nameOfProperties];
            var name = '';
            if (sampleObject)
                name = prefixName + nameOfProperties;
            else
                name = nameOfProperties;

            var hiddenField = idocument.createElement("input");
            hiddenField.setAttribute('type', "hidden");
            hiddenField.setAttribute('name', name);
            hiddenField.setAttribute('value', valueOfProperties);
            submitForm.appendChild(hiddenField);
        }
        iFrame.appendChild(submitForm);

        submitForm.submit();
        //loginIFrame.remove();
    },
    exportExcel: function (option) {
        //option = {url, data}
        var iframe = document.createElement("iframe");
        //iframe.sandbox = "allow-forms";
        document.body.appendChild(iframe);
        var form = document.createElement("form");

        for (var nameOfProperties in option.data) {
            var valueOfProperties = option.data[nameOfProperties];

            if ($.isPlainObject(valueOfProperties)) {
                for (var child in valueOfProperties) {
                    var element = document.createElement("input");
                    element.type = 'text';
                    element.name = nameOfProperties + '.' + child;
                    element.value = valueOfProperties[child];
                    form.appendChild(element);
                }
            }
            else {
                var element = document.createElement("input");
                element.type = 'text';
                element.name = nameOfProperties;
                element.value = valueOfProperties;
                form.appendChild(element);
            }
        }
        form.style.visibility = 'hidden';
        iframe.appendChild(form);
        form.method = 'POST';
        form.action = option.url;
        form.submit();
        iframe.remove();
    },
    exportPdf: function (option) {
        //option = {url, data}
        var iframe = document.createElement("iframe");
        document.body.appendChild(iframe);
        var form = document.createElement("form");
        for (var nameOfProperties in option.data) {
            var valueOfProperties = option.data[nameOfProperties];
            var element = document.createElement("input");
            element.type = 'text';
            element.name = nameOfProperties;
            element.value = valueOfProperties;
            form.appendChild(element);
        }
        form.style.visibility = 'hidden';
        iframe.appendChild(form);
        form.method = 'POST';
        form.action = option.url;
        form.submit();
        document.body.removeChild(iframe);
    },
    api: function (url, param, calback) {
        var url = url.url || url;
        var param = url.param || param;
        var calback = url.calback || calback;

    },
    openWindow: function (params) {

    },
    openPopup: function (parentId, options, params, openedPageOptions) {
        var defaultOptions = {
            name: 'unnamedPopup',
            minHeight: 0,
            height: 500,
            width: 950,
            position: {
                my: "center top+80px",
                at: "center top",
                of: window
            },
            modal: false,
            resizable: true,
            openMultiple: false,
            hide: 'fade',
            show: 'fade',
            close: function (event, ui) {
                //remove ra khỏi framework.global.findElementByPageId
                if (event.currentTarget) {
                    framework.global.unregisterElementByPageId(parentId, options.name || 'unnamedPopup');
                }
                //remove popup html
                $(this).dialog('destroy').dialogExtend('destroy').remove();
            }
        };

        var defaulDialogExtendOptions = {

            maximizable: true,
            minimizable: true,
            collapsable: false,
            maximize: function (e) {
                $(e.target).trigger('resize');
            },
            restore: function (e) {
                $(e.target).trigger('resize');
            },
            minimize: function (e) {
                $(e.target).trigger('resize');
            }
        }

        $.extend(defaultOptions, options);
        $.extend(defaulDialogExtendOptions, options);

        if (options.autoResize == true) {
            $.extend(defaultOptions, {
                height: 'auto',
            });
        }

        var params = params || {};
        $.extend(params, {
            ParentId: parentId
        });
        var openPopup = function () {
            var dialog = $('<div>').load(options.url, params);
            $(dialog).attr('style', $(dialog).attr('style') + '; ' + 'overflow: auto !important');
            $(dialog).dialog(defaultOptions).dialogExtend(defaulDialogExtendOptions);
            framework.global.registerElementByPageId(parentId, defaultOptions.name, dialog);

            $(dialog).on('onPageInit', function (event, childPageOption) {
                childPageOption.parentData = options.data || {};
            });
            //sau khi vẽ page xong
            $(dialog).on('pageLoadComplete', function (event) {

                //tìm con chứa data là pageOptions
                $.each(dialog[0].childNodes, function (k, v) {
                    var data = $(v).data();
                    if (data.pageOptions) {
                        $.extend(data.pageOptions.dataIn, {
                            close: function () {
                                framework.global.unregisterElementByPageId(parentId, options.name || 'unnamedPopup');
                                $(dialog).dialog('close');
                            },
                            minimize: function () {
                                $(dialog).dialogExtend('minimize');
                            },
                            restore: function () {
                                $(dialog).dialogExtend('restore');
                            },
                            maximize: function () {
                                $(dialog).dialogExtend('maximize');
                            },
                            collapse: function () {
                                $(dialog).dialogExtend('collapse');
                            },
                            getState: function () {
                                if (!$(dialog).dialog("isOpen"))
                                    return 'closed';
                                else
                                    return $(dialog).dialogExtend('state');
                            },
                            moveToTop: function () {
                                $(dialog).dialog("moveToTop");
                            },
                            loadContent: function (url, params) {
                                params = params || {};
                                //parent id của page mới sẽ là pageid của page cũ
                                $.extend(params, {
                                    ParentId: data.pageOptions.dataIn.pageId
                                });
                                $(dialog).load(url, params);
                            }
                        });
                        //gán openedPageOptions nếu có, openedPageOptions chứa data của page được mở bằng popup
                        if (openedPageOptions) {
                            openedPageOptions.dataIn = data.pageOptions.dataIn;
                            openedPageOptions.dataOut = data.pageOptions.dataOut;
                        }
                        return false;
                    }
                });
            });
        };
        if (defaultOptions.openMultiple)
            openPopup();
        else {
            var popup = framework.global.findElementByPageId(parentId, defaultOptions.name);
            if (popup) {
                try {
                    $(popup).dialog('close');
                    framework.global.unregisterElementByPageId(parentId, options.name || 'unnamedPopup');
                } catch (err) {
                    console.log(err);
                }
            }
            openPopup();

        }
    },
    tryFunc: function (callback, timeout, maxCount, count) {
        var self = this;
        try {
            count = count || 0;
            console.log(count++);
            callback && callback();
        } catch (err) {
            if (count >= (maxCount || 10)) {
                throw err;
            } else {
                setTimeout(function () {
                    self.tryFunc(callback, timeout, maxCount, count);
                }, timeout || 10);
            }
        }
    },
    cmdResultNoti: function (data, options) {
        if (data.IsSuccess) {
            var message = data.Message && data.Message !== 'success' ? data.Message : 'Thực hiện thành công';
            this.noti(message, options);
        } else {
            this.noti(data.Message || 'Lỗi không xác định', {
                title: 'Lỗi'
            });
        }
    },
    noti: function (message, options) {
        var opt = {
            text: message,
            sticky: false,
            title: "Thông báo",
            time: 5000
        };

        if (options) {
            $.extend(true, opt, options);
        }

        $.gritter.add(opt);
    },
    getHeight: function (isPopup) {
        if (isPopup) {
            return (window.screen.height / 2) + 20;
        }
        return window.screen.height - 1;

    },
    precisionRound(number, precision) {
        var factor = Math.pow(10, precision);
        return Math.round(number * factor) / factor;
    },
    iconGrid: function (iconClass, color) {
        var icon = $('<i class="fa fa-lg ' + (iconClass || 'fa-pencil') + '" aria-hidden="true" >');
        icon.css({
            'color': color || 'blue',
            'position': 'absolute',
            'padding-left': '3px',
            'top': '5px'
        });
        return icon[0].outerHTML;
    },
    formatNumber: function (data, type) {
        var val = data || 0;
        if (w2utils.isMoney(val) && type == 'money') {
            val = w2utils.formatNumber(data, w2utils.settings.currencyPrecision, w2utils.settings.groupSymbol);
            val = w2utils.settings.currencyPrefix + val + w2utils.settings.currencySuffix;
        }
        else if (w2utils.isMoney(val) && type == 'int') {
            val = w2utils.formatNumber(data, w2utils.settings.currencyPrecision, w2utils.settings.groupSymbol);
        }
        return val;
    },
});


//gitter options. https://github.com/jboesch/Gritter/wiki
$.extend($.gritter.options, {
    position: 'bottom-right', // defaults to 'top-right' but can be 'bottom-left', 'bottom-right', 'top-left', 'top-right' (added in 1.7.1)
    fade_in_speed: 'medium', // how fast notifications fade in (string or int)
    fade_out_speed: 2000, // how fast the notices fade out
    time: 6000 // hang on the screen for...
});

// String.format
if (!String.format) {
    String.format = function (format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined' ?
                args[number] :
                match;
        });
    };
}