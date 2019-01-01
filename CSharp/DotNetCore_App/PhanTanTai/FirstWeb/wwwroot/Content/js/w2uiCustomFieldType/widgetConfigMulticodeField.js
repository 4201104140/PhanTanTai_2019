var popupMulticodeFieldOptions = {
    'multipopupListPostLabel': {
        idPropertyName: 'PostLabelId',
        textPropertyName: 'PostLabelName',
        executeSearchUrl: '/UIWorkingThreadMgt/PostLabel/PostLabelExecuteSearch',
        pageListPopupUrl: '/UIWorkingThreadMgt/PostLabel/PostLabelList',
        getMessageData: function (message, isFromAPI) {
            if (isFromAPI)
                return message.Data.Data;
            else //from child page
                return message.data;
        },
        getSearchParams: function (inputText) {
            return {
                CommandAction: {
                    PostLabelName: inputText,
                    CurrentPage: 1
                }
            };
        }
    },
    'multipopupUserList': {
        idPropertyName: 'UserId',
        textPropertyName: 'Username',
        executeSearchUrl: '/RetailSecurity/User/UserExecuteSearch',
        pageListPopupUrl: '/RetailSecurity/User/UserList',
        getMessageData: function (message, isFromAPI) {
            if (isFromAPI)
                return message.Data.Data;
            else //from child page
                return message.data;
        },
        getSearchParams: function (inputText) {
            return {
                CommandAction: {
                    Username: inputText,
                    CurrentPage: 1
                }
            };
        }
    },
    'multipopupCategoryList': {
        idPropertyName: 'CategoryId',
        textPropertyName: 'Name',
        executeSearchUrl: '/RetailProduct/Category/CategoryExecuteSearch',
        pageListPopupUrl: '/RetailProduct/Category/CategoryList',
        getMessageData: function (message, isFromAPI) {
            if (isFromAPI) {
                return JSON.parse(message.Data.Data);
            }
            else //from child page
                return message.data;
        },
        getSearchParams: function (inputText) {
            return {
                CommandAction: {
                    Name: inputText,
                    CurrentPage: 1
                }
            };
        }
    }
};
(function initMulticodePopup() {
    $.each(popupMulticodeFieldOptions, function (key, popupMulticodeFieldOptions) {
        createMulticodePopup(key, popupMulticodeFieldOptions);
    });
})();

function createMulticodePopup(key, popupMulticodeFieldOptions) {
    $().w2field('addType', key, function (options) {
        var self = this;
        //for new 
        var caller;
        if (options.callerPageId && !options.caller) {
            caller = options.callerPageId && framework.global.findPage(options.callerPageId).dataIn;

            !caller && console.log("You must provide callerPageId in options", options);
        }
            //for old
        else {
            caller = options.caller;

        }

        //sửa lại indentity của dữ liệu
        //bắt buộc có hàm này để lấy dữ liệu kiểu string
        this.toMulticodeString = function () {
            return self.fieldData.map(function (data) {
                return data[popupMulticodeFieldOptions.idPropertyName];
            }).join('∂');
        }

        $(this.el).css('width', '30%')
        //.attr('disabled', 'disabled')
        ;
        var blockHolder;
        if ($(self.el).parent().find('.blockHolder').length) {
            //form.clear()
            blockHolder = $(self.el).parent().find('.blockHolder');
            blockHolder.html('<li index=\"1\" style=\"max-width: 250px; \"><\/li>')
            self.fieldData = null;
        }
        else {
            var blockHtml = "";
            blockHtml += "<div class=\"w2ui-field-helper w2ui-list\" style=\"border:0px; position:absolute; max-width: 70%; width: auto!important; pointer-events: auto; overflow: auto;\">";
            blockHtml += "    <div style=\"padding: 0px; margin: 0px; margin-right: 20px; display: inline-block\">";
            blockHtml += "        <ul class='blockHolder'>";
            blockHtml += "            <li index=\"1\" style=\"max-width: 250px; \"><\/li>";
            blockHtml += "        <\/ul>";
            blockHtml += "    <\/div>";
            blockHtml += "<\/div>";
            $(blockHtml).insertAfter(this.el);
            blockHolder = $(self.el).parent().find('.blockHolder');
        }

        var addData = function (data) {
            if (!self.fieldData)
                self.fieldData = [];
            debugger;
            if ($.isArray(data)) {
                $.each(data, function (k, v) {
                    if (!isExist(v, self.fieldData)) {
                        self.fieldData.push(v);
                        //sửa lại caption và value
                        blockHolder.prepend("<li id='" + v[popupMulticodeFieldOptions.idPropertyName] + "' index=\"0\" style=\"max-width: 250px; \"><div class=\"w2ui-list-remove\" onClick='$(this).parent().remove();' title=\"Remove\" index=\"0\">&nbsp;&nbsp;<\/div>" + v[popupMulticodeFieldOptions.textPropertyName] + "<\/li>");
                        $(blockHolder).find('#' + v[popupMulticodeFieldOptions.idPropertyName]).on('remove', function () {
                            removeData(v[popupMulticodeFieldOptions.idPropertyName], self.fieldData);
                        });
                    }
                });
            }
            else {
                if (!isExist(data, self.fieldData)) {
                    self.fieldData.push(data);
                    blockHolder.prepend("<li id='" + data[popupMulticodeFieldOptions.idPropertyName] + "' index=\"0\" style=\"max-width: 250px; \"><div class=\"w2ui-list-remove\" onClick='$(this).parent().remove();' title=\"Remove\" index=\"0\">&nbsp;&nbsp;<\/div>" + data[popupMulticodeFieldOptions.textPropertyName] + "<\/li>");
                    $(blockHolder).find('#' + data[popupMulticodeFieldOptions.idPropertyName]).on('remove', function () {
                        removeData(data[popupMulticodeFieldOptions.idPropertyName], self.fieldData);
                    });
                }

            }
        }

        var isExist = function (data, fieldData) {
            var flag = false;
            $.each(fieldData, function (k, v) {
                if (data[popupMulticodeFieldOptions.idPropertyName] == v[popupMulticodeFieldOptions.idPropertyName]) {
                    flag = true;
                    return false;
                }
            });
            return flag;
        };

        var removeData = function (recid, fieldData) {
            $.each(fieldData, function (k, v) {
                if (recid == v[popupMulticodeFieldOptions.idPropertyName]) {
                    fieldData = fieldData.splice(k, 1);
                    return false;
                }
            });
        }

        if (options.data) {
            addData(options.data);
        }


        //this sau khi extend sẽ được chứa trong $(this.el).data('w2field')
        $.extend(self, {
            onMessageReceive: function (sender, message) {
                var data;
                if (sender != null && sender.$el) {
                    data = popupMulticodeFieldOptions.getMessageData(message, false);
                }
                else {
                    data = popupMulticodeFieldOptions.getMessageData(message, true);
                }



                addData(data);
                $(self.el).val(null);
                $(self.el).change();
            }
        });

        var data = {
            param: {},
            name: $(self.el).attr('name'),
            id: $(self.el).attr('name'),
            $el: self.el,
            field: self,
            eventType: ''
        }

        var buttonRemove;
        if ($(self.el).parent().find('.buttonRemove').length) {
            buttonRemove = $(self.el).parent().find('.buttonRemove');
        }
        else {
            buttonRemove = $('<button>')
                .attr('style', 'font-size:small;')
                .addClass('input-icon buttonRemove pull-right')
                .append($('<span>').addClass('fa fa-times'));
            buttonRemove.appendTo($(self.el).parent());
        }
        var buttonSearch;
        if ($(self.el).parent().find('.buttonSearch').length) {
            buttonSearch = $(self.el).parent().find('.buttonSearch');
        }
        else {
            buttonSearch = $('<button>')
                .attr('style', 'font-size:small;')
                .addClass('input-icon buttonSearch')
                .append($('<span>').addClass('fa fa-search'));
            buttonSearch.insertAfter(this.el);
        }

        buttonSearch.click(function () {
            self.openedPageOptions = {};

            $.extend(data.param, popupMulticodeFieldOptions.getSearchParams(null));
            if (caller) {
                data.eventType = 'open';
                caller.onPopupHandler && caller.onPopupHandler(data);
            }
            caller.openPopup({
                name: self.type,
                //sửa lại đường dẫn popup
                url: popupMulticodeFieldOptions.pageListPopupUrl,
                width: data.width || (options.width || 600),
                height: data.height || (options.height || 'auto'),
                resizable: true

            }, data.param, self.openedPageOptions);
        });

        buttonRemove.click(function () {
            if (caller) {
                data.eventType = 'remove';
                caller.onPopupHandler && caller.onPopupHandler(data);
            }
            blockHolder.html('<li index=\"1\" style=\"max-width: 250px; \"><\/li>');
            self.fieldData = null;
        });
        $(self.el).on('keydown', function (e) {
            if (e.which == 13) {
                $.extend(data.param, popupMulticodeFieldOptions.getSearchParams($(self.el).val()));

                if (caller) {
                    data.eventType = 'open';
                    caller.onPopupHandler && caller.onPopupHandler(data);
                }

                //sửa lại đường dẫn execute search
                $.post(popupMulticodeFieldOptions.executeSearchUrl, data.param, function (result) {
                    var records = popupMulticodeFieldOptions.getMessageData(result, true);
                    if (records.length == 0) {
                        self.openedPageOptions = {};
                        var copyData = $.extend({}, data.param.CommandAction, popupMulticodeFieldOptions.getSearchParams(null).CommandAction);
                        caller.openPopup({
                            name: self.type,
                            //sửa lại đường dẫn mở popup
                            url: popupMulticodeFieldOptions.pageListPopupUrl,
                            width: data.width || (options.width || 600),
                            height: data.height || (options.height || 'auto'),
                            resizable: true

                        }, { CommandAction: copyData }, self.openedPageOptions);
                    }
                    else if (records.length == 1) {
                        self.onMessageReceive(null, result);
                        caller.onMessageReceive && caller.onMessageReceive(data, records);
                        return;
                    }
                    else {
                        self.openedPageOptions = {};
                        caller.openPopup({
                            name: self.type,
                            //sửa lại đường dẫn mở popup
                            url: popupMulticodeFieldOptions.pageListPopupUrl,
                            width: data.width || (options.width || 600),
                            height: data.height || (options.height || 'auto'),
                            resizable: true

                        }, data.param, self.openedPageOptions);
                    }

                });
            }
        })
    });
}


