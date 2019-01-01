$.widget("widget.userCurrent", $.widget.base, {
    options: {
        data: {
            title: '',
            content: '',
        },
        items: { },
        divClass: 'col-md-12',
        boxCss: {
            'padding-left': '5px',
            'padding-right': '5px',
            'padding-top': '5px'
        },
        buttons: [],
        buttonTitle: [], //mang de chua cac button tren title,
        color: '#5ab4da',
        icon: 'glyphicon glyphicon-user',
        contentCss: {
            //'display': 'block',
            //'background-color': '#FFF'
        },
    },
    _create: function () {
        var self = this;
        this.element.addClass(this.options.divClass).css(this.options.boxCss);
        //tạo thẻ div box
        this.options.box = $('<div>').addClass('box').appendTo(this.element);

        //tạo thanh title
        this._createBoxTitle();

        //tạo thanh boxContent
        var boxContent = $('<div>').addClass('box-content')
            .appendTo(this.options.box)
            .css(this.options.contentCss)
        ;
        boxContent.append(this.boxTool);
        if (this.options.color) {
            boxContent.css('border', '1px solid ' + this.options.color);
        }
        //tạo button title
        $.each(this.options.buttonTitle, function (key, button) {
            self._addButtonTitle(button);
        });
        //tạo content
        this.row = $('<div>').addClass('row').appendTo(boxContent);
        this._createUploadImage();
        //tạo button upload
        this._addButton(); //this.options.buttons
        this._renderUserInfo(); // this.options.items

        this._createEvent();
        this._super();
        this._saveData(this.options);
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
    _createBoxTitle: function () {
        this.boxTitle = $('<div>').addClass('box-title')
            .appendTo(this.options.box);
        if (this.options.color) {
            this.boxTitle.css('background-color', this.options.color);
        }
        var title = $('<h3>').html(this.options.title || 'Thông tin')
            .appendTo(this.boxTitle);
        if (this.options.icon)
            $('<i>').addClass(this.options.icon).prependTo(title);

        var boxToolInTitle = $('<div>').addClass('box-tool').appendTo(this.boxTitle);
        this.boxTool = $('<div>').addClass('box-tool');
    },
    _createUploadImage: function () {
        var self = this;
        var col = $('<div class="col-md-3 controls">')
            .appendTo(this.row);
        var form = $('<div class="form-horizontal">')
            .appendTo(col);
        var divGroupImage = $('<div class="form-group">')
            .appendTo(form);
        var divColSize = $('<div class="col-sm-9 col-md-12 controls">')
            .appendTo(divGroupImage);
        var divImage = $('<div class="fileupload fileupload-new" data-provides="fileupload">')
            .appendTo(divColSize);
        $('<input type="hidden">').appendTo(divImage);

        var imageSize = $('<div class="fileupload-new img-thumbnail" style="width: 200px;height: 150px;">')
            .appendTo(divImage);
        var imageSrc = $('<img src="/Content/flaty/img/demo/profile-picture.jpg" alt="">')
            .appendTo(imageSize);
        var imageThumb = $('<div class="fileupload-preview fileupload-exists img-thumbnail" style="max-width: 200px; max-height: 150px; line-height: 10px;"></div>')
            .appendTo(divImage);
        var imageButton = $('<div><span class="btn btn-file"><span class="fileupload-new">Select image</span><span class="fileupload-exists">Change</span><input type="file" class="default"></span><a href="#" class="btn fileupload-exists" data-dismiss="fileupload">Remove</a></div>')
            .appendTo(divImage);

        var divGroupButton = $('<div class="form-group">')
            .appendTo(form);
        this.boxButton = $('<div class="col-sm-9 col-md-12"></div>')
            .appendTo(divGroupButton);
    },
    _addButton: function () {
        var self = this;
        $.each(this.options.buttons, function (key, button) {
            var aTag = $('<button>');
            if (button.caption) {
                aTag.addClass('btn')
                    .addClass(button.btnClass)
                    .html(button.caption)
                    .appendTo(self.boxButton)
                ;
                aTag.click(function (e) {
                    if (self.options.items[0]) {
                        $.extend(e, {
                            UserId: self.options.items[0].UserId
                        });
                    }
                    button.onClick(e);
                });
            }
            else {
                console.log(button);
                throw 'Error ! Button must have caption';
            }
        });
    },
    _addButtonTitle: function (button) {
        var aTag = $('<div>');
        if (button.text || button.icon) {
            aTag.addClass('btn')
                .addClass(button.btnClass)
                .html(button.text)
            ;
            if (button.icon)
                aTag.prepend('<i class="' + button.icon + '"></i> ');
        }
        else {
            console.log(button);
            throw 'Error ! Button must have icon or text';
        }
        aTag.click(button.onClick.bind('click', this.options))
            .css(button.css || {})
            .css('background-color', this.options.color);

        aTag.appendTo(this.boxTool);
        this.boxTool.append(' ');
    },
    _renderUserInfo: function () {
        var self = this;
        var main = $('<div class="col-md-9 user-profile-info">').appendTo(this.row);
        if (this.options.items[0]) {
            $.each(self.options.fields, function (k, v) {
                Object.values(v);
                var content = $('<p><span>' + (v.caption + ':') + '</span>' + (self.options.items[0][v.field]) + '</p>').appendTo(main);
            });
        }
    },
    _destroy: function () {
        this.element.html('');
    },
});