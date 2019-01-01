$.widget('widget.boxcontent', {
    options: {
        data: {
            title: '',
            content: '',
        },
        contentName: 'content',
        titleName: 'title',
        divClass: 'col-md-12',
        contentCss: {
            'display': 'block',
            'background-color': '#FFF',
            'padding': '15px'
        },
        icon: null,
        color: '#5ab4da',
        buttons: [], //mang de chua cac button
        buttonsTitle: [], // mang chua button tren title
        boxCss: {
            'padding-left': '5px',
            'padding-right': '5px',
            'padding-top': '5px'
        },
        boxToolInTitleCss: {
            'position': 'absolute',
            'top': '30px',
            'font-size': '14px'
        },
        isMainContent: false, // if true => add mainContentCss
        mainContentCss: {
            'min-height': '200px'
        }
    },
    _create: function () {
        var self = this;
        this.element.addClass(this.options.divClass).css(self.options.boxCss);
        //tạo thẻ div box
        self.options.box = $('<div>').addClass('box').appendTo(this.element);


        //tạo thanh title
        this.boxTitle = $('<div>').addClass('box-title')
            .css({
                'padding': '5px',
                'overflow': 'hidden',
                'text-overflow': 'ellipsis'
            })
            .appendTo(self.options.box)
        ;
        var title = $('<h3>').html(self.options.data[this.options.titleName]).appendTo(this.boxTitle);
        if (this.options.icon)
            $('<i>').addClass(self.options.icon).prependTo(title);

        //tạo box button title
        this.boxToolInTitle = $('<div>').addClass('box-tool')
            .css(this.options.boxToolInTitleCss)
            .appendTo(this.options.box);
        //tạo button title
        $.each(self.options.buttonsTitle, function (key, button) {
            self.addButtonTitle(button);
        });

        this.boxTool = $('<div>').addClass('box-tool');
        //tạo button
        $.each(self.options.buttons, function (key, button) {
            self.addButton(button);
        });

        //them content
        var boxContent = $('<div>').addClass('box-content')
            .appendTo(self.options.box)
            .css(this.options.contentCss)
        ;
        
        var content = $("<div>").append(self.options.data[this.options.contentName]);
        if (this.options.isMainContent)
            content.css(this.options.mainContentCss);
        else
            content.css("min-height", "50px")
        boxContent.append(content);

        boxContent.append(this.boxTool);


        if (self.options.color) {
            this.boxTitle.css('background-color', self.options.color);
            boxContent.css('border', '1px solid ' + self.options.color);
        }
        this._createEvent();
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
    _destroy: function () {
        this.element.html('');
    },
    addButton: function (button) {
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
            throw 'Error ! Button must have icon or text';
        }
        aTag.click(button.onClick.bind('click', this.options))
            .css(button.css || {})
            .css('background-color', this.options.color);

        aTag.appendTo(this.boxTool);
        this.boxTool.append(' ');
    },
    addButtonTitle: function (button) {
        var aTag = $('<span>');
        if (button.text || button.icon) {
            aTag.addClass('label')
                .addClass(button.btnClass)
                .html(button.text)
                ;
            if (button.icon)
                aTag.prepend('<i class="' + button.icon + '"></i> ');
        }
        else {
            throw 'Error ! Button title must have icon or text';
        }
        button.onClick && aTag.click(button.onClick.bind('click', this.options))
            .css(button.css || {})

        aTag.appendTo(this.boxToolInTitle);
    }
});