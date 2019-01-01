$.widget('widget.chatConversation', $.widget.base, {
    options: {
        name: null,
        title: null,
        height: '250px',
        items: [],
        LogInUserId: null,
        submitCallback: function () { },
        scrollChatCallback: function () { },
        downloadFileCallback: function () { }
    },
    _create: function () {
        var self = this;
        self.element.addClass('col-md-12').css({ 'padding': '0px', 'overflow': 'hidden' });
        if (this.options.title) {
            self._createBoxContent();
            self._renderData(self.options.items);
            self._createInputMessage();        
            self._createButton(self.options.toolbar.items)
        }
        this._super();
        this._addPublicFunction();
        this._saveData(this.options);
    },
    _addPublicFunction: function () {
        var self = this;

        this.options.refreshData = function (items) {
            if (!items) {
                items = [];
            }
            self.options.items = items;
            if (!self.options.chatContainer) {
                self._create();
            }
            else {
                self.options.chatContainer.parent().remove();
                self.options.chatContainer.remove();
                self.element.find('.box-title > h3 > span').html(self.options.title);
                self._renderData(items);
            }
        };
        this.options.addData = function (items) {
            self.options.items = items;
            self._addData(items);
        };
    },
    _createButton: function (buttonItems) {
        var self = this;

        if (buttonItems) {
            $.each(buttonItems, function (key, button) {
                if (button.icon) {
                    var aTag = $('<a>').appendTo(self.boxTool)
                        .append('<i class="' + button.icon + '" alt>');
                    aTag.click(button.onClick.bind('click', self.options))
                }
            });
        }
    },
    _addData: function (items) {
        var self = this;

        $(self.options.chatContainer).slimScroll().off('slimscroll');
        if (items) {
            items.reverse();
            $.each(items, function (key, item) {
                if (self.options.items[key + 1])
                    var tmp = moment(self.options.items[key + 1].WriteDate).format('YYYY/MM/DD');
                var date = moment(item.WriteDate).format('YYYY/MM/DD');

                var li = $('<li>');
                self.options.chatContainer.prepend(li);
                if (tmp != date) {
                    var divStart = $('<div>').addClass('conversation-start');
                    self.options.chatContainer.prepend(divStart);
                    $('<span>').html(date).appendTo(divStart);
                }
                if (item.UserId == self.options.LogInUserId) {
                    li.addClass('right');
                    item.avatar = "/Content/flaty/img/demo/avatar/avatar1.jpg";
                }
                if (!item.avatar)
                    item.avatar = "/Content/flaty/img/demo/avatar/avatar2.jpg";
                $('<img src="' + item.avatar + '" alt>').appendTo(li);

                self.divBoxMes = $('<div>')
                    .css('border-radius', '1.3em')
                    .appendTo(li);
                self._createAroundChatContent(item);

                if (item.FilePhysicalName) {
                    self._renderChatContentFile(item, self.options.file.items);
                }
                else {
                    $('<p>').css('word-wrap', 'break-word')
                        .html(item.ChatContent)
                        .appendTo(self.divBoxMes);
                }
            });

            $(self.options.chatContainer).slimScroll({ scrollTo: '400px' });
            self.options.chatContainer.slimScroll().bind('slimscroll', function (e, location) {
                $.extend(e, {
                    location: location
                });
                self.options.scrollChatCallback(e);
            });
        }
    },
    _renderData: function (items) {
        var self = this;

        self.element.find('#chatText').focus();
        self.options.chatContainer = $('<ul>')
            .css({ 'height': self.options.height })
            .addClass('messages messages-chatty slimScroll')
            .appendTo(self.options.boxContent);

        if (items) {
            $.each(items, function (key, item) {
                if (self.options.items[key - 1])
                    var tmp = moment(self.options.items[key - 1].WriteDate).format('YYYY/MM/DD');
                var date = moment(item.WriteDate).format('YYYY/MM/DD');

                if (key == 0 || tmp != date) {
                    var divStart = $('<div>').addClass('conversation-start')
                        .appendTo(self.options.chatContainer);
                    $('<span>').html(date).appendTo(divStart);
                }

                var li = $('<li>').appendTo(self.options.chatContainer);
                if (item.UserId == self.options.LogInUserId) {
                    li.addClass('right');
                    item.avatar = "/Content/flaty/img/demo/avatar/avatar1.jpg";
                }

                if (!item.avatar)
                    item.avatar = "/Content/flaty/img/demo/avatar/avatar2.jpg";
                $('<img src="' + item.avatar + '" alt>').appendTo(li);

                self.divBoxMes = $('<div>')
                    .css('border-radius', '1.3em')
                    .appendTo(li);
                self._createAroundChatContent(item);
                       
                if (item.FilePhysicalName) {
                    self._renderChatContentFile(item, self.options.file.items);
                }
                else {
                    $('<p>').css('word-wrap', 'break-word')
                        .html(item.ChatContent)
                        .appendTo(self.divBoxMes);
                }
            });

            $(self.options.chatContainer).slimScroll({
                height: self.options.height,
                start: 'bottom',
                wheelStep: 10
            });
            self.options.chatContainer.slimScroll().bind('slimscroll', function (e, location) {
                $.extend(e, {
                    location: location
                });
                self.options.scrollChatCallback(e);
            });
        }
    },
    _createAroundChatContent: function (item) {
        var self = this;

        var divBoxTitle = $('<div>')
            .appendTo(self.divBoxMes);
        var h5 = $('<h5>').html(item.Username + ' ')
            .appendTo(divBoxTitle);

        if (item.roll)
            $('<span>').addClass('label label-info label-small')
                .html(item.roll)
                .appendTo(h5);

        var time = moment(item.WriteDate).format('LT');
        if (time && time != "Invalid time") {
            var span = $('<span>')
                .addClass('time').html(' ' + time)
                .appendTo(divBoxTitle);
            $('<i>').addClass('fa fa-clock-o')
            .prependTo(span);
        }
    },
    _renderChatContentFile: function (item, fileItems) {
        var self = this;

        var liFile = $('<li>').appendTo(self.divBoxMes);
        var spanFile = $('<span>').addClass('atch-option-iconic')
            .appendTo(liFile);
        $.each(fileItems, function (key, button) {
            if (button.icon) {
                var aTag = $('<a>').attr('href', '#')
                    .addClass('show-tooltip')
                    .appendTo(spanFile);
                $('<i>').addClass(button.icon).css('margin-right', '6px')
                    .appendTo(aTag);
                var spanContent = $('<span>').html(item.FileDescription)
                    .css('word-wrap', 'break-word')
                    .appendTo(aTag);

                aTag.click(function (e) {
                    $.extend(e, {
                        FilePhysicalName: item.FilePhysicalName
                    });
                    button.onClick(e);
                });
            }
        });     
    },
    _createBoxContent: function () {
        var self = this;
        self.options.box = $('<div>').addClass('box box-blue')
            .css({ 'margin-bottom': '0px' })
            .appendTo(self.element);

        var boxTitle = $('<div>').addClass('box-title')
            .appendTo(self.options.box);
        var title = $('<h3>').appendTo(boxTitle);
        $('<i>').addClass('fa fa-edit')
            .appendTo(title);
        $('<span>').html(self.options.title).appendTo(title);

        self.options.boxContent = $('<div>').addClass('box-content')
            .appendTo(self.options.box);
    },
    _createInputMessage: function() {
        var self = this;
        var messageDiv = $('<div>').addClass('messages-input-form')
                .appendTo(self.options.box);

        var input = $('<div>').addClass('input').appendTo(messageDiv);
        var text = $('<input type="text" name="text" id="chatText" placeholder="Write here...">')
            .addClass('form-control')
            .appendTo(input);
            
        text.keypress(function (e) {
            if (e.which == 13) {
                $.extend(e, {
                    chatText: text.val()
                });
                self.options.submitCallback(e);
                self.element.find('#chatText').val('');
                self.element.find('#chatText').focus();
            }
        });

        self.boxTool = $('<div>').addClass('buttons').appendTo(messageDiv);
        self.element.find('#chatText').focus();
    },
    _destroy: function () {
        this.element.html('');
    }

});