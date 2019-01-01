var widget = window.widget || {};

define(function () {
    widget.setting = function () {
        var _setHeight = function (obj, height) {
            $.extend(obj, {
                height: height
            });
        };

        // style: {'width': '200px', 'padding-top': '3px'}
        var _css = function (obj, css) {
            $.extend(obj, {
                css: css
            });
        }

        /*
        attr(obj, 'class', 'btn btn-default')
        attr(obj, {
          'class': 'btn btn-default',
          'id': 'btn-search'
        });
        */
        var _attr = function (obj, name, val) {
            if (!obj.attr) {
                obj.attr = {};
            }
            if (!val) {
                $.extend(obj.attr, name);
            } else {
                $.extend(obj.attr, {
                    name: val
                });
            }
        };

        var _addEventListener = function (obj, event, listener) {
            if (!$.isPlainObject(obj.events)) {
                obj.events = {};
            }
            if (!obj.events[event]) {
                obj.events[event] = [];
            } else if ($.isFunction(obj.events[event])) {
                obj.events[event] = [obj.events[event]];
            } else if (!$.isArray(obj.events[event])) {
                obj.events[event] = [];
            }

            obj.events[event].push(listener);
        };

        var _addItem = function (obj, item) {
            if (!obj.items) {
                obj.items = [];
            }
            if (!$.isArray(item)) {
                item = [item];
            }
            Array.prototype.push.apply(obj.items, item);
        }

        var _addObjItem = function (obj, itemName, val) {
            if (!obj.hasOwnProperty(itemName) && itemName && val) {
                var temp = {};
                temp[itemName] = val;
                $.extend(obj, temp);
            }
        }

        return {
            lineChart: function (options) {
                var obj = {
                    dataTableOptions: {
                        rows: [],
                        columns: []
                    },
                    chartOptions: {},
                };
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "lineChart",
                    template: $("<div>")
                });
                return {
                    setTitle: function (title) {
                        $.extend(obj.chartOptions, {
                            title: title
                        });
                        return this;
                    },
                    setChartOptions: function (options) {
                        $.extend(obj.chartOptions, options);
                        return this;
                    },
                    setWidth: function (width) {
                        $.extend(obj.chartOptions, {
                            width: width
                        });
                        return this;
                    },
                    setHeight: function (height) {
                        $.extend(obj.chartOptions, {
                            height: height
                        });
                        return this;
                    },
                    setIs3DChart: function (is3D) {
                        $.extend(obj.chartOptions, {
                            is3D: is3D
                        });
                        return this;
                    },
                    setName: function (name) {
                        $.extend(obj, {
                            name: name
                        });
                        return this;
                    },
                    addColumns: function (columns) {
                        obj.dataTableOptions.columns.push.apply(obj.dataTableOptions.columns, columns);
                        return this;
                    },
                    addColumn: function (column) {
                        obj.dataTableOptions.columns.push(column);
                        return this;
                    },
                    addRows: function (rows) {
                        obj.dataTableOptions.rows.push.apply(obj.dataTableOptions.rows, rows);
                        return this;
                    },
                    addRow: function (row) {
                        obj.dataTableOptions.rows.push(row);
                        return this;
                    },
                    end: function () {
                        console.log(obj);
                        return obj;
                    }
                }
            },
            timelineChart: function (options) {
                var obj = {
                    dataTableOptions: {
                        rows: [],
                        columns: []
                    },
                    chartOptions: {},
                };
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "timelineChart",
                    template: $("<div>")
                });
                return {
                    setTitle: function (title) {
                        $.extend(obj.chartOptions, {
                            title: title
                        });
                        return this;
                    },
                    setWidth: function (width) {
                        $.extend(obj.chartOptions, {
                            width: width
                        });
                        return this;
                    },
                    setHeight: function (height) {
                        $.extend(obj.chartOptions, {
                            height: height
                        });
                        return this;
                    },
                    setIs3DChart: function (is3D) {
                        $.extend(obj.chartOptions, {
                            is3D: is3D
                        });
                        return this;
                    },
                    setName: function (name) {
                        $.extend(obj, {
                            name: name
                        });
                        return this;
                    },
                    addColumns: function (columns) {
                        obj.dataTableOptions.columns.push.apply(obj.dataTableOptions.columns, columns);
                        return this;
                    },
                    addColumn: function (column) {
                        obj.dataTableOptions.columns.push(column);
                        return this;
                    },
                    addRows: function (rows) {
                        obj.dataTableOptions.rows.push.apply(obj.dataTableOptions.rows, rows);
                        return this;
                    },
                    addRow: function (row) {
                        obj.dataTableOptions.rows.push(row);
                        return this;
                    },
                    end: function () {
                        console.log(obj);
                        return obj;
                    }
                }
            },
            ganttChart: function (options) {
                var obj = {
                    dataTableOptions: {
                        rows: [],
                        columns: []
                    },
                    chartOptions: {
                        gantt: {
                            trackHeight: 30
                        }
                    },
                };
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "ganttChart",
                    template: $("<div>")
                });
                return {
                    setTitle: function (title) {
                        $.extend(obj.chartOptions, {
                            title: title
                        });
                        return this;
                    },
                    setWidth: function (width) {
                        $.extend(obj.chartOptions, {
                            width: width
                        });
                        return this;
                    },
                    setHeight: function (height) {
                        $.extend(obj.chartOptions, {
                            height: height
                        });
                        return this;
                    },
                    setIs3DChart: function (is3D) {
                        $.extend(obj.chartOptions, {
                            is3D: is3D
                        });
                        return this;
                    },
                    setName: function (name) {
                        $.extend(obj, {
                            name: name
                        });
                        return this;
                    },
                    addColumns: function (columns) {
                        obj.dataTableOptions.columns.push.apply(obj.dataTableOptions.columns, columns);
                        return this;
                    },
                    addColumn: function (column) {
                        obj.dataTableOptions.columns.push(column);
                        return this;
                    },
                    addRows: function (rows) {
                        obj.dataTableOptions.rows.push.apply(obj.dataTableOptions.rows, rows);
                        return this;
                    },
                    addRow: function (row) {
                        obj.dataTableOptions.rows.push(row);
                        return this;
                    },
                    end: function () {
                        console.log(obj);
                        return obj;
                    }
                }
            },
            pieChart: function (options) {
                var obj = {
                    dataTableOptions: {
                        rows: [],
                        columns: []
                    },
                    chartOptions: {},
                };
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "pieChart",
                    template: $("<div>")
                });
                return {
                    setTitle: function (title) {
                        $.extend(obj.chartOptions, {
                            title: title
                        });
                        return this;
                    },
                    setWidth: function (width) {
                        $.extend(obj.chartOptions, {
                            width: width
                        });
                        return this;
                    },
                    setHeight: function (height) {
                        $.extend(obj.chartOptions, {
                            height: height
                        });
                        return this;
                    },
                    setIs3DChart: function (is3D) {
                        $.extend(obj.chartOptions, {
                            is3D: is3D
                        });
                        return this;
                    },
                    setName: function (name) {
                        $.extend(obj, {
                            name: name
                        });
                        return this;
                    },
                    addColumns: function (columns) {
                        obj.dataTableOptions.columns.push.apply(obj.dataTableOptions.columns, columns);
                        return this;
                    },
                    addColumn: function (column) {
                        obj.dataTableOptions.columns.push(column);
                        return this;
                    },
                    addRows: function (rows) {
                        obj.dataTableOptions.rows.push.apply(obj.dataTableOptions.rows, rows);
                        return this;
                    },
                    addRow: function (row) {
                        obj.dataTableOptions.rows.push(row);
                        return this;
                    },
                    end: function () {
                        console.log(obj);
                        return obj;
                    }
                }
            },
            columnChart: function (options) {
                var obj = {
                    dataTableOptions: {
                        rows: [],
                        columns: []
                    },
                    chartOptions: {},
                };
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "columnChart",
                    template: $("<div class='row'>")
                });
                return {
                    addClass: function (divClass) {
                        $.extend(obj, {
                            divClass: divClass
                        });
                        return this;
                    },
                    setTitle: function (title) {
                        $.extend(obj.chartOptions, {
                            title: title
                        });
                        return this;
                    },
                    setTitleName: function (name) {
                        $.extend(obj, {
                            titleName: name
                        });
                        return this;
                    },
                    setTitleIcon: function (icon) {
                        $.extend(obj, {
                            titleIcon: icon
                        });
                        return this;
                    },
                    setWidth: function (width) {
                        $.extend(obj.chartOptions, {
                            width: width
                        });
                        return this;
                    },
                    setHeight: function (height) {
                        $.extend(obj.chartOptions, {
                            height: height
                        });
                        return this;
                    },
                    setIs3DChart: function (is3D) {
                        $.extend(obj.chartOptions, {
                            is3D: is3D
                        });
                        return this;
                    },
                    setName: function (name) {
                        $.extend(obj, {
                            name: name
                        });
                        return this;
                    },
                    addColumns: function (columns) {
                        obj.dataTableOptions.columns.push.apply(obj.dataTableOptions.columns, columns);
                        return this;
                    },
                    addColumn: function (column) {
                        obj.dataTableOptions.columns.push(column);
                        return this;
                    },
                    addRows: function (rows) {
                        obj.dataTableOptions.rows.push.apply(obj.dataTableOptions.rows, rows);
                        return this;
                    },
                    addRow: function (row) {
                        obj.dataTableOptions.rows.push(row);
                        return this;
                    },
                    setChartOptions: function (options) {
                        $.extend(obj.chartOptions, options);
                        return this;
                    },
                    setArrayDataTable: function (arrayDataTable) {
                        obj.arrayDataTable = arrayDataTable;
                        return this;
                    },
                    end: function () {
                        console.log(obj);
                        return obj;
                    }
                }
            },
            MindMapTree: function (options) {
                var obj = {};
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "MindMapTree",
                    template: $("<div>")
                });
                return {
                    setName: function (name) {
                        $.extend(obj, { name: name });
                        return this;
                    },
                    setData: function (data) {
                        $.extend(obj, { data: data });
                        return this;
                    },
                    createEvent: function (event, callback) {
                        obj[event] = callback;
                        return this;
                    },
                    end: function () {
                        console.log(obj);
                        return obj;
                    }
                }
            },
            assignment: function (options) {
                var obj = {};
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "assignment",
                    template: $("<div>")
                });
                return {
                    setName: function (name) {
                        $.extend(obj, {
                            name: name
                        });
                        return this;
                    },
                    css: function (css) {
                        _css(obj, css);
                        return this;
                    },
                    setHeight: function (height) {
                        _setHeight(obj, height);
                        return this;
                    },
                    setData: function (data) {
                        _addItem(obj, data);
                        return this;
                    },
                    createEventClickItem: function (callback) {
                        $.extend(obj, {
                            clickItem: callback
                        });
                        return this;
                    },
                    createEvent: function (eventName, callback) {
                        obj[eventName] = callback;
                        return this;
                    },
                    end: function () {
                        console.log(obj);
                        return obj;
                    }
                }
            },
            calendar: function (options) {
                var obj = {};
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "calendar",
                    template: $("<div>")
                });
                return {
                    setName: function (name) {
                        $.extend(obj, {
                            name: name
                        });
                        return this;
                    },
                    css: function (css) {
                        _css(obj, css);
                        return this;
                    },
                    setHeight: function (height) {
                        _setHeight(obj, height);
                        return this;
                    },
                    setData: function (data) {
                        _addItem(obj, data);
                        return this;
                    },
                    setOwner: function (data) {
                        _addObjItem(obj, 'owner', data);
                        return this;
                    },
                    createEventClickItem: function (callback) {
                        $.extend(obj, {
                            clickItem: callback
                        });
                        return this;
                    },
                    createEvent: function (eventName, callback) {
                        obj[eventName] = callback;
                        return this;
                    },
                    end: function () {
                        return obj;
                    }
                }
            },
            viewExam: function (options) {
                var obj = {};
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "viewExam",
                    template: $("<div>")
                });
                return {
                    setName: function (name) {
                        $.extend(obj, {
                            name: name
                        });
                        return this;
                    },
                    css: function (css) {
                        _css(obj, css);
                        return this;
                    },
                    setHeight: function (height) {
                        _setHeight(obj, height);
                        return this;
                    },
                    setData: function (data) {
                        _addItem(obj, data);
                        return this;
                    },
                    createEvent: function (eventName, callback) {
                        obj[eventName] = callback;
                        return this;
                    },
                    setExamDetail: function (data) {
                        _addObjItem(obj, 'examDetail', data);
                        return this;
                    },
                    end: function () {
                        return obj;
                    }
                }
            },
            roomCalendar: function (options) {
                var obj = {};
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "roomCalendar",
                    template: $("<div>")
                });
                return {
                    setName: function (name) {
                        $.extend(obj, {
                            name: name
                        });
                        return this;
                    },
                    css: function (css) {
                        _css(obj, css);
                        return this;
                    },
                    setHeight: function (height) {
                        _setHeight(obj, height);
                        return this;
                    },
                    setData: function (data) {
                        _addItem(obj, data);
                        return this;
                    },
                    setOwner: function (data) {
                        _addObjItem(obj, 'owner', data);
                        return this;
                    },
                    setRooms: function (data) {
                        _addObjItem(obj, 'rooms', data);
                        return this;
                    },
                    createEventClickItem: function (callback) {
                        $.extend(obj, {
                            clickItem: callback
                        });
                        return this;
                    },
                    createEvent: function (eventName, callback) {
                        obj[eventName] = callback;
                        return this;
                    },
                    end: function () {
                        return obj;
                    }
                }
            },
            RoomOrderCalendar: function (options) {
                var obj = {};
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "RoomOrderCalendar",
                    template: $("<div>")
                });
                return {
                    setName: function (name) {
                        $.extend(obj, {
                            name: name
                        });
                        return this;
                    },
                    css: function (css) {
                        _css(obj, css);
                        return this;
                    },
                    setHeight: function (height) {
                        _setHeight(obj, height);
                        return this;
                    },
                    setData: function (data) {
                        _addItem(obj, data);
                        return this;
                    },
                    setOwner: function (data) {
                        _addObjItem(obj, 'owner', data);
                        return this;
                    },
                    setRooms: function (data) {
                        _addObjItem(obj, 'rooms', data);
                        return this;
                    },
                    createEventClickItem: function (callback) {
                        $.extend(obj, {
                            clickItem: callback
                        });
                        return this;
                    },
                    createEvent: function (eventName, callback) {
                        obj[eventName] = callback;
                        return this;
                    },
                    end: function () {
                        return obj;
                    }
                }
            },
            chatUserList: function (options) {
                var obj = {};
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "chatUserList",
                    template: $("<div>")
                });
                return {
                    setName: function (name) {
                        $.extend(obj, {
                            name: name
                        });
                        return this;
                    },
                    css: function (css) {
                        _css(obj, css);
                        return this;
                    },
                    setHeight: function (height) {
                        _setHeight(obj, height);
                        return this;
                    },
                    setData: function (data) {
                        _addItem(obj, data);
                        return this;
                    },
                    createEventClickUser: function (callback) {
                        $.extend(obj, {
                            clickUser: callback
                        });
                        return this;
                    },
                    createEvent: function (eventName, callback) {
                        obj[eventName] = callback;
                        return this;
                    },
                    end: function () {
                        return obj;
                    }
                }
            },
            userCurrent: function (options) {
                var obj = {};
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "userCurrent",
                    template: $("<div>")
                });
                return {
                    setName: function (name) {
                        $.extend(obj, {
                            name: name
                        });
                        return this;
                    },
                    setTitle: function (title) {
                        $.extend(obj, {
                            title: title
                        });
                        return this;
                    },
                    setIcon: function (icon) {
                        $.extend(obj, {
                            icon: icon
                        });
                        return this;
                    },
                    setHeightImage: function (height) {
                        _setHeight(obj, height);
                        return this;
                    },
                    css: function (css) {
                        _css(obj, css);
                        return this;
                    },
                    setHeight: function (height) {
                        _setHeight(obj, height);
                        return this;
                    },
                    addButton: function (id, caption, btnClass, callback) {
                        var button = {
                            id: id,
                            caption: caption,
                            btnClass: btnClass,
                            onClick: function (e) {
                                callback(e);
                            },
                        };
                        if (!obj.buttons)
                            obj.buttons = [];
                        obj.buttons.push(button);
                        return this;
                    },
                    addButtonTitle: function (id, caption, btnClass, icon, callback) {
                        var button = {
                            id: id,
                            caption: caption,
                            btnClass: btnClass,
                            icon: icon,
                            onClick: function (e) {
                                callback(e);
                            },
                        };
                        if (!obj.buttonTitle)
                            obj.buttonTitle = [];
                        obj.buttonTitle.push(button);
                        return this;
                    },
                    setData: function (data) {
                        _addItem(obj, data);
                        return this;
                    },
                    addFields: function (field) {
                        if (!obj.fields) {
                            obj.fields = [];
                        }
                        if (!$.isArray(field)) {
                            field = [field];
                        }
                        Array.prototype.push.apply(obj.fields, field);
                        return this;
                    },
                    createEvent: function (event, callback) {
                        obj[event] = callback;
                        return this;
                    },
                    end: function () {
                        return obj;
                    }
                }
            },
            chatConversation: function (options) {
                var obj = {};
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "chatConversation",
                    template: $("<div>")
                });
                return {
                    setName: function (name) {
                        $.extend(obj, {
                            name: name
                        });
                        return this;
                    },
                    setTitle: function (title) {
                        $.extend(obj, {
                            title: title
                        });
                        return this;
                    },
                    css: function (css) {
                        _css(obj, css);
                        return this;
                    },
                    setHeight: function (height) {
                        _setHeight(obj, height);
                        return this;
                    },
                    setLogInUserId: function (LogInUserId) {
                        $.extend(obj, {
                            LogInUserId: LogInUserId
                        });
                        return this;
                    },
                    setData: function (data) {
                        _addItem(obj, data);
                        return this;
                    },
                    addButton: function (id, text, icon, callback, addBreakBefore) {
                        if (!obj.toolbar) {
                            obj.toolbar = {};
                            obj.toolbar.items = [];
                        }
                        obj.toolbar.items.push({
                            type: 'button',
                            id: id,
                            caption: text,
                            icon: 'fa ' + icon || '',
                            onClick: function () {
                                callback();
                            }
                        });
                        return this;
                    },
                    addButtonFile: function (icon, callback, addBreakBefore) {
                        if (!obj.file) {
                            obj.file = {};
                            obj.file.items = [];
                        }
                        obj.file.items.push({
                            icon: 'fa ' + icon || '',
                            onClick: callback
                        });
                        return this;
                    },
                    createEvent: function (event, callback) {
                        obj[event] = callback;
                        return this;
                    },
                    createEventSubmit: function (callback) {
                        $.extend(obj, {
                            submitCallback: callback
                        });
                        return this;
                    },
                    createEventScrollChat: function (callback) {
                        $.extend(obj, {
                            scrollChatCallback: callback
                        });
                        return this;
                    },
                    end: function () {
                        return obj;
                    }
                }
            },
            plupload: function (options) {
                var obj = {};
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "pluploadCustom",
                    template: $("<div>")
                });
                return {
                    setAttr: function (name, value) {
                        //name is object
                        if (!value) {
                            $.extend(obj, name);
                        } else {
                            $.extend(obj, {
                                name: value
                            });
                        }
                        return this;
                    },
                    setName: function (name) {
                        $.extend(obj, {
                            name: name
                        });
                        return this;
                    },
                    setUrl: function (url) {
                        $.extend(obj, {
                            url: url
                        });
                        return this;
                    },
                    setMaxFileSize: function (max) {
                        $.extend(obj, {
                            max_file_size: max
                        });
                        return this;
                    },
                    addFilters: function (title, extensions) {
                        if (!obj.filters)
                            obj.filters = [];
                        if (!$.isArray(title)) {
                            obj.filters.push({
                                title: title,
                                extensions: extensions
                            });
                        } else {
                            $.each(title, function (key, value) {
                                obj.filters.push({
                                    title: title.title,
                                    extensions: title.extensions
                                });
                            });
                        }
                        return this;
                    },
                    createEvent: function (eventName, callback) {
                        obj[eventName] = callback;
                        return this;
                    },
                    end: function () {
                        return obj;
                    }
                }
            },
            checkboxTable: function (options) {
                var obj = {};
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "checkboxTable",
                    template: $("<div>")
                });
                return {
                    setName: function (name) {
                        $.extend(obj, {
                            name: name
                        });
                        return this;
                    },
                    setWidth: function (width) {
                        $.extend(obj, {
                            width: width
                        });
                        return this;
                    },
                    setHeight: function (height) {
                        $.extend(obj, {
                            height: height
                        });
                        return this;
                    },
                    addClass: function (divClass) {
                        $.extend(obj, {
                            divClass: divClass
                        });
                        return this;
                    },
                    attr: function (name, value) {
                        _attr(obj, name, value);
                        return this;
                    },
                    end: function () {
                        return obj;
                    }
                }
            },
            boxcontent: function (options) {
                var obj = {};
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "boxcontent",
                    template: $("<div>")
                });
                return {
                    setColor: function (color) {
                        $.extend(obj, {
                            color: color
                        });
                        return this;
                    },
                    setTitleName: function (titleName) {
                        $.extend(obj, {
                            titleName: titleName
                        });
                        return this;
                    },
                    setContentName: function (contentName) {
                        $.extend(obj, {
                            contentName: contentName
                        });
                        return this;
                    },
                    addButton: function (button) {
                        if (!obj.buttons)
                            obj.buttons = [];
                        obj.buttons.push(button);
                        return this;
                    },
                    addButtonTitle: function (button) {
                        if (!obj.buttonsTitle)
                            obj.buttonsTitle = [];
                        obj.buttonsTitle.push(button);
                        return this;
                    },
                    setBoxCss: function (cssObj) {
                        $.extend(obj, {
                            boxCss: cssObj
                        });
                        return this;
                    },
                    setData: function (data) {
                        $.extend(obj, {
                            data: data
                        });
                        return this;
                    },
                    setName: function (name) {
                        $.extend(obj, {
                            name: name
                        });
                        return this;
                    },
                    setIcon: function (icon) {
                        $.extend(obj, {
                            icon: icon
                        });
                        return this;
                    },
                    setIsMainContent: function (bool) {
                        $.extend(obj, {
                            isMainContent: bool || true
                        });
                        return this;
                    },
                    end: function () {
                        return obj;
                    }
                }
            },
            roomMap: function (options) {
                var obj = {};
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "roomMap",
                    template: $("<div>")
                });
                return {
                    createEvent: function (event, callback) {
                        obj[event] = callback;
                        return this;
                    },
                    contextMenu: function (item, callback) {
                        $.extend(obj, {
                            contextMenu: {
                                items: item,
                                callback: callback
                            }
                        });
                        return this;
                    },
                    setColor: function (color) {
                        $.extend(obj, {
                            color: color
                        });
                        return this;
                    },
                    setTitleName: function (titleName) {
                        $.extend(obj, {
                            titleName: titleName
                        });
                        return this;
                    },
                    setContentName: function (contentName) {
                        $.extend(obj, {
                            contentName: contentName
                        });
                        return this;
                    },
                    addButton: function (button) {
                        if (!obj.buttons)
                            obj.buttons = [];
                        obj.buttons.push(button);
                        return this;
                    },
                    setBoxCss: function (cssObj) {
                        $.extend(obj, {
                            boxCss: cssObj
                        });
                        return this;
                    },
                    setData: function (data) {
                        $.extend(obj, {
                            data: data
                        });
                        return this;
                    },
                    setName: function (name) {
                        $.extend(obj, {
                            name: name
                        });
                        return this;
                    },
                    setIcon: function (icon) {
                        $.extend(obj, {
                            icon: icon
                        });
                        return this;
                    },
                    setIsMainContent: function (bool) {
                        $.extend(obj, {
                            isMainContent: bool || true
                        });
                        return this;
                    },
                    end: function () {
                        return obj;
                    }
                }
            },
            tableHTML: function (options) {
                var obj = {};
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "tableHTML",
                    template: $("<div>")
                });
                return {
                    createEvent: function (event, callback) {
                        obj[event] = callback;
                        return this;
                    },
                    setColor: function (color) {
                        $.extend(obj, {
                            color: color
                        });
                        return this;
                    },
                    setTitleName: function (titleName) {
                        $.extend(obj, {
                            titleName: titleName
                        });
                        return this;
                    },
                    setColumns: function (col) {
                        $.extend(obj, {
                            columns: col
                        });
                        return this;
                    },
                    setColumnGroups: function (columnGroups) {
                        $.extend(obj, {
                            columnGroups: columnGroups
                        });
                        return this;
                    },
                    setData: function (data) {
                        $.extend(obj, {
                            data: data
                        });
                        return this;
                    },
                    setName: function (name) {
                        $.extend(obj, {
                            name: name
                        });
                        return this;
                    },
                    end: function () {
                        return obj;
                    }
                }
            },
            Merchant: function (options) {
                var obj = {};
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "Merchant",
                    template: $("<div>")
                });
                return {
                    setData: function (data) {
                        $.extend(obj, {
                            data: data
                        });
                        return this;
                    },
                    setName: function (name) {
                        $.extend(obj, {
                            name: name
                        });
                        return this;
                    },
                    end: function () {
                        return obj;
                    }
                }
            },
            printRoomOrder: function (options) {
                var obj = {};
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "printRoomOrder",
                    template: $("<div>")
                });
                return {
                    createEvent: function (event, callback) {
                        obj[event] = callback;
                        return this;
                    },

                    setTitleName: function (titleName) {
                        $.extend(obj, {
                            titleName: titleName
                        });
                        return this;
                    },
                    setData: function (data) {
                        $.extend(obj, {
                            data: data
                        });
                        return this;
                    },
                    setName: function (name) {
                        $.extend(obj, {
                            name: name
                        });
                        return this;
                    },
                    end: function () {
                        return obj;
                    }
                }
            },
            formWizard: function (options) {
                var obj = {};
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "formWizard",
                    template: $("<div>")
                });
                return {
                    createEvent: function (event, callback) {
                        obj[event] = callback;
                        return this;
                    },
                    setData: function (data) {
                        $.extend(obj, {
                            data: data
                        });
                        return this;
                    },
                    setName: function (name) {
                        $.extend(obj, {
                            name: name
                        });
                        return this;
                    },
                    end: function () {
                        return obj;
                    }
                }
            },
            barcode: function (options) {
                var obj = {};
                $.extend(obj, options || {});
                $.extend(obj, { _type: "barcode", template: $("<div>") });
                return {
                    setColor: function (color) {
                        $.extend(obj, { color: color });
                        return this;
                    },
                    setTitleName: function (titleName) {
                        $.extend(obj, { titleName: titleName });
                        return this;
                    },
                    setContentName: function (contentName) {
                        $.extend(obj, { contentName: contentName });
                        return this;
                    },
                    addButton: function (button) {
                        if (!obj.buttons)
                            obj.buttons = [];
                        obj.buttons.push(button);
                        return this;
                    },
                    setBoxCss: function (cssObj) {
                        $.extend(obj, { boxCss: cssObj });
                        return this;
                    },
                    setData: function (data) {
                        $.extend(obj, { data: data });
                        return this;
                    },
                    setName: function (name) {
                        $.extend(obj, { name: name });
                        return this;
                    },
                    setIcon: function (icon) {
                        $.extend(obj, { icon: icon });
                        return this;
                    },
                    setIsMainContent: function (bool) {
                        $.extend(obj, { isMainContent: bool || true });
                        return this;
                    },
                    end: function () {
                        return obj;
                    }
                }
            },
            FileThumbnail: function (options) {
                var obj = {};
                $.extend(obj, options || {});
                $.extend(obj, { _type: "FileThumbnail", template: $("<div>") });
                return {
                    setTitleName: function (titleName) {
                        $.extend(obj, { Name: titleName });
                        return this;
                    },
                    end: function () {
                        return obj;
                    }
                }
            },
            tabs: function (options) {
                var obj = {};
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "tabs",
                    template: $("<div>")
                });
                return {
                    setAttr: function (name, value) {
                        if (!value) {
                            $.extend(obj, name);
                        } else {
                            $.extend(obj[name], value);
                        }
                        return this;
                    },
                    createEvent: function (eventName, handler) {
                        obj[eventName] = handler;
                        return this;
                    },
                    setTabs: function (tabs) {
                        if (!obj.tabs)
                            obj.tabs = [];
                        if ($.isArray(tabs))
                            $.each(tabs, function (key, value) {
                                obj.tabs.push(value);
                            });
                        else
                            obj.tabs.push(tabs);
                        return this;
                    },
                    setActiveTab: function (tabid) {
                        $.extend(obj, {
                            active: tabid
                        });
                        return this;
                    },
                    setName: function (name) {
                        $.extend(obj, {
                            name: name
                        });
                        return this;
                    },
                    end: function () {
                        return obj;
                    }
                }
            },
            uploader: function (options) {
                var obj = {};
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "uploader",
                    template: $("<div>")
                });
                return {
                    onImageClick: function (handler) {
                        $.extend(obj, {
                            onImageClick: function (data) {
                                handler(data);
                            }
                        });
                    },
                    setAttr: function (name, value) {
                        if (!value) {
                            $.extend(obj, name);
                        } else {
                            $.extend(obj, {
                                name: value
                            });
                        }
                        return this;
                    },
                    setName: function (name) {
                        $.extend(obj, {
                            name: name
                        });
                        return this;
                    },
                    setUrl: function (url) {
                        $.extend(obj, {
                            url: url
                        });
                        return this;
                    },
                    setMaxFileSize: function (max) {
                        $.extend(obj, {
                            max_file_size: max
                        });
                        return this;
                    },
                    addFilters: function (title, extensions) {
                        if (!obj.filters)
                            obj.filters = [];
                        if (!$.isArray(title)) {
                            obj.filters.push({
                                title: title,
                                extensions: extensions
                            });
                        } else {
                            $.each(title, function (key, value) {
                                obj.filters.push({
                                    title: title.title,
                                    extensions: title.extensions
                                });
                            });
                        }
                        return this;
                    },
                    onFileUploaded: function (handler) {
                        $.extend(obj, {
                            init: {
                                FileUploaded: function (uploader, file, info) {
                                    handler(uploader, file, info);
                                }
                            }
                        });
                        return this;
                    },
                    onUploadComplete: function (handler) {
                        $.extend(obj, {
                            init: {
                                UploadComplete: function (uploader, files) {
                                    handler(uploader, files);
                                }
                            }
                        });
                        return this;
                    },
                    end: function () {
                        return obj;
                    }
                }
            },
            gallery: function (options) {
                var obj = {};
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "gallery",
                    template: $("<div>")
                });
                return {
                    setName: function (name) {
                        $.extend(obj, {
                            name: name
                        });
                        return this;
                    },
                    addImages: function (imgUrl, thumbUrl) {
                        if (!obj.images)
                            obj.images = [];
                        if ($.isArray(imgUrl))
                            $.each(imgUrl, function (key, value) {
                                obj.images.push(value);
                            });
                        else
                            obj.images.push({
                                ImageUrl: imgUrl,
                                ThumbnailUrl: thumbUrl
                            });

                        return this;
                    },
                    addButton: function (icon, onclick) {
                        if (!obj.buttons)
                            obj.buttons = [];
                        var button = {
                            icon: icon,
                            onclick: function (url, thumbUrl, container) {
                                onclick(url, thumbUrl, container);
                            }
                        };
                        obj.buttons.push(button);
                        return this;
                    },
                    addImage: function (imageUrl, thumbnailUrl) {
                        if (!obj.images)
                            obj.images = [];
                        var image = {
                            ImageUrl: imageUrl,
                            ThumbnailUrl: thumbnailUrl
                        };
                        obj.images.push(image);
                        return this;
                    },
                    end: function () {
                        return obj;
                    }
                };
            },
            texteditor: function (options) {
                var obj = {};
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "texteditor",
                    template: $("<div>")
                });
                return {
                    setName: function (name) {
                        $.extend(obj, {
                            'name': name
                        });
                        return this;
                    },
                    setData: function (data) {
                        $.extend(obj, {
                            'data': data
                        });
                        return this;
                    },
                    setWidth: function (width) {
                        $.extend(obj, {
                            width: width
                        });
                        return this;
                    },
                    setHeight: function (height) {
                        $.extend(obj, {
                            height: height
                        });
                        return this;
                    },
                    addButton: function (id, text, onclick, icon) {
                        var button = {
                            id: id,
                            text: text,
                            onclick: function () {
                                onclick();
                            },
                            icon: icon
                        };
                        if (!obj.buttons)
                            obj.buttons = [];
                        obj.buttons.push(button);
                        return this;
                    },
                    end: function () {
                        return obj;
                    }
                };
            },
            button: function (options) {
                var obj = {
                    template: $('<button>')
                };
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "w2"
                });

                return {
                    css: function (css) {
                        _css(obj, css);

                        return this;
                    },
                    attr: function (name, val) {
                        _attr(obj, name, val);

                        return this;
                    },
                    addClass: function (divClass) {
                        $.extend(obj, {
                            divClass: divClass
                        });
                        return this;
                    },
                    setName: function (name) {
                        $.extend(obj, {
                            id: name,
                            name: name
                        });

                        return this;
                    },
                    setIcon: function (icon) {
                        $.extend(obj, {
                            icon: icon
                        });

                        return this;
                    },
                    setCaption: function () {
                        $.extend(obj, {
                            caption: caption,
                            text: caption
                        });

                        return this;
                    },
                    addEventListener: function (obj, event, handler) {
                        _addEventListener(event, handler);
                        return this;
                    },
                    end: function () {
                        return obj;
                    }
                }
            },
            control: function (options) {
                var obj = {};
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "w2"
                });

                return {
                    define: function (type, id, caption, icon) {
                        $.extend(obj, {
                            _type: '_' + type,
                            type: type,
                            id: id,
                            caption: caption,
                            icon: icon
                        });
                        return this;
                    },
                    setChecked: function (isChecked) {
                        $.extend(obj, {
                            checked: isChecked
                        });
                        return this;
                    },
                    setCount: function (val) {
                        $.extend(obj, {
                            count: val
                        });
                        return this;
                    },
                    setHtml: function (htmlString) {
                        $.extend(obj, {
                            html: htmlString
                        });
                        return this;
                    },
                    setGroup: function (val) {
                        $.extend(obj, {
                            group: val
                        });
                        return this;
                    },
                    setDisabled: function (isDisabled) {
                        $.extend(obj, {
                            disabled: isDisabled
                        });
                        return this;
                    },
                    setValue: function (val) {
                        $.extend(obj, {
                            value: val
                        });
                        return this;
                    },
                    addItem: function (item) {
                        _addItem(obj, item);
                        return this;
                    },
                    end: function () {
                        return obj;
                    }
                };
            },
            title: function (options) {
                var obj = {};
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "titleToolbar",
                    template: $("<div>"),
                    leftItem: [],
                    rightItem: []
                });
                return {
                    setName: function (name) {
                        $.extend(obj, {
                            'name': name
                        });
                        return this;
                    },
                    setTitle: function (text) {
                        obj.titleText = text;
                        return this;
                    },
                    setIcon: function (icon) {
                        obj.titleIcon = icon;
                        return this;
                    },
                    addLeft: function (item) {
                        obj.leftItem.push(item);
                        return this;
                    },
                    addRight: function (item) {
                        obj.rightItem.push(item);
                        return this;
                    },
                    setColor: function (color) {
                        $.extend(obj, {
                            boxClass: 'box-' + color
                        });
                        return this;
                    },
                    setTextColor: function (color) {
                        $.extend(obj, {
                            textColor: color
                        });
                        return this;
                    },
                    setIsCenterText: function (isCenterText) {
                        $.extend(obj, {
                            centerTitle: isCenterText
                        });
                        return this;
                    },
                    end: function () {
                        return obj;
                    }
                };
            },
            grid: function (options) {
                var obj = {};
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "grid",
                    template: $('<div style=" border-radius: 0">'),
                    fixedBody: false,
                });
                obj.fixedBody = true;
                obj.template.height(framework.common.getHeight() - 220);
                var createToolbar = function () {
                    if (!obj.show) {
                        obj.show = {};
                        $.extend(obj.show, {
                            toolbar: true
                        });
                    } else
                        if (!obj.show.toolbar)
                            $.extend(obj.show, {
                                toolbar: true
                            });

                    if (!obj.toolbar) {
                        obj.toolbar = {};
                        obj.toolbar.items = [];
                    }
                }
                return {
                    setHeight: function (height) {
                        obj.fixedBody = true;
                        obj.template.height(height);
                        return this;
                    },
                    setIdColumn: function (colName) {
                        $.extend(obj, {
                            recid: colName
                        });
                        return this;
                    },
                    setReorderColumns: function (value) {
                        $.extend(obj, {
                            reorderColumns: value
                        });
                        return this;
                    },
                    setReorderRow: function (value) {
                        $.extend(obj, {
                            reorderRows: value
                        });
                        return this;
                    },
                    setProperty: function (prop) {
                        $.extend(obj, prop);
                        return this;
                    },
                    show: function () {
                        if (!obj.show)
                            obj.show = {};
                        $.each(arguments, function (key, value) {
                            obj.show[value] = true;
                        });
                        return this;
                    },
                    hide: function () {
                        if (!obj.show)
                            obj.show = {};
                        $.each(arguments, function (key, value) {
                            obj.show[value] = false;
                        });
                        return this;
                    },
                    setPaginateOptions: function (options) {
                        if (!obj.show) {
                            obj.show = {};
                            $.extend(obj.show, {
                                toolbar: true
                            });
                        }
                        if (!obj.toolbar) {
                            obj.toolbar = {};
                            obj.toolbar.items = [];
                        }
                        $.extend(obj, {
                            paginateOptions: options
                        });
                        return this;
                    },
                    setName: function (name) {
                        $.extend(obj, {
                            'name': name
                        });
                        return this;
                    },
                    addColumn: function (col) {
                        if (!obj.columns)
                            obj.columns = [];
                        if (!$.isArray(col)) {
                            col = [col];
                        }
                        obj.columns.push(...col);
                        return this;
                    },
                    addColumns: function (cols) {
                        if (!obj.columns)
                            obj.columns = [];
                        $.extend(obj.columns, cols);
                        return this;
                    },
                    addColumnGroups: function (cols) {
                        if (!obj.columnGroups)
                            obj.columnGroups = [];
                        $.extend(obj.columnGroups, cols);
                        return this;
                    },
                    addToolbarBreak: function () {
                        createToolbar();

                        obj.toolbar.items.push({
                            type: 'break',
                        });
                        return this;
                    },
                    addButton: function (id, text, icon, callback, isDisable) {
                        createToolbar();
                        obj.toolbar.items.push({
                            type: 'button',
                            id: id,
                            caption: text,
                            icon: 'fa ' + icon || '',
                            disabled: isDisable || false,
                            onClick: function () {
                                callback();
                            }
                        });
                        return this;
                    },
                    addRecords: function (records) {
                        if (!obj.data)
                            obj.data = [];
                        $.extend(obj.data, records);
                        return this;
                    },
                    addRecord: function (record) {
                        if (!obj.data)
                            obj.data = [];
                        obj.data.push(record);
                        return this;
                    },
                    createEvent: function (event, callback) {
                        obj[event] = callback;
                        return this;
                    },
                    setRowExpandHandler: function (handler) {
                        $.extend(obj, {
                            onExpand: handler
                        });
                        return this;
                    },
                    addMenus: function (MenuItem, callback) {
                        $.extend(obj, {
                            MenuItem: {
                                items: MenuItem,
                                callback: callback
                            }
                        });
                        return this;
                    },
                    createMenuEvent: function (event, callback) {
                        if (!obj.menuEvent)
                            obj.menuEvent = {};
                        obj.menuEvent[event] = callback;
                        return this;
                    },
                    end: function () {
                        return obj;
                    }
                }
            },
            panel: function (options) {
                var obj = {};
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "panel",
                    template: $("<div>")
                });
                return {
                    getTemplateEl: function () {
                        return obj.template;
                    },
                    css: function (css) {
                        _css(obj, css);
                        return this;
                    },
                    setHtml: function (html) {
                        obj.template.html(html);
                        return this;
                    },
                    setTemplate: function (template) {
                        $.extend(obj, {
                            template: template
                        });
                    },
                    setId: function (id) {
                        $.extend(obj, {
                            id: id
                        });
                    },
                    setName: function (name) {
                        $.extend(obj, {
                            name: name
                        });
                        return this;
                    },
                    setWidth: function (width) {
                        $.extend(obj, {
                            width: width
                        });
                        return this;
                    },
                    setHeight: function (height) {
                        $.extend(obj, {
                            height: height
                        });
                        return this;
                    },
                    addClass: function (divClass) {
                        $.extend(obj, {
                            divClass: divClass
                        });
                        return this;
                    },
                    attr: function (name, value) {
                        _attr(obj, name, value);
                        return this;
                    },
                    addItem: function (item, divClass) {
                        if (divClass) {
                            $.extend(item, {
                                divClass: divClass
                            });
                        }
                        _addItem(obj, item);
                        return this;
                    },
                    addEventListener: function (event, handler) {
                        _addEventListener(_end, event, handler);
                        return this;
                    },
                    end: function () {
                        return obj;
                    }
                }
            },
            togglePanel: function (options) {
                var togglePanel = this.panel(options);
                togglePanel.css({
                    'position': 'absolute',
                    'z-index': 3
                }).addClass('collapse');
                return togglePanel;
            },
            searchForm: function (options) {
                var _form = widget.setting.form();

                var _end = _form.end();

                $.extend(_form, {
                    setWidth: function (width) {
                        _end.width = width;
                        return this;
                    },
                    end: function () {
                        _end.template.css({
                            width: _end.width,
                            position: 'absolute',
                            zIndex: 3,
                            right: 0,
                            marginTop: 0
                        });

                        return _end;
                    }
                });

                return _form;
            },
            form: function (options) {
                var obj = {};
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "form",
                    template: $('<div style="border-radius: 0">')
                });
                return {
                    setLabelWidth: function (width) {
                        $.extend(obj, {
                            labelWidth: width
                        });
                        return this;
                    },
                    setFocus: function (index) {
                        $.extend(obj, {
                            focus: index
                        });
                        return this;
                    },
                    setName: function (name) {
                        $.extend(obj, {
                            'name': name
                        });
                        return this;
                    },
                    setFieldPerRow: function (count) {
                        $.extend(obj, {
                            fieldPerRow: count
                        });
                        return this;
                    },
                    setHeight: function (height) {
                        $.extend(obj, {
                            'height': height
                        });
                        return this;
                    },
                    setWidth: function (width) {
                        obj.template.css({
                            width: width
                        });
                        return this;
                    },
                    setHeaderTitle: function (title) {
                        $.extend(obj, {
                            'header': title
                        });
                        return this;
                    },
                    addField: function (field) {
                        if (!obj.fields)
                            obj.fields = [];
                        if (!$.isArray(field)) {
                            field = [field];
                        }
                        obj.fields.push(...field);
                        return this;
                    },
                    addFields: function (fields) {
                        if (!obj.fields)
                            obj.fields = [];
                        $.extend(obj.fields, fields);
                        return this;
                    },
                    addButton: function (text, callback) {
                        var e = {};
                        e[text] = function () {
                            callback();
                        };
                        if (!obj.actions)
                            obj.actions = {};
                        $.extend(obj.actions, e);
                        return this;
                    },
                    setRecord: function (record) {
                        $.extend(obj, {
                            record: record
                        });
                        return this;
                    },
                    setTabs: function (tabs) {
                        $.extend(obj, {
                            tabs: tabs
                        });
                        return this;
                    },
                    createEvent: function (event, callback) {
                        obj[event] = function (e) {
                            callback(e);
                        };
                        return this;
                    },
                    end: function () {
                        return obj;
                    }
                };
            },
            pagination: function (options) {
                var obj = {};

                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "pagination",
                    template: $('<div>')
                });

                return {
                    setName: function (name) {
                        $.extend(obj, {
                            name: name
                        });
                        return this;
                    },
                    setTotalPages: function (val) {
                        $.extend(obj, {
                            totalPages: val
                        });
                        return this;
                    },
                    setStartPage: function (val) {
                        $.extend(obj, {
                            startPage: val
                        });
                        return this;
                    },
                    setVisiblePages: function (val) {
                        $.extend(obj, {
                            visiblePages: val
                        });
                        return this;
                    },
                    setFirstText: function (val) {
                        $.extend(obj, {
                            first: val
                        });
                        return this;
                    },
                    setPrevText: function (val) {
                        $.extend(obj, {
                            prev: val
                        });
                        return this;
                    },
                    setNextText: function (val) {
                        $.extend(obj, {
                            next: val
                        });
                        return this;
                    },
                    setLastText: function (val) {
                        $.extend(obj, {
                            last: val
                        });
                        return this;
                    },
                    setClass: function (val) {
                        $.extend(obj, {
                            paginationClass: val
                        });
                        return this;
                    },
                    setPageClickHandler: function (val) {
                        $.extend(obj, {
                            onPageClick: val
                        });
                        return this;
                    },
                    end: function () {
                        return obj;
                    }
                };
            },
            panelChart: function (options) {
                var obj = {};
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "panelChart",
                    template: $("<div class='box box-inverse'>")
                });
                return {
                    setName: function (name) {
                        $.extend(obj, {
                            name: name
                        });
                        return this;
                    },
                    setTitle: function (title) {
                        $.extend(obj, {
                            title: title
                        });
                        return this;
                    },
                    setIcon: function (icon) {
                        $.extend(obj, {
                            icon: icon
                        });
                        return this;
                    },
                    css: function (css) {
                        _css(obj, css);
                        return this;
                    },
                    setHeight: function (height) {
                        _setHeight(obj, height);
                        return this;
                    },
                    setContent: function (content) {
                        _addItem(obj, content);
                        return this;
                    },
                    createEvent: function (event, callback) {
                        obj[event] = callback;
                        return this;
                    },
                    end: function () {
                        return obj;
                    }
                }
            },
            panelTitle: function (options) {
                var _title = widget.setting.header();
                var _content = widget.setting.panel();
                var _end = _content.end();

                _content.css({
                    margin: '16px'
                });

                $.extend(_content, {
                    title: function () {
                        return _title.title();
                    },
                    setTitle: function (title) {
                        _title.setTitle(title);
                        return this;
                    },
                    setIcon: function (icon) {
                        _title.setIcon(icon);
                        return this;
                    },
                    setColor: function (color) {
                        _title.setColor(color);
                        return this;
                    },
                    setContent: function (item) {
                        _content.addItem(item);
                        return this;
                    },
                    setContentName: function (name) {
                        _content.setName(name);
                        return this;
                    },
                    setTextColor: function (textColor) {
                        _title.setTextColor(textColor);
                        return this;
                    },
                    setIsCenterText: function (isCenterText) {
                        _title.setIsCenterText(isCenterText);
                        return this;
                    },
                    end: function () {
                        return _end;
                    }
                });

                _content.addItem(_title);
                _title.setColor('black')
                    .setTextColor('white');
                return _content;
            },
            AmChartColumn: function (options) {
                var obj = {
                    chartOptions: {
                        dataProvider: []
                    }
                };
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "AmChartColumn",
                    template: $("<div>")
                });
                return {
                    setName: function (name) {
                        $.extend(obj, {
                            name: name
                        });
                        return this;
                    },
                    end: function () {
                        return obj;
                    },
                    addClass: function (divClass) {
                        $.extend(obj, {
                            divClass: divClass
                        });
                        return this;
                    },
                    setTitle: function (title) {
                        $.extend(obj.chartOptions, {
                            title: title
                        });
                        return this;
                    },
                    setTitleName: function (name) {
                        $.extend(obj, {
                            titleName: name
                        });
                        return this;
                    },
                    setTitleIcon: function (icon) {
                        $.extend(obj, {
                            titleIcon: icon
                        });
                        return this;
                    },
                    setChartOptions: function (options) {
                        $.extend(obj.chartOptions, options);
                        return this;
                    },
                    setDataProvider: function (dataProvider) {
                        //obj.chartOptions.dataProvider.push(dataProvider);
                        $.extend(obj.chartOptions, {
                            'dataProvider': dataProvider
                        });
                        return this;
                    },
                    setHeight: function (height) {
                        $.extend(obj, {
                            Height: height
                        });
                        return this;
                    }
                };
            },
            AmChartLine: function (options) {
                var obj = {};
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "AmChartLine",
                    template: $("<div>")
                });
                return {
                    setName: function (name) {
                        $.extend(obj, {
                            name: name
                        });
                        return this;
                    },
                    end: function () {
                        return obj;
                    },
                    setData: function(data){
                        $.extend(obj, {
                            data: data
                        });
                        return this;
                    },
                    setHeight: function (height) {
                        $.extend(obj, {
                            Height: height
                        });
                        return this;
                    }
                };
            },
            ChartGeneral: function (options) {
                var obj = {
                    chartOptions: {
                        dataProvider: []
                    }
                };
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "ChartGeneral",
                    template: $("<div>")
                });
                return {
                    setName: function (name) {
                        $.extend(obj, {
                            name: name
                        });
                        return this;
                    },
                    end: function () {
                        return obj;
                    },
                    addClass: function (divClass) {
                        $.extend(obj, {
                            divClass: divClass
                        });
                        return this;
                    },
                    setTitle: function (title) {
                        $.extend(obj.chartOptions, {
                            title: title
                        });
                        return this;
                    },
                    setTitleName: function (name) {
                        $.extend(obj, {
                            titleName: name
                        });
                        return this;
                    },
                    setTitleIcon: function (icon) {
                        $.extend(obj, {
                            titleIcon: icon
                        });
                        return this;
                    },
                    setChartOptions: function (options) {
                        $.extend(obj.chartOptions, options);
                        return this;
                    },
                    setDataProvider: function (dataProvider) {
                        //obj.chartOptions.dataProvider.push(dataProvider);
                        $.extend(obj.chartOptions, {
                            'dataProvider': dataProvider
                        });
                        return this;
                    },
                    setHeight: function (height) {
                        $.extend(obj, {
                            Height: height
                        });
                        return this;
                    }
                };
            },
            reportGrid: function (options) {
                var grid = widget.setting.grid();
                var AmChart = widget.setting.AmChartColumn();
                var _contentLeft = widget.setting.panel();
                var _contentRight = widget.setting.panel();
                var _content = widget.setting.panel();
                var _end = _content.end();
                _contentLeft.addClass("col-md-4");
                _contentLeft.css({
                    margin: '16px'
                });
                _contentRight.addClass("col-md-8");
                _contentRight.css({
                    margin: '16px'
                });

                $.extend(_content, {
                    setNameAmchart: function (name) {
                        AmChart.setName(name);
                        return this;
                    },
                    addColumns: function (col) {
                        grid.addColumns(col);
                        return this;
                    },
                    addRecords: function (record) {
                        grid.addRecords(record);
                        return this;
                    },
                    setIdColumn: function (id) {
                        grid.setIdColumn(id);
                        return this;
                    },
                    setContent: function (item) {
                        _content.addItem(item);
                        return this;
                    },
                    setContentName: function (name) {
                        _content.setName(name);
                        return this;
                    },
                    end: function () {
                        return _end;
                    }
                });
                $.extend(_contentRight, {
                    setContent: function (item) {
                        _content.addItem(item);
                        return this;
                    },
                    setContentName: function (name) {
                        _content.setName(name);
                        return this;
                    },
                    end: function () {
                        return _end;
                    }
                });

                $.extend(_contentLeft, {
                    setColumn: function (col) {
                        grid.addColumns(col);
                        return this;
                    },
                    setRecord: function (record) {
                        grid.addRecords(record);
                        return this;
                    },
                    setIdColumn: function (id) {
                        grid.setIdColumn(id);
                        return this;
                    },
                    setContent: function (item) {
                        _content.addItem(item);
                        return this;
                    },
                    setContentName: function (name) {
                        _content.setName(name);
                        return this;
                    },
                    end: function () {
                        return _end;
                    }
                });

                //_contentLeft.addItem(grid);
                _contentRight.addItem(AmChart);
                _content.addItem(_contentRight);
                //_content.addItem(_contentRight.end());
                //_content.addItem(AmChart);

                return _content;
            },
            header: function (options) {
                var _header = widget.setting.panel();
                var _title = widget.setting.title();
                var _content = widget.setting.panel();
                var _end = _header.end();

                _header.setName('header');
                _content.setWidth('auto');
                _content.addClass('collapse').css({
                    right: '0px',
                    position: 'absolute',
                    zIndex: 3,
                });

                $.extend(_header, {
                    title: function () {
                        return _title;
                    },
                    content: function () {
                        return _content;
                    },
                    setTitle: function (title) {
                        _title.setTitle(title);
                        return this;
                    },
                    setIcon: function (icon) {
                        _title.setIcon(icon);
                        return this;
                    },
                    setColor: function (icon) {
                        _title.setColor(icon);
                        return this;
                    },
                    setTextColor: function (textColor) {
                        _title.setTextColor(textColor);
                        return this;
                    },
                    setIsCenterText: function (isCenterText) {
                        _title.setIsCenterText(isCenterText);
                        return this;
                    },
                    end: function () {
                        //_content.css({ 'display': 'none' });
                        _end.items[0] = _end.items[0].end();
                        _end.items[1] = _end.items[1].end();
                        return _end;
                    }
                });

                _header.addItem(_title);
                _header.addItem(_content);
                delete _header.addItem;
                _header.css({
                    padding: '0px'
                });
                return _header;
            },
            content: function (options) {
                var _panel = widget.setting.panel();
                _panel.setName('content');
                return _panel;
            },
            footer: function (options) {
                var _panel = widget.setting.panel();
                _panel.setName('footer');
                return _panel;
            },
            toolbar: function (options) {
                var obj = {};
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "w2toolbar",
                    template: $('<div style="padding: 4px; border: 1px solid silver">')
                });

                return {
                    createEvent: function (event, callback) {
                        obj[event] = function (e) {
                            callback(e);
                        };
                        return this;
                    },
                    setName: function (val, callback) {
                        $.extend(obj, {
                            name: val
                        });
                        return this;
                    },
                    addItem: function (item) {
                        _addItem(obj, item);
                        return this;
                    },
                    addShowItemPerPage: function (items, callback) {
                        var itemPerPage = [];
                        items.forEach(function (value) {
                            itemPerPage.push({
                                'id': value,
                                'text': value
                            });
                        });

                        var objControl = {
                            type: 'menu-radio',
                            id: 'itemPerPage',
                            text: function (selectedItem) {
                                var text = selectedItem.selected;
                                var el = this.get('itemPerPage:' + selectedItem.selected);
                                return 'Xem ' + el.text + ' dòng';
                            },
                            selected: itemPerPage[0].id,
                            items: itemPerPage
                        };

                        _addItem(obj, objControl);
                        $.extend(obj, {
                            onClick: function (event) {
                                if (event.subItem == null) return;
                                event.done(function () {
                                    callback(event);
                                });
                            }
                        });
                        return this;
                    },
                    addEventListener: function (event, handler) {
                        _addEventListener(_end, event, handler);
                        return this;
                    },
                    addDropdownButton: function (label, items, callback) {
                        var dropdownOption = [];
                        items.forEach(function (item) {
                            dropdownOption.push({
                                'id': item.id,
                                'text': item.text
                            });
                        });

                        var control = {
                            type: 'menu-radio',
                            id: 'dropdownOption',
                            text: function (selectedItem) {
                                var text = selectedItem.selected;
                                var el = this.get('dropdownOption:' + selectedItem.selected);
                                return label;
                            },
                            selected: dropdownOption[0].id,
                            items: dropdownOption
                        }

                        _addItem(obj, control);
                        $.extend(obj, {
                            onClick: function (event) {
                                if (event.subItem == null) return;
                                event.done(function () {
                                    callback(event);
                                });
                            }
                        });

                        return this;
                    },
                    end: function () {
                        return obj;
                    }
                }
            },
            panelBox: function (options) {
                var obj = {};
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: "panelBox",
                    template: $("<div>")
                });
                return {
                    setDescriptionName: function (descriptionName) {
                        $.extend(obj, {
                            descriptionName: descriptionName
                        });
                        return this;
                    },
                    setContentName: function (contentName) {
                        $.extend(obj, {
                            contentName: contentName
                        });
                        return this;
                    },
                    setData: function (data) {
                        $.extend(obj, {
                            data: data
                        });
                        return this;
                    },
                    setName: function (name) {
                        $.extend(obj, {
                            name: name
                        });
                        return this;
                    },
                    end: function () {
                        return obj;
                    }
                }
            },
            googlePicker: function (options) {
                var obj = {};
                $.extend(obj, options || {});
                $.extend(obj, {
                    _type: 'googlePicker',
                    template: $("<div>")
                });
                return {
                    setName: function (name) {
                        $.extend(obj, {
                            name: name
                        });
                        return this;
                    },
                    setTitle: function (title) {
                        $.extend(obj, {
                            title: title
                        });
                        return this;
                    },
                    css: function (css) {
                        _css(obj, css);
                        return this;
                    },
                    setHeight: function (height) {
                        _setHeight(obj, height);
                        return this;
                    },
                    createEventSelect: function (callback) {
                        //$.extend(obj, { pickerCallback: function (e) { callback(e); } });
                        $.extend(obj, {
                            pickerCallback: callback
                        });
                        return this;
                    },
                    end: function () {
                        return obj;
                    }
                }
            },
        }
    }();

    return widget;
});