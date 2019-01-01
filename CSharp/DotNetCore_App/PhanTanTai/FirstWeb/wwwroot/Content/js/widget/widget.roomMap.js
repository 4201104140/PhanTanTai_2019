$.widget('widget.roomMap', $.widget.base, {
    options: {
        name: 'RoomMap',
        data: [],
        contentName: 'content',
        titleName: 'title',
        divClass: 'col-md-12',
        contentCss: {
            'display': 'block',
            'background-color': '#FFF'
        },
        icon: null,
        color: '#5ab4da',
        buttons: [], //mang de chua cac button
        boxCss: {
            'padding-left': '5px',
            'padding-right': '5px',
            'padding-top': '5px'
        },
        imgCss: {
            'width': '100%',
            'height': '100%'
        },
        panelCss: {
            'width': '100%',
            'padding-bottom': '100%',
            'position': 'relative',
            'border-radius': '4px'
        },
        homeCss: {
            'width': '70%',
            'position': 'absolute',
            'height': '75%'
        },
        keyCss: {
            'position': 'absolute',
            'width': '30%',
            'height': '30%',
            'right': '0px'
        },
        warningCss: {
            'position': 'absolute',
            'width': '30%',
            'height': '30%',
            'right': '0px',
            'margin-top': '33.33%'
        },
        broomCss: {
            'position': 'absolute',
            'width': '30%',
            'height': '33%',
            'bottom': '0px',
            'right': '0px'
        },
        roomCss: {
            'position': 'absolute',
            'width': '70%',
            'height': '20%',
            'bottom': '0px',
            'display': 'flex'
        },
        textRoom: {
            'font-size': '10px',
            'border-radius': '3px',
            'background-color': 'white',
            'color': 'black',
            'display': 'inline - flex'
        },
        btnCss: {
            'padding': '0px',
            'background-color': 'white',
            'width': '100%'
        },
        isMainContent: true, // if true => add mainContentCss
        mainContentCss: {
            'height': 'auto'
        }
    },
    _create: function () {
        var self = this;

        this.options.data.RoomMapList = this.options.data.RoomMapList || [];

        $.each(this.options.data.RoomMapList, function (k, v) {
            self._createFloor(v);
        });
        this.options.data.RoomMapList.forEach(function (value) {
            value.Room.forEach(function (v) {
                $.contextMenu({
                    selector: '#RoomId_' + v.RoomId,
                    callback: function (key, options) {
                        self.options.contextMenu.callback(key, options.$trigger.context.attributes, options);
                    },
                    items: self.options.contextMenu.items && self.options.contextMenu.items(v) || []
                });
                //$.contextMenu({
                //    selector: "#" + el[0].id,
                //    callback: function (key, options) {
                //        self.options.MenuItem.callback(key, grid.get(grid.getSelection()[0]));
                //        // key là id của item trong menu
                //    },
                //    items: self.options.MenuItem.items,
                //    events: {
                //        show: function (options) {
                //            self.options.menuEvent && self.options.menuEvent['show'](options, grid.get(grid.getSelection()[0]));
                //        }
                //    }
                //});
            });
        });

        $(".context-menu-list li").css({ "text-align": "left" }); // css for ContextMenu
        this._super();
        this._saveData(this);
    },
    _createEvent: function () {
        var self = this;
        $(this.boxTitle).click(function (e) {
            $(this).parents('.box')
              .children('.box-content')
              .toggle()
            ;
        });
    },
    _createFloor: function (data) {
        var self = this;
        self.element.addClass(self.options.divClass).css(self.options.boxCss);
        //tạo thẻ div box
        self.options.box = $('<div>').addClass('box').appendTo(self.element);

        //tạo thanh title
        self.boxTitle = $('<div>').addClass('box-title')
          .css('padding', '5px')
          .appendTo(self.options.box)
        ;

        var title = $('<h3>').html(data.Floor.FloorName).appendTo(self.boxTitle);
        if (self.options.icon)
            //$('<i>').addClass(self.options.icon).prependTo(title);

            //them content
            var boxContent = $('<div>').addClass('box-content')
              .appendTo(self.options.box)
              .css(self.options.contentCss)
        ;
        self.content = $("<div>").addClass('row').appendTo(boxContent);
        self._createRoomOneRow(data.Room);
        boxContent.append(self.boxTool);

        if (self.options.color) {
            self.boxTitle.css('background-color', self.options.color);
            boxContent.css('border', '1px solid ' + self.options.color);
        }
        self._createEvent();
    },
    _destroy: function () {
        this.element.html('');
    },
    _createRoomOneRow: function (data) {
        var self = this;
        var date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        data.map(function (x) {
            x.hasPerson = 'home';
            x.Broom = false;
            x.Key = false;
            x.Warning = false;
            if (x.IsBroom == true)
                x.Broom = true;
            if (x.IsKey == true)
                x.Key = true;
            if (x.IsWarning == true)
                x.Warning = true;
            if (x.RoomOrderStatusId != 2)
                x.hasPerson = 'user';
            return x;
        });
        $.each(data, function (k, v) {
            var col = $("<div>").addClass("col-xs-3 col-sm-2 col-lg-1");
            var panel = $("<div>").addClass("panel panel-primary").css(self.options.panelCss);
            var home = $("<div>").addClass("home").css(self.options.homeCss).appendTo(panel);
            var imgHome = $("<img>").attr({ 'src': '/Content/Images/' + v.hasPerson + '.png' }).css(self.options.imgCss).appendTo(home);
            if (v.hasPerson == 'user')
                panel.removeClass("panel-default").addClass("panel-primary");
            if (v.Key) {
                var key = $("<div>").addClass("key").css(self.options.keyCss).appendTo(panel);
                var imgKey = $("<img>").attr({ 'src': '/Content/Images/key.png' }).css(self.options.imgCss).appendTo(key);
            }
            if (v.Warning) {
                var warning = $("<div>").addClass('warning').css(self.options.warningCss).appendTo(panel);
                var imgWarning = $("<img>").attr({ 'src': '/Content/Images/warning.png' }).css(self.options.imgCss).appendTo(warning);
            }
            if (v.Broom) {
                var broom = $("<div>").addClass("broom").css(self.options.broomCss).appendTo(panel);
                var imgBroom = $("<img>").attr({ 'src': '/Content/Images/broom.png' }).css(self.options.imgCss).appendTo(broom);
            }
            var room = $("<div>").addClass("text").css(self.options.roomCss).appendTo(panel);
            var textRoom = $("<b>").addClass("badge").html(v.RoomName + (v.RoomCountCheckout ? ' (' + v.RoomCountCheckout + '/' : ' (0/') + (v.RoomCount ? v.RoomCount + ')' : '0)')).css(self.options.textRoom).appendTo(room);
            var btnRoom = $("<button>")
              .addClass("btn")
              .addClass("context-menu")
              .attr({
                  "RoomId": v.RoomId,
                  "RoomOrderId": v.RoomOrderId,
                  'RoomCount': v.RoomCount,
                  "RoomOrderStatusId": v.RoomOrderStatusId,
                  "id": "RoomId_" + v.RoomId
              })
              .css(self.options.btnCss)
              .append(panel)
              .appendTo(col);

            //col.appendTo(self.content); or here
            $(btnRoom).click(function (e) {
                debugger;
                var data = {
                    RoomOrderId: e.currentTarget.attributes.RoomOrderId != null ? e.currentTarget.attributes.RoomOrderId.value : null,
                    RoomId: e.currentTarget.attributes.RoomOrderId != null ? e.currentTarget.attributes.RoomId.value : null,
                    RoomCount: e.currentTarget.attributes.RoomCount != null ? e.currentTarget.attributes.RoomCount.value : null
                };
                self.options.click(data);
            });
            col.appendTo(self.content);
        });
    },
    reset: function (data) {
        this._destroy();
        this.options.data = data;
        this._create();
    }
});