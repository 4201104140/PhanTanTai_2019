var framework = window.framework || {}; 
framework.global = (function (scope) {
    var __mainfest = {};
    __mainfest.widgets = {};
    __mainfest.purePageOptions = {}
    return {

        onRegisterPage: null,
        uuid: function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },
        makeId: function (id) {
            return id + '_' + this.uuid();
        },
        registerPurePageOptions: function (pageName, options) {
            __mainfest.purePageOptions[pageName] = options;
        },
        getPurePageOptions: function (pageName) {
            return __mainfest.purePageOptions[pageName];
        },
        registerPage: function (pageId, instance) {
            __mainfest[pageId] = instance;
        },
        getRootPageId: function () {
            return __mainfest['rootPageId'];
        },
        registerRootPage: function (pageId, instance) {
            if (__mainfest['rootPageId'])
                throw 'Error ! root page id is exist';
            __mainfest['rootPageId'] = pageId;
            this.registerPage(pageId, instance);
        },
        registerElementByPageId: function (pageId, elementName, data) {
            __mainfest[pageId] && (__mainfest[pageId].dataOut.elements[pageId + '_' + elementName] = data);
        },
        unregisterElementByPageId: function (pageId, elementName) {
            __mainfest[pageId] && (__mainfest[pageId].dataOut.elements[pageId + '_' + elementName] = undefined);
        },
        findElementByPageId: function (pageId, elementName, findAll) {

            var pageOptions = this.findPage(pageId);
            if (pageOptions == null) {
                return null;
            }
            var result = [];
            (function find(elements, name) {
                if (elements[name]) {
                    result.push(elements[name]);
                }
                else {
                    $.each(elements, function (key, value) {
                        if (value && value.elements) {
                            return find(value.elements, name);
                        }
                    });
                }
            })(pageOptions.dataOut.elements, pageOptions.dataOut._pageId + '_' + elementName);
            if (result.length != 0) {
                if (findAll)
                    return result;
                else
                    return result[0];
            }
            else
                return null;
        },
        findPage: function (pageId) {
            //$.each(__mainfest, function (index, value) {
            //    if (index.indexOf(pageId) > -1)
            //        return value;
            //});
            //return {};
            return __mainfest[pageId] || null;
        },
        /**
         * Register a widget object
         * @param {object} widget Widget object
         */
        registerWidget: function (name, widget) {
            __mainfest.widgets[name] = widget;
        },
        /**
         * Unregister a widget object
         * @param {object} widget Widget object
         */
        unregisterWidget: function (name) {
            __mainfest.widgets[name] = undefined;
        },
        /**
         * Get a specific registered widget object
         * @param {string} name Name of widget
         * @return The registered widget object
         */
        findWidget: function (name) {
            return __mainfest.widgets[name];
        },
        unicodeToLowerText: function (str) {
            str = str.toLowerCase();
            str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
            str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
            str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
            str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
            str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
            str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
            str = str.replace(/đ/g, "d");
            str = str.replace(/!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'| |\"|\&|\#|\[|\]|~/g, "");
            str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1-
            str = str.replace(/^\-+|\-+$/g, "");//cắt bỏ ký tự - ở đầu và cuối chuỗi
            return str;
        },
        /**
         * Binding multiple events into one element
         * @param {jQuery Object} el Element to bind events
         * @param {object} actions Object contains events
         */
        bindEvents: function (el, actions) {
            var keys = Object.keys(actions);

            for (var i = 0, key; key = keys[i]; i++) {
                var handlers = actions[key];
                if (!$.isArray(handlers)) {
                    handlers = [handlers];
                }
                for (var j = 0, handler; handler = handlers[j]; j++) {
                    if ($.isFunction(handler)) {
                        el.on(key, handler);
                    }
                }
            }
        },
        // Maybe be necessary
        //unbindEvents: function (el, actions) {
        //
        //}
    };
})(window);