$.widget('widget.gallery', $.widget.base, {
    options: {
        images: null,
        buttons: null,
        title: null,
        height: '300px',
        width:''
    },
    _create: function () {
        var self = this;
        this.element.addClass('box');
        if (this.options.title) {
            var boxTitle = $('<div>').addClass('box-title').appendTo(this.element);
            var title = $('<h3>').html(this.options.title).appendTo(boxTitle);
            var icon = $('<i>').addClass('fa fa-picture-o').prependTo(title);
        }

        var boxContent = $('<div>').addClass('box-content no-padding').appendTo(this.element);
        this.options.galleryContainer = $('<ul>').addClass('gallery col-xs-12 col-sm-12 col-md-12 col-lg-12').appendTo(boxContent);
        $(this.options.galleryContainer).slimScroll({
            width: this.options.width,
            height:this.options.height,
            touchScrollStep: 30
        });
        //$(this.options.galleryContainer).css('width', '');
        //$(this.options.galleryContainer).css('height', this.options.height);

        if (this.options.images)
            this._addImages(this.options.images);
        
        self.setWidgetFunction();
        
    },
    _init: function () {
        this._super();
        this._saveData(($(this.element).data("widget-gallery")).options);
        
    },
    test:function(){},
    _addImage: function (url, thumbUrl) {

        var self = this;
        var liTag = $('<li>').addClass('col-xs-2 col-sm-2 col-md-2 col-lg-2').css('margin', '10px 0px').appendTo(this.options.galleryContainer);
        var divTag = $('<div>').css({
            height: '100px',
            'display': 'flex',
            'align-items': 'center',
            'justify-content': 'center',
        }).appendTo(liTag);
        var imgTag = $('<img>').attr('src', thumbUrl).attr('imageUrl', url).css('max-height', '100px')
            .addClass('img-responsive')
            .appendTo(divTag);
        if (this.options.buttons) {
            var toolContainer = $('<div>').addClass('gallery-tools').css('width', '85%').appendTo(liTag);
            $.each(this.options.buttons, function (key, value) {
                var aTag = $('<a>').appendTo(toolContainer);
                var icon = $('<i>').addClass(value.icon).appendTo(aTag);
                $(aTag).click(function () {
                    value.onclick(url, thumbUrl, liTag);
                });
            })
        }
    },
    _addImages: function (images) {
        var self = this;
        if (!this.options.images)
            this.options.images = [];
        $.each(images, function (key, value) {
            $.extend(self.options.images, value);
            self._addImage(value.ImageUrl, value.ThumbnailUrl);
        });
    },
    _clear: function (images) {
        $(this.options.galleryContainer).html('');
        this.options.images = [];
    },
    setWidgetFunction: function () {
        var self = this;
        this.options.addImage = function (url, thumbUrl) {
            self._addImage(url, thumbUrl);
        }
        this.options.clear = function () { self._clear(); }
        this.options.addImages = function (images) { self._addImages(images); }
    }
});