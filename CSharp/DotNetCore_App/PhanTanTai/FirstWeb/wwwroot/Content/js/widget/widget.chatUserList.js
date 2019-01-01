$.widget('widget.chatUserList', $.widget.base, {
    options: {
        name: null,
        height: '0px',
        items: [],     
        clickUser: function () { },
    },
    _create: function () {
        var self = this;
        self.element.addClass('leftChat').css({ 'height': self.options.height });

        var topChat = $('<div>')
            .addClass('topChat')
            .appendTo(self.element);
        $('<input type="text" />').appendTo(topChat);
        $('<a href="#">').addClass('search').appendTo(topChat);

        self.options.userContainer = $('<ul>')
            .addClass('people')
            .appendTo(self.element);

        if (self.options.items)
            self._renderData(self.options.items);
        // renderData trước rồi slimScroll

        this._super();
        this._addPublicFunction();
        this._saveData(this.options);
    },
    _addPublicFunction: function () {
        var self = this;
        this.options.refreshData = function (items, activeUser) {
            self._destroy();
            self.options.items = items;
            self.options.activeUser = activeUser;
            self._create();
        };
    },
    _renderData: function (items) {
        var self = this;
        
        if (items) {
            $.each(items, function (key, item) {
                var liBoxUser = $('<li>').addClass('person')
                    .appendTo(self.options.userContainer);

                liBoxUser.click(function (e) {
                    $('.leftChat .person').removeClass('active');
                    liBoxUser.addClass('active');
                    self.options.clickUser(e, { value: item, key: key });
                }.bind(self));

                if (self.options.activeUser) {
                    if (self.options.activeUser.UserId == item.UserId && self.options.activeUser.ToGroupId == item.ToGroupId)
                        liBoxUser.addClass('active');
                }

                if (!item.avatar && item.UserId)
                    item.avatar = "/Content/flaty/img/demo/avatar/avatar2.jpg";
                else if (!item.avatar && item.ToGroupId)
                    item.avatar = "/Content/flaty/img/demo/avatar/usergroup1.png";
                $('<img src="' + item.avatar + '" alt>').appendTo(liBoxUser);

                var spanName = $('<span>').addClass('name').html(item.Username);
                $('<div>').css({ 'width': '53%', 'display': 'inline-block' })
                    .appendTo(liBoxUser)
                    .append(spanName);

                var date = moment(item.WriteDate).format('YYYY/MM/DD');
                if (date && date != "Invalid date") {
                    var spanTime = $('<span>').addClass('time').html(date)
                        .appendTo(liBoxUser);
                }

                var lastMes = item.ChatContent;
                if (item.FilePhysicalName) {
                    lastMes = item.FileDescription;
                }
                var spanMessage = $('<span>').addClass('preview').html(lastMes)
                        .appendTo(liBoxUser);
                $('<div>').css({ 'width': '62%', 'display': 'inline-block' })
                    .appendTo(liBoxUser)
                    .append(spanMessage);
                $('<i>').addClass('fa fa-cog')
                    .css({
                        'font-size': '18px', 'position': 'absolute', 'margin-left': '5%',
                        'opacity': '0', 'border-color': '#c5c5c5', 'color': '#c5c5c5'
                        })
                    .appendTo(liBoxUser);
            });

            var heightScoll = $('.leftChat').height() - 63; // height ban đầu trừ cái search
            $(self.options.userContainer).slimScroll({
                height: heightScoll
            });
        }
    },
    _destroy: function () {
        this.element.html('');
    }

});