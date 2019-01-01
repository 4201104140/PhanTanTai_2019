$().w2field('addType', 'popupListCategory', function (options) {
    var self = this;
    $(this.el).css('width', '30%').attr('disabled', 'disabled');
    var input;
    if ($(self.el).parent().find('.inputSearch').length) {
        input = $(self.el).parent().find('.inputSearch');
        input.val('');
        input.off('keydown');
    }
    else {
        input = $('<input>').css({
            width: '65%',
            border: '0px'
        }).attr('placeholder', 'Tìm theo tên nhóm').addClass('inputSearch');
        $(this.el).parent().append(input);
    }
    if (options.data) {
        input.val(options.data.Name);
    }
    else {
        input.val('');
    }
    $(this.el).parent().append(input);
    //this sau khi extend sẽ được chứa trong $(this.el).data('w2field')
    $.extend(self, {
        onMessageReceive: function (sender, message) {
            $(self.el).val(message.CategoryId);
            $(self.el).change();
            $(input).val(message.Name)
            $(self.el).data('data', message);
            (sender && sender.close) && sender.close();
        }
    });

    var data = {
        param: {},
        name: $(self.el).attr('name'),
        type: self.type,
        id: $(self.el).attr('name'),
        $el: self.el,
        field: self,
        eventType: ''
    }
    var buttonSearch, buttonRemove;
    if ($(self.el).parent().find('.buttonSearch').length) {
        buttonSearch = $(self.el).parent().find('.buttonSearch');
    }
    else {
        buttonSearch = $('<button>')
        .attr('style', 'margin-left:auto !important; font-size:small;')
        .addClass('input-icon buttonSearch')
        .append($('<span>').addClass('fa fa-search'));
        buttonSearch.insertAfter(self.el);
    }
    if ($(self.el).parent().find('.buttonRemove').length) {
        buttonRemove = $(self.el).parent().find('.buttonRemove');
    }
    else {
        buttonRemove = $('<button>')
            .attr('style', 'font-size:small;')
            .addClass('input-icon buttonRemove')
            .append($('<span>').addClass('fa fa-times'));
        buttonRemove.appendTo($(self.el).parent());
    }

    buttonSearch.click(function () {
        if (options.caller) {
            data.eventType = 'open';
            options.caller.onPopupHandler && options.caller.onPopupHandler(data);
        }
        $.extend(data.param, {
            FieldName: $(self.el).attr('name'),
            SearchOnOpen: true,
            CommandAction: {
                Name: input.val(),
                Or: false,
                CurrentPage: 1
            }
        });
        $.post('/Documents/Category/Search', {
            CommandAction: data.param.CommandAction
        }, function (result) {
            var records = JSON.parse(result.Data);
            if (records.length == 0) {
                alert("không có loại hàng hóa cần tìm");
                return;
            }

            if (records.length == 1) {
                self.onMessageReceive(null, records[0]);
                return;
            }
            else {
                //data cua page sau khi da ve xong popup, dung de so sanh khi sendMessage field
                self.openedPageOptions = {};

                options.caller.openPopup({
                    name: 'ListCategory',
                    url: '/Documents/Category/ListCategory',
                    width: data.width || (options.width || 600),
                    height: data.height || (options.height || 'auto'),
                    resizable: true
                }, data.param, self.openedPageOptions);
            }
        });

    });
    buttonRemove.click(function () {
        self.set(null);
        input.val('');
        $(self.el).change();
        if (options.caller) {
            data.eventType = 'remove';
            options.caller.onPopupHandler && options.caller.onPopupHandler(data);
        }
        $(self.el).data('data', null);
    });
    input.on('keydown', function (e) {
        if (e.which == 13) {
            buttonSearch.click();
        }
    })
    buttonRemove.appendTo($(self.el).parent());
    buttonSearch.insertAfter(self.el);

});

$().w2field('addType', 'popupListCustomer', function (options) {
    var self = this;
    $(this.el).css('width', '30%').attr('disabled', 'disabled');
    var input;
    if ($(self.el).parent().find('.inputSearch').length) {
        input = $(self.el).parent().find('.inputSearch');
        input.val('');
        input.off('keydown');
    }
    else {
        input = $('<input>').css({
            width: '65%',
            border: '0px'
        }).attr('placeholder', 'Tìm theo tên khách hàng').addClass('inputSearch');
        $(this.el).parent().append(input);
    }
    if (options.data) {
        input.val(options.data.CustomerId);
    }
    else {
        input.val('');
    }
    //this sau khi extend sẽ được chứa trong $(this.el).data('w2field')
    $.extend(self, {
        onMessageReceive: function (sender, message) {
            if (sender.pageName == 'CustomerList') {
                $(self.el).val(message.CustomerId);
                $(self.el).change();
                $(input).val(message.Name)
                $(self.el).data('data', message);
                sender.close && sender.close();
            }
        }
    });

    var data = {
        param: {},
        name: $(self.el).attr('name'),
        pageName: 'CustomerList',
        id: $(self.el).attr('name'),
        $el: self.el,
        field: self,
        eventType: ''
    }

    var buttonSearch, buttonRemove;
    if ($(self.el).parent().find('.buttonSearch').length) {
        buttonSearch = $(self.el).parent().find('.buttonSearch');
    }
    else {
        buttonSearch = $('<button>')
        .attr('style', 'margin-left:auto !important; font-size:small;')
        .addClass('input-icon buttonSearch')
        .append($('<span>').addClass('fa fa-search'));
        buttonSearch.insertAfter(self.el);
    }
    if ($(self.el).parent().find('.buttonRemove').length) {
        buttonRemove = $(self.el).parent().find('.buttonRemove');
    }
    else {
        buttonRemove = $('<button>')
            .attr('style', 'font-size:small;')
            .addClass('input-icon buttonRemove')
            .append($('<span>').addClass('fa fa-times'));
        buttonRemove.appendTo($(self.el).parent());
    }

    buttonSearch.click(function () {
        if (options.caller) {
            data.eventType = 'open';
            options.caller.onPopupHandler && options.caller.onPopupHandler(data);
        }
        $.extend(data.param, {
            FieldName: $(self.el).attr('name'),
            SearchOnOpen: true,
            CommandAction: {
                Name: input.val(),
                CurrentPage: 1
            }
        });
        $.post('/RetailCustomer/Customer/CustomerExecuteSearch', data.param, function (result) {
            var records = result.Data.Data;
            if (records.length == 0) {
                alert("Customer Not found !");
                return;
            }
            if (records.length == 1) {
                self.onMessageReceive(data, records[0]);
                options.caller.onMessageReceive && options.caller.onMessageReceive(data, records[0]);
                return;
            }
            else {
                self.openedPageOptions = {};

                options.caller.openPopup({
                    name: self.type,
                    url: '/RetailCustomer/Customer/CustomerList',
                    width: data.width || (options.width || 600),
                    height: data.height || (options.height || 'auto'),
                    resizable: true

                }, data.param, self.openedPageOptions);
            }
        });

    });
    buttonRemove.click(function () {
        self.set(null);
        input.val('');
        $(self.el).change();
        if (options.caller) {
            data.eventType = 'remove';
            options.caller.onPopupHandler && options.caller.onPopupHandler(data);
        }
        $(self.el).data('data', null);
    });
    input.on('keydown', function (e) {
        if (e.which == 13) {
            buttonSearch.click();
        }
    })
    buttonRemove.appendTo($(self.el).parent());
    buttonSearch.insertAfter(self.el);
});

$().w2field('addType', 'popupSubjectList', function (options) {
    var self = this;
    $(this.el).css('width', '30%').attr('disabled', 'disabled');
    var input;
    if ($(self.el).parent().find('.inputSearch').length) {
        input = $(self.el).parent().find('.inputSearch');
        input.val('');
        input.off('keydown');
    }
    else {
        input = $('<input>').css({
            width: '65%',
            border: '0px'
        }).attr('placeholder', 'Tìm theo tên chủ đề').addClass('inputSearch');
        $(this.el).parent().append(input);
    }
    if (options.data) {
        input.val(options.data.SubjectName);
    }
    else {
        input.val('');
    }
    //this sau khi extend sẽ được chứa trong $(this.el).data('w2field')
    $.extend(self, {
        onMessageReceive: function (sender, message) {
            if (sender.pageName == 'SubjectList') {
                $(self.el).val(message.SubjectId);
                $(self.el).change();
                $(input).val(message.SubjectName)
                $(self.el).data('data', message);
                (sender && sender.close) && sender.close();
            }
        }
    });

    var data = {
        param: {},
        name: $(self.el).attr('name'),
        pageName: 'SubjectList',
        id: $(self.el).attr('name'),
        $el: self.el,
        field: self,
        eventType: ''
    }

    var buttonSearch, buttonRemove;
    if ($(self.el).parent().find('.buttonSearch').length) {
        buttonSearch = $(self.el).parent().find('.buttonSearch');
    }
    else {
        buttonSearch = $('<button>')
        .attr('style', 'margin-left:auto !important; font-size:small;')
        .addClass('input-icon buttonSearch')
        .append($('<span>').addClass('fa fa-search'));
        buttonSearch.insertAfter(self.el);
    }
    if ($(self.el).parent().find('.buttonRemove').length) {
        buttonRemove = $(self.el).parent().find('.buttonRemove');
    }
    else {
        buttonRemove = $('<button>')
            .attr('style', 'font-size:small;')
            .addClass('input-icon buttonRemove')
            .append($('<span>').addClass('fa fa-times'));
        buttonRemove.appendTo($(self.el).parent());
    }

    buttonSearch.click(function () {
        if (options.caller) {
            data.eventType = 'open';
            options.caller.onPopupHandler && options.caller.onPopupHandler(data);
        }
        $.extend(data.param, {
            CommandAction: {
                SubjectName: input.val(),
                CurrentPage: 1
            }
        });
        $.post('/UITestMgt/Subject/SubjectExecuteSearch', data.param, function (result) {
            var records = JSON.parse(result.Data.Data);
            if (records.length == 0) {
                alert("Subject Not found !");
                return;
            }
            if (records.length == 1) {
                self.onMessageReceive(data, records[0]);
                options.caller.onMessageReceive && options.caller.onMessageReceive(data, records[0]);
                return;
            }
            else {
                self.openedPageOptions = {};

                options.caller.openPopup({
                    name: self.type,
                    url: '/UITestMgt/Subject/SubjectList',
                    width: data.width || (options.width || 600),
                    height: data.height || (options.height || 'auto'),
                    resizable: true

                }, data.param, self.openedPageOptions);
            }
        });

    });
    buttonRemove.click(function () {
        self.set(null);
        input.val('');
        $(self.el).change();
        if (options.caller) {
            data.eventType = 'remove';
            options.caller.onPopupHandler && options.caller.onPopupHandler(data);
        }
        $(self.el).data('data', null);
    });
    input.on('keydown', function (e) {
        if (e.which == 13) {
            buttonSearch.click();
        }
    })
    buttonRemove.appendTo($(self.el).parent());
    buttonSearch.insertAfter(self.el);
});

$().w2field('addType', 'popupQuestionLevelList', function (options) {
    var self = this;
    $(this.el).css('width', '30%').attr('disabled', 'disabled');
    var input;
    if ($(self.el).parent().find('.inputSearch').length) {
        input = $(self.el).parent().find('.inputSearch');
        input.val('');
        input.off('keydown');
    }
    else {
        input = $('<input>').css({
            width: '65%',
            border: '0px'
        }).attr('placeholder', 'Tìm theo tên nhân viên').addClass('inputSearch');
        $(this.el).parent().append(input);
    }
    if (options.data) {
        input.val(options.data.QuestionLevelName);
    }
    else {
        input.val('');
    }
    //this sau khi extend sẽ được chứa trong $(this.el).data('w2field')
    $.extend(self, {
        onMessageReceive: function (sender, message) {
            if (sender.pageName == 'QuestionLevelList') {
                $(self.el).val(message.QuestionLevelId);
                $(self.el).change();
                $(input).val(message.QuestionLevelName)
                $(self.el).data('data', message);
                (sender && sender.close) && sender.close();
            }
        }
    });

    var data = {
        param: {},
        name: $(self.el).attr('name'),
        pageName: 'QuestionLevelList',
        id: $(self.el).attr('name'),
        $el: self.el,
        field: self,
        eventType: ''
    }

    var buttonSearch, buttonRemove;
    if ($(self.el).parent().find('.buttonSearch').length) {
        buttonSearch = $(self.el).parent().find('.buttonSearch');
    }
    else {
        buttonSearch = $('<button>')
        .attr('style', 'margin-left:auto !important; font-size:small;')
        .addClass('input-icon buttonSearch')
        .append($('<span>').addClass('fa fa-search'));
        buttonSearch.insertAfter(self.el);
    }
    if ($(self.el).parent().find('.buttonRemove').length) {
        buttonRemove = $(self.el).parent().find('.buttonRemove');
    }
    else {
        buttonRemove = $('<button>')
            .attr('style', 'font-size:small;')
            .addClass('input-icon buttonRemove')
            .append($('<span>').addClass('fa fa-times'));
        buttonRemove.appendTo($(self.el).parent());
    }

    buttonSearch.click(function () {
        if (options.caller) {
            data.eventType = 'open';
            options.caller.onPopupHandler && options.caller.onPopupHandler(data);
        }
        $.extend(data.param, {
            CommandAction: {
                QuestionLevelName: input.val(),
                CurrentPage: 1
            }
        });
        $.post('/UITestMgt/QuestionLevel/QuestionLevelExecuteSearch', data.param, function (result) {
            var records = JSON.parse(result.Data.Data);
            if (records.length == 0) {
                alert("QuestionLevel Not found !");
                return;
            }
            if (records.length == 1) {
                self.onMessageReceive(data, records[0]);
                options.caller.onMessageReceive && options.caller.onMessageReceive(data, records[0]);
                return;
            }
            else {
                self.openedPageOptions = {};

                options.caller.openPopup({
                    name: self.type,
                    url: '/UITestMgt/QuestionLevel/QuestionLevelList',
                    width: data.width || (options.width || 600),
                    height: data.height || (options.height || 'auto'),
                    resizable: true

                }, data.param, self.openedPageOptions);
            }
        });

    });
    buttonRemove.click(function () {
        self.set(null);
        input.val('');
        $(self.el).change();
        if (options.caller) {
            data.eventType = 'remove';
            options.caller.onPopupHandler && options.caller.onPopupHandler(data);
        }
        $(self.el).data('data', null);
    });
    input.on('keydown', function (e) {
        if (e.which == 13) {
            buttonSearch.click();
        }
    })
    buttonRemove.appendTo($(self.el).parent());
    buttonSearch.insertAfter(self.el);
});

$().w2field('addType', 'popupQuestionStatusList', function (options) {
    var self = this;
    $(this.el).css('width', '30%').attr('disabled', 'disabled');
    var input;
    if ($(self.el).parent().find('.inputSearch').length) {
        input = $(self.el).parent().find('.inputSearch');
        input.val('');
        input.off('keydown');
    }
    else {
        input = $('<input>').css({
            width: '65%',
            border: '0px'
        }).attr('placeholder', 'Tìm theo tên trạng thái').addClass('inputSearch');
        $(this.el).parent().append(input);
    }
    if (options.data) {
        input.val(options.data.QuestionStatusName);
    }
    else {
        input.val('');
    }
    //this sau khi extend sẽ được chứa trong $(this.el).data('w2field')
    $.extend(self, {
        onMessageReceive: function (sender, message) {
            if (sender.pageName == 'QuestionStatusList') {
                $(self.el).val(message.QuestionStatusId);
                $(self.el).change();
                $(input).val(message.QuestionStatusName)
                $(self.el).data('data', message);
                (sender && sender.close) && sender.close();
            }
        }
    });

    var data = {
        param: {},
        name: $(self.el).attr('name'),
        pageName: 'QuestionStatusList',
        id: $(self.el).attr('name'),
        $el: self.el,
        field: self,
        eventType: ''
    }

    var buttonSearch, buttonRemove;
    if ($(self.el).parent().find('.buttonSearch').length) {
        buttonSearch = $(self.el).parent().find('.buttonSearch');
    }
    else {
        buttonSearch = $('<button>')
        .attr('style', 'margin-left:auto !important; font-size:small;')
        .addClass('input-icon buttonSearch')
        .append($('<span>').addClass('fa fa-search'));
        buttonSearch.insertAfter(self.el);
    }
    if ($(self.el).parent().find('.buttonRemove').length) {
        buttonRemove = $(self.el).parent().find('.buttonRemove');
    }
    else {
        buttonRemove = $('<button>')
            .attr('style', 'font-size:small;')
            .addClass('input-icon buttonRemove')
            .append($('<span>').addClass('fa fa-times'));
        buttonRemove.appendTo($(self.el).parent());
    }

    buttonSearch.click(function () {
        if (options.caller) {
            data.eventType = 'open';
            options.caller.onPopupHandler && options.caller.onPopupHandler(data);
        }
        $.extend(data.param, {
            CommandAction: {
                QuestionStatusName: input.val(),
            }
        });
        $.post('/UITestMgt/QuestionStatus/QuestionStatusExecuteSearch', data.param, function (result) {
            var records = result.Data.Data;
            if (records.length == 0) {
                alert("QuestionStatus Not found !");
                return;
            }
            if (records.length == 1) {
                self.onMessageReceive(data, records[0]);
                options.caller.onMessageReceive && options.caller.onMessageReceive(data, records[0]);
                return;
            }
            else {
                self.openedPageOptions = {};

                options.caller.openPopup({
                    name: self.type,
                    url: '/UITestMgt/QuestionStatus/QuestionStatusList',
                    width: data.width || (options.width || 600),
                    height: data.height || (options.height || 'auto'),
                    resizable: true

                }, data.param, self.openedPageOptions);
            }
        });

    });
    buttonRemove.click(function () {
        self.set(null);
        input.val('');
        $(self.el).change();
        if (options.caller) {
            data.eventType = 'remove';
            options.caller.onPopupHandler && options.caller.onPopupHandler(data);
        }
        $(self.el).data('data', null);
    });
    input.on('keydown', function (e) {
        if (e.which == 13) {
            buttonSearch.click();
        }
    })
    buttonRemove.appendTo($(self.el).parent());
    buttonSearch.insertAfter(self.el);
});

$().w2field('addType', 'popupQuestionGroupList', function (options) {
    var self = this;
    $(this.el).css('width', '30%').attr('disabled', 'disabled');
    var input;
    if ($(self.el).parent().find('.inputSearch').length) {
        input = $(self.el).parent().find('.inputSearch');
        input.val('');
        input.off('keydown');
    }
    else {
        input = $('<input>').css({
            width: '65%',
            border: '0px'
        }).attr('placeholder', 'Tìm theo tên nhóm').addClass('inputSearch');
        $(this.el).parent().append(input);
    }
    if (options.data) {
        input.val(options.data.QuestionGroupName);
    }
    else {
        input.val('');
    }
    //this sau khi extend sẽ được chứa trong $(this.el).data('w2field')
    $.extend(self, {
        onMessageReceive: function (sender, message) {
            if (sender.pageName == 'QuestionGroupList') {
                $(self.el).val(message.QuestionGroupId);
                $(self.el).change();
                $(input).val(message.QuestionGroupName)
                $(self.el).data('data', message);
                (sender && sender.close) && sender.close();
            }
        }
    });

    var data = {
        param: {},
        name: $(self.el).attr('name'),
        pageName: 'QuestionGroupList',
        id: $(self.el).attr('name'),
        $el: self.el,
        field: self,
        eventType: ''
    }

    var buttonSearch, buttonRemove;
    if ($(self.el).parent().find('.buttonSearch').length) {
        buttonSearch = $(self.el).parent().find('.buttonSearch');
    }
    else {
        buttonSearch = $('<button>')
        .attr('style', 'margin-left:auto !important; font-size:small;')
        .addClass('input-icon buttonSearch')
        .append($('<span>').addClass('fa fa-search'));
        buttonSearch.insertAfter(self.el);
    }
    if ($(self.el).parent().find('.buttonRemove').length) {
        buttonRemove = $(self.el).parent().find('.buttonRemove');
    }
    else {
        buttonRemove = $('<button>')
            .attr('style', 'font-size:small;')
            .addClass('input-icon buttonRemove')
            .append($('<span>').addClass('fa fa-times'));
        buttonRemove.appendTo($(self.el).parent());
    }

    buttonSearch.click(function () {
        if (options.caller) {
            data.eventType = 'open';
            options.caller.onPopupHandler && options.caller.onPopupHandler(data);
        }
        $.extend(data.param, {
            CommandAction: {
                QuestionGroupName: input.val(),
            }
        });
        $.post('/UITestMgt/QuestionGroup/QuestionGroupExecuteSearch', data.param, function (result) {
            var records = result.Data.Data;
            if (records.length == 0) {
                alert("QuestionGroup Not found !");
                return;
            }
            if (records.length == 1) {
                self.onMessageReceive(data, records[0]);
                options.caller.onMessageReceive && options.caller.onMessageReceive(data, records[0]);
                return;
            }
            else {
                self.openedPageOptions = {};

                options.caller.openPopup({
                    name: self.type,
                    url: '/UITestMgt/QuestionGroup/QuestionGroupList',
                    width: data.width || (options.width || 600),
                    height: data.height || (options.height || 'auto'),
                    resizable: true

                }, data.param, self.openedPageOptions);
            }
        });

    });
    buttonRemove.click(function () {
        self.set(null);
        input.val('');
        $(self.el).change();
        if (options.caller) {
            data.eventType = 'remove';
            options.caller.onPopupHandler && options.caller.onPopupHandler(data);
        }
        $(self.el).data('data', null);
    });
    input.on('keydown', function (e) {
        if (e.which == 13) {
            buttonSearch.click();
        }
    })
    buttonRemove.appendTo($(self.el).parent());
    buttonSearch.insertAfter(self.el);
});

$().w2field('addType', 'popupFileGroupList', function (options) {
    var self = this;
    $(this.el).css('width', '30%').attr('disabled', 'disabled');
    var input;
    if ($(self.el).parent().find('.inputSearch').length) {
        input = $(self.el).parent().find('.inputSearch');
        input.val('');
        input.off('keydown');
    }
    else {
        input = $('<input>').css({
            width: '65%',
            border: '0px'
        }).attr('placeholder', 'Tìm theo tên nhóm').addClass('inputSearch');
        $(this.el).parent().append(input);
    }
    if (options.data) {
        input.val(options.data.FileGroupName);
    }
    else {
        input.val('');
    }
    //this sau khi extend sẽ được chứa trong $(this.el).data('w2field')
    $.extend(self, {
        onMessageReceive: function (sender, message) {
            if (sender.pageName == 'FileGroupList') {
                $(self.el).val(message.FileGroupId);
                $(self.el).change();
                $(input).val(message.FileGroupName)
                $(self.el).data('data', message);
                (sender && sender.close) && sender.close();
            }
        }
    });

    var data = {
        param: {},
        name: $(self.el).attr('name'),
        pageName: 'FileGroupList',
        id: $(self.el).attr('name'),
        $el: self.el,
        field: self,
        eventType: ''
    }

    var buttonSearch, buttonRemove;
    if ($(self.el).parent().find('.buttonSearch').length) {
        buttonSearch = $(self.el).parent().find('.buttonSearch');
    }
    else {
        buttonSearch = $('<button>')
        .attr('style', 'margin-left:auto !important; font-size:small;')
        .addClass('input-icon buttonSearch')
        .append($('<span>').addClass('fa fa-search'));
        buttonSearch.insertAfter(self.el);
    }
    if ($(self.el).parent().find('.buttonRemove').length) {
        buttonRemove = $(self.el).parent().find('.buttonRemove');
    }
    else {
        buttonRemove = $('<button>')
            .attr('style', 'font-size:small;')
            .addClass('input-icon buttonRemove')
            .append($('<span>').addClass('fa fa-times'));
        buttonRemove.appendTo($(self.el).parent());
    }

    buttonSearch.click(function () {
        if (options.caller) {
            data.eventType = 'open';
            options.caller.onPopupHandler && options.caller.onPopupHandler(data);
        }
        $.extend(data.param, {
            CommandAction: {
                FileGroupName: input.val(),
            }
        });
        $.post('/UIFileMgt/FileGroup/FileGroupExecuteSearch', data.param, function (result) {
            var records = result.Data.Data;
            if (records.length == 0) {
                alert("FileGroup Not found !");
                return;
            }
            if (records.length == 1) {
                self.onMessageReceive(data, records[0]);
                options.caller.onMessageReceive && options.caller.onMessageReceive(data, records[0]);
                return;
            }
            else {
                self.openedPageOptions = {};

                options.caller.openPopup({
                    name: self.type,
                    url: '/UIFileMgt/FileGroup/FileGroupList',
                    width: data.width || (options.width || 600),
                    height: data.height || (options.height || 'auto'),
                    resizable: true

                }, data.param, self.openedPageOptions);
            }
        });

    });
    buttonRemove.click(function () {
        self.set(null);
        input.val('');
        $(self.el).change();
        if (options.caller) {
            data.eventType = 'remove';
            options.caller.onPopupHandler && options.caller.onPopupHandler(data);
        }
        $(self.el).data('data', null);
    });
    input.on('keydown', function (e) {
        if (e.which == 13) {
            buttonSearch.click();
        }
    })
    buttonRemove.appendTo($(self.el).parent());
    buttonSearch.insertAfter(self.el);
});


//Area : RetailSecurity
//------------------------------------------------------------------------

//------------------------------------------------------------------------



//chuaw xong
//Area : RetailCustomer
//------------------------------------------------------------------------


///chua xong
//------------------------------------------------------------------------


//Area : UIDataSettingMgt
//------------------------------------------------------------------------



//------------------------------------------------------------------------


//Area : RetailShop
//------------------------------------------------------------------------


//------------------------------------------------------------------------


//Area : RetailProduct
//------------------------------------------------------------------------


//------------------------------------------------------------------------


//Area : UIDataSettingMgt
//------------------------------------------------------------------------


//------------------------------------------------------------------------
